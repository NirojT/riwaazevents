"use server";

import { headers } from "next/headers";

import { API_URL } from "./env";

export interface EnquiryPayload {
  name: string;
  phone: string;
  email: string | null;
  functionTypeId: number | null;
  eventTypeText: string | null;
  eventDate: string | null;
  location: string | null;
  guestCount: number | null;
  message: string | null;
  /** The honeypot. Passed on as it came: the backend stores a filled one as spam and says thanks. */
  website: string;
}

export type EnquiryResult = { ok: true } | { ok: false; error: string };

const COULD_NOT_SEND = "Couldn't send.";

/** Spring answers a bad field with a map of messages, anything else with `message`. */
const firstMessage = (body: unknown): string | null => {
  if (!body || typeof body !== "object") return null;
  const { message } = body as { message?: unknown };
  if (typeof message === "string" && message.trim()) return message;
  const first = Object.values(body).find((v) => typeof v === "string" && v.trim());
  return typeof first === "string" ? first : null;
};

/**
 * Sends the contact form to the enquiries inbox. Going through the server means the browser needs
 * no route to the backend. The backend rate-limits by caller, so the visitor's address is passed on:
 * without it every visitor would share this server's address, and one limit between them.
 */
export async function sendEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  const requestHeaders = await headers();
  const visitor = requestHeaders.get("x-forwarded-for") ?? requestHeaders.get("x-real-ip");

  try {
    const res = await fetch(`${API_URL}/api/v1/public/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(visitor ? { "X-Forwarded-For": visitor } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (res.ok) return { ok: true };
    if (res.status === 429) {
      return { ok: false, error: "You've sent a few already — please wait a minute and try again." };
    }
    if (res.status === 400) {
      const message = firstMessage(await res.json().catch(() => null));
      if (message) return { ok: false, error: message };
    }
    return { ok: false, error: COULD_NOT_SEND };
  } catch {
    return { ok: false, error: COULD_NOT_SEND };
  }
}
