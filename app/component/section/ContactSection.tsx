"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "../ui/Image";
import { CheckCircle2 } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { contactData } from "../../data/contact";
import { telHref, whatsappHref } from "../../data/site-config";
import { useSite } from "../../lib/site-context";
import { sendEnquiry } from "../../lib/enquiry";
import { RevealText, FadeUp, RevealImage, MagneticButton } from "../animation";

const OTHER = "other";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventTypeOther: "",
  eventDate: "",
  location: "",
  estimatedGuests: "",
  message: "",
  // Honeypot: hidden from people, so only a bot fills it in.
  website: "",
};

type FormData = typeof EMPTY_FORM;
type Errors = Partial<Record<keyof FormData, string>>;

/** Today as yyyy-mm-dd in the visitor's own timezone, for the date picker's minimum. */
const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const neverChanges = () => () => {};

/** Everything that blocks sending. Shown under its field; nothing else is required. */
function validate(f: FormData): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (!f.phone.trim()) e.phone = "Please give us a number we can call you on.";
  else if (digits.length < 7 || digits.length > 15) e.phone = "That number looks too short or too long.";
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email doesn't look right.";
  if (f.eventDate && f.eventDate < todayIso()) e.eventDate = "Please pick a date from today onwards.";
  if (f.estimatedGuests.trim() && !/^\d+$/.test(f.estimatedGuests.trim())) e.estimatedGuests = "Just the number, please — e.g. 250.";
  return e;
}

const labelClass =
  "block font-body text-[11px] md:text-xs font-semibold tracking-[0.2em] text-charcoal uppercase mb-2";
const fieldClass =
  "w-full bg-transparent border-b pb-2 text-sm md:text-base text-charcoal placeholder-site-muted/60 focus:outline-none transition-colors";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 font-body text-xs text-maroon-light">{message}</p>;
}

