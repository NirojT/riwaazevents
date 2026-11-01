export interface StartToCelebrationItem {
  id: string;
  number: string;
  count: string;
  title: string;
  description: string;
  image: string;
}

export interface StartToCelebrationData {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  items: StartToCelebrationItem[];
}

export const startToCelebrationData: StartToCelebrationData = {
  eyebrow: "From starts to Celebration",
  titlePrefix: "From the venue to the",
  titleHighlight: "Final Goodbye",
  description:
    "Before the celebration begins, our team is already at work bringing every detail together with precision and care.",
  items: [
    {
      id: "venue-preparation",
      number: "01",
      count: "01/06",
      title: "Venue Preparation",
      description: "Preparing the space for everything that follows.",
      image: "/site/assets/venue/v1.webp",
    },
    {
      id: "concept-planning",
      number: "02",
      count: "02/06",
      title: "Concept & Planning",
      description: "Turning your ideas into one thoughtful vision.",
      image: "/site/assets/venue/v2.webp",
    },
    {
      id: "food-hospitality",
      number: "03",
      count: "03/06",
      title: "Food & Hospitality",
      description: "Making sure every guest is served and cared for.",
      image: "/site/assets/venue/v3.webp",
    },
    {
      id: "entertainment-production",
      number: "04",
      count: "04/06",
      title: "Entertainment & Production",
      description: "Creating the atmosphere through music, lighting, and live moments.",
      image: "/site/assets/venue/v4.webp",
    },
    {
      id: "event-coordination",
      number: "05",
      count: "05/06",
      title: "Event Coordination",
      description: "Keeping every person, vendor, and moment on schedule.",
      image: "/site/assets/venue/v1.webp",
    },
    {
      id: "event-closure",
      number: "06",
      count: "06/06",
      title: "Event Closure",
      description: "Taking care of the final details even after the celebration ends.",
      image: "/site/assets/venue/v2.webp",
    },
  ],
};
