export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface TeamSectionData {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  members: TeamMember[];
}

export const teamData: TeamSectionData = {
  eyebrow: "Our Teams",
  titleLine1: "From the first sketch",
  titleLine2: "to the final goodbye.",
  description:
    "From planning and design to décor, hospitality, and coordination, we bring every detail together so you can simply enjoy the celebration.",
  members: [
    {
      id: "ankita-khadka",
      name: "Ms. Ankita Khadka",
      role: "Creative & Spatial Design Lead",
      description:
        "Every Riwaaj celebration starts on the drawing board palettes, layouts, light and story, drawn by hand before anything is built.",
      image: "/site/assets/teams/t1.webp",
      imageAlt: "Ms. Ankita Khadka - Event Design Specialist at Riwaaj Events",
    },
    {
      id: "john-doe",
      name: "Mr. John Doe",
      role: "Production & Operations Director",
      description:
        "Orchestrating technical logistics, staging, vendor synchronisation, and meticulous on-ground schedules so each moment unfolds effortlessly.",
      image: "/site/assets/teams/t2.webp",
      imageAlt: "Mr. John Doe - Production Director at Riwaaj Events",
    },
    {
      id: "anisha-shah",
      name: "Ms. Anisha Shah",
      role: "Hospitality & Guest Experience Lead",
      description:
        "Ensuring families and esteemed guests experience gracious hospitality, attentive coordination, and warmth from arrival to the closing toast.",
      image: "/site/assets/teams/t3.webp",
      imageAlt: "Ms. Anisha Shah - Hospitality Lead at Riwaaj Events",
    },
  ],
};