export default function ContactSection() {
  const settings = useSite((s) => s.settings);
  const functionTypes = useSite((s) => s.functionTypes);
  // "Today" belongs to the visitor, and the server may be on another date: set in the browser only.
  const minDate = useSyncExternalStore(neverChanges, todayIso, () => undefined);

  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [triedOnce, setTriedOnce] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  // Errors appear once they try to send, then follow every keystroke.
  const errors = triedOnce ? validate(formData) : {};
  const hasTypeList = functionTypes.length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTriedOnce(true);
    setFailed(null);
    if (Object.keys(validate(formData)).length > 0) return;

    const picked = functionTypes.find((t) => String(t.id) === formData.eventType);
    setSending(true);
    try {
      const result = await sendEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        functionTypeId: picked ? picked.id : null,
        eventTypeText: picked ? null : formData.eventTypeOther.trim() || null,
        eventDate: formData.eventDate || null,
        location: formData.location.trim() || null,
        guestCount: formData.estimatedGuests.trim() ? Number(formData.estimatedGuests.trim()) : null,
        message: formData.message.trim() || null,
        website: formData.website,
      });
      if (result.ok) setSubmitted(true);
      else setFailed(result.error);
    } catch {
      setFailed("Couldn't send.");
    } finally {
      setSending(false);
    }
  };

  const sendAnother = () => {
    setFormData(EMPTY_FORM);
    setTriedOnce(false);
    setFailed(null);
    setSubmitted(false);
  };

  return (
    <section id="contact" className="relative bg-ivory py-16 md:py-24">
      <Container size="wide">
        <div className="mb-12 md:mb-16">
          <FadeUp delay={0.1} y={15} className="mb-4">
            <span className="font-body text-[11px] md:text-xs font-semibold tracking-[0.28em] text-gold uppercase">
              {contactData.badge}
            </span>
          </FadeUp>

          <h2 className="font-editorial text-3xl md:text-5xl font-semibold text-charcoal tracking-wide leading-tight max-w-2xl">
            <RevealText as="span" delay={0.2} duration={1.1}>
              {contactData.titlePrefix}
            </RevealText>
            <RevealText as="span" delay={0.35} duration={1.1}>
              <span className="italic font-semibold text-gold-dark">
                {contactData.titleHighlight}
              </span>
            </RevealText>
          </h2>

          <FadeUp delay={0.5} y={20}>
            <p className="mt-4 font-editorial font-medium text-base md:text-lg text-site-muted tracking-wide max-w-xl">
              {contactData.subtitle}
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-ivory-light border border-gold/30 p-8 md:p-12 text-center rounded-sm shadow-sm">
                <CheckCircle2 className="w-12 h-12 text-maroon mx-auto mb-4" />
                <h3 className="font-editorial text-2xl md:text-3xl text-charcoal mb-2 tracking-wide font-semibold">
                  Thank You, {formData.name || "Esteemed Guest"}
                </h3>
                <p className="font-editorial font-medium text-base md:text-lg text-site-muted max-w-md mx-auto mb-6">
                  Our bespoke wedding concierges have received your vision and
                  will connect with you shortly.
                </p>
                <Button variant="outline" size="md" onClick={sendAnother}>
                  SEND ANOTHER ENQUIRY
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative space-y-8">
                {/* Honeypot — off-screen and out of the tab order, so a person never fills it. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      NAME <span className="text-gold">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      className={`${fieldClass} ${errors.name ? "border-maroon-light" : "border-charcoal/20"}`}
                    />
                    <FieldError message={errors.name} />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      PHONE <span className="text-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+977 ..."
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                      className={`${fieldClass} ${errors.phone ? "border-maroon-light" : "border-charcoal/20"}`}
                    />
                    <FieldError message={errors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      className={`${fieldClass} ${errors.email ? "border-maroon-light" : "border-charcoal/20"}`}
                    />
                    <FieldError message={errors.email} />
                  </div>

                  <div>
                    <label htmlFor={hasTypeList ? "eventType" : "eventTypeOther"} className={labelClass}>
                      EVENT TYPE
                    </label>
                    {hasTypeList ? (
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className={`${fieldClass} border-charcoal/20 cursor-pointer ${formData.eventType ? "" : "text-site-muted/60"}`}
                      >
                        <option value="">Choose one</option>
                        {functionTypes.map((t) => (
                          <option key={t.id} value={String(t.id)} className="text-charcoal">
                            {t.name}
                          </option>
                        ))}
                        <option value={OTHER} className="text-charcoal">
                          Something else
                        </option>
                      </select>
                    ) : (
                      // No list to pick from (server unreachable): typed, as on the old form.
                      <input
                        type="text"
                        id="eventTypeOther"
                        name="eventTypeOther"
                        placeholder="e.g. Wedding, Reception, Gala"
                        value={formData.eventTypeOther}
                        onChange={handleChange}
                        className={`${fieldClass} border-charcoal/20`}
                      />
                    )}
                  </div>
                </div>

                {hasTypeList && formData.eventType === OTHER && (
                  <div>
                    <label htmlFor="eventTypeOther" className={labelClass}>
                      WHAT ARE YOU CELEBRATING?
                    </label>
                    <input
                      type="text"
                      id="eventTypeOther"
                      name="eventTypeOther"
                      placeholder="Tell us in a few words"
                      value={formData.eventTypeOther}
                      onChange={handleChange}
                      className={`${fieldClass} border-charcoal/20`}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="eventDate" className={labelClass}>
                      EVENT DATE
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      min={minDate}
                      value={formData.eventDate}
                      onChange={handleChange}
                      aria-invalid={!!errors.eventDate}
                      className={`${fieldClass} cursor-pointer ${errors.eventDate ? "border-maroon-light" : "border-charcoal/20"}`}
                    />
                    <FieldError message={errors.eventDate} />
                  </div>

                  <div>
                    <label htmlFor="location" className={labelClass}>
                      LOCATION
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="City or venue"
                      value={formData.location}
                      onChange={handleChange}
                      className={`${fieldClass} border-charcoal/20`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="estimatedGuests" className={labelClass}>
                      ESTIMATED GUESTS
                    </label>
                    <input
                      type="text"
                      id="estimatedGuests"
                      name="estimatedGuests"
                      inputMode="numeric"
                      placeholder="e.g. 250"
                      value={formData.estimatedGuests}
                      onChange={handleChange}
                      aria-invalid={!!errors.estimatedGuests}
                      className={`${fieldClass} ${errors.estimatedGuests ? "border-maroon-light" : "border-charcoal/20"}`}
                    />
                    <FieldError message={errors.estimatedGuests} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    TELL US ABOUT YOUR EVENT
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="The story, the setting, the feeling anything that matters to you."
                    value={formData.message}
                    onChange={handleChange}
                    className={`${fieldClass} border-charcoal/20 resize-none`}
                  />
                </div>

                <div className="pt-4 space-y-4">
                  <MagneticButton strength={0.15}>
                    <Button
                      type="submit"
                      variant="solid"
                      size="lg"
                      arrow="right"
                      disabled={sending}
                      className="w-full md:w-auto disabled:opacity-60 disabled:cursor-wait"
                    >
                      {sending ? "SENDING…" : contactData.submitButtonText}
                    </Button>
                  </MagneticButton>

                  {failed && (
                    <p role="alert" className="font-body text-sm text-maroon-light">
                      {failed} Call{" "}
                      <a href={telHref(settings.phone)} className="underline underline-offset-2 hover:text-maroon">
                        {settings.phone}
                      </a>{" "}
                      or{" "}
                      <a
                        href={whatsappHref(settings.whatsapp || settings.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-maroon"
                      >
                        WhatsApp us
                      </a>
                      .
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col space-y-8">
            <RevealImage
              direction="up"
              duration={1.4}
              className="relative aspect-4/5 w-full shadow-lg border border-charcoal/5"
            >
              <Image
                src={contactData.coupleImage.src}
                alt={contactData.coupleImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
                preload
              />
            </RevealImage>

            <div className="pt-2 space-y-5">
              <div className="border-t border-charcoal/10 pt-4">
                <p className="font-body text-[10px] md:text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-1">
                  PHONE
                </p>
                <a
                  href={telHref(settings.phone)}
                  className="font-body text-sm md:text-base text-charcoal hover:text-maroon transition-colors"
                >
                  {settings.phone}
                </a>
              </div>

              <div className="border-t border-charcoal/10 pt-4">
                <p className="font-body text-[10px] md:text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-1">
                  STUDIO
                </p>
                <p className="font-body text-sm md:text-base text-charcoal">
                  {settings.address}
                </p>
              </div>

              <div className="border-t border-charcoal/10 pt-4">
                <p className="font-body text-[10px] md:text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-1">
                  HOURS
                </p>
                <p className="font-body text-sm md:text-base text-charcoal">
                  {settings.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
