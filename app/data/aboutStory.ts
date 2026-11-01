export interface AboutStoryItem {
  id: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  paragraphs: string[];
  quote: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}

export interface AboutStoryData {
  items: AboutStoryItem[];
}

export const aboutStoryData: AboutStoryData = {
  items: [
    {
      id: "who-we-are",
      eyebrow: "WHO WE ARE",
      titleLine1: "One team for everything",
      titleLine2: "your event needs.",
      paragraphs: [
        "Planning an event means dealing with many different people, decisions, and responsibilities. Riwaaj was created to make that easier.",
        "Our team brings planners, designers, decorators, hospitality teams, vendors, and event coordinators together so you don't have to manage everything yourself.",
        "Whether it is a wedding, engagement, reception, family celebration, or corporate event, we work closely with you to understand what you need and bring it all together.",
      ],
      quote: "One team. One plan. One well-managed event.",
      image: "/site/assets/story-florist.webp",
      imageAlt: "Riwaaj Events planning and coordination team",
      imagePosition: "right",
    },
    {
      id: "design-and-decor",
      eyebrow: "DESIGN & DÉCOR",
      titleLine1: "We make your event",
      titleLine2: "feel like yours.",
      paragraphs: [
        "Every family, couple, and event is different. That's why we don't believe every celebration should look the same.",
        "We work with you to understand your ideas, traditions, preferred style, and budget. From the stage and flowers to lighting, seating, tables, and the overall venue, every detail is planned to suit your event.",
        "You bring us your ideas. Our team turns them into a space where you and your guests can celebrate comfortably and beautifully.",
      ],
      quote: "Designed around you, not a ready-made package.",
      image: "/site/assets/story-bouquet.webp",
      imageAlt: "Event stage and floral design by Riwaaj Events",
      imagePosition: "left",
    },
    {
      id: "food-and-hospitality",
      eyebrow: "FOOD & HOSPITALITY",
      titleLine1: "Your guests are",
      titleLine2: "our responsibility too.",
      paragraphs: [
        "Good hospitality is one of the most important parts of any celebration.",
        "Our team helps coordinate food, service, seating, guest requirements, and hospitality so everyone attending your event feels welcomed and cared for.",
        "Behind the scenes, we also manage vendors, schedules, staff, and event-day coordination. While you spend time with your family and guests, we make sure everything continues to run as planned.",
        "From the first guest arriving to the final goodbye, our team stays there to take care of the details.",
      ],
      quote: "You take care of your guests. We take care of the event.",
      image: "/site/assets/story-culinary.webp",
      imageAlt: "Food service and guest hospitality coordination by Riwaaj Events",
      imagePosition: "right",
    },
  ],
};
