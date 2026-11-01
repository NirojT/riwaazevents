export interface CTAData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
  backgroundImage: string;
}

export const ctaData: CTAData = {
  eyebrow: "Your celebrations starts here",
  titlePrefix: "Have something beautiful",
  titleHighlight: "in mind?",
  description:
    "Tell us what you're imagining. We'll bring every detail together and create a celebration that feels entirely yours.",
  primaryButton: {
    label: "Talk with our team",
    href: "/contact",
  },
  secondaryButton: {
    label: "Plan your event",
    href: "/contact",
  },
  backgroundImage: "/site/assets/cta.webp",
};
