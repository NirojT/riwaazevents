"use client";

import React, { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { siteConfig } from "../../data/site-config";

const emptySubscribe = () => () => { };

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const hasMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Format WhatsApp phone number and inquiry message
  const rawPhone = siteConfig.contact.whatsapp || siteConfig.contact.phone;
  const digitsOnly = rawPhone.replace(/[^0-9]/g, "");
  const whatsappNumber = digitsOnly.startsWith("977") ? digitsOnly : `977${digitsOnly}`;
  const inquiryMessage = encodeURIComponent(
    "Hello Riwaaz Events, I would like to inquire about planning an event with you."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${inquiryMessage}`;

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem("riwaaz_popup_seen", "true");
  }, []);

  useEffect(() => {
    // Check if user has already dismissed the popup in this browser session
    const seen = sessionStorage.getItem("riwaaz_popup_seen");
    if (seen) return;

    // Trigger popup after exactly 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll and listen for Escape key when popup is visible
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!hasMounted || !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Special Announcement"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={handleClose}
    >
      <div
        className="relative max-w-sm sm:max-w-md md:max-w-lg w-full bg-[#160406]/95 backdrop-blur-2xl rounded-sm overflow-hidden shadow-2xl border border-gold/40 transition-all duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-3 right-3 z-30 p-2 rounded-sm bg-black/60 hover:bg-black/85 backdrop-blur-xl text-white hover:text-gold border border-white/25 hover:border-gold/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-200 cursor-pointer active:scale-90 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
          className="block relative w-full aspect-square overflow-hidden group cursor-pointer"
          aria-label="Chat with Riwaaz Events on WhatsApp"
        >
          <Image
            src="/assets/bookpopup.webp"
            alt="Riwaaz Events Special Announcement"
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 500px, 600px"
            className="object-contain transition-transform duration-500 group-hover:scale-102"
            priority
          />
        </a>
      </div>
    </div>
  );
}
