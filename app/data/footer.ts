export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSocialLink {
  label: string;
  href: string;
}

export interface FooterContactInfo {
  email: string;
  phone: string;
  studio: string;
  hours: string;
}

export interface FooterData {
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  watermarkText: string;
  socials: FooterSocialLink[];
  menuLinks: FooterLink[];
  contact: FooterContactInfo;
  bottomBar: {
    copyright: string;
    location: string;
  };
}

export const footerData: FooterData = {
  brandName: "RIWAAJ",
  brandSubtitle: "EVENTS",
  tagline: "Tradition, beautifully reimagined.",
  watermarkText: "RIWAAJ",
  socials: [
    {
      label: "INSTAGRAM",
      href: "https://instagram.com",
    },
    {
      label: "FACEBOOK",
      href: "https://facebook.com",
    },
    {
      label: "PINTEREST",
      href: "https://pinterest.com",
    },
  ],
  menuLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ],
  contact: {
    email: "hello@riwaajevents.com",
    phone: "+977 9804060401",
    studio: "Itahari, Nepal",
    hours: "Sun – Fri · 10:00 – 18:00",
  },
  bottomBar: {
    copyright: "RIWAAJ EVENTS",
    location: "ITAHARI · NEPAL",
  },
};
