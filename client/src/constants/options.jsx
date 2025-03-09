export const SelectTravelList = [
  {
    id: 1,
    title: "Couple Getaway",
    desc: "A romantic trip for two",
    icon: "❤️",
    people: "2",
  },
  {
    id: 2,
    title: "Family Adventure",
    desc: "A fun excursion for the whole family",
    icon: "👨‍👩‍👧‍👦",
    people: "4",
  },
  {
    id: 3,
    title: "Friends’ Retreat",
    desc: "Bonding time with your favorite crew",
    icon: "🤝",
    people: "3",
  },
  {
    id: 4,
    title: "Team Offsite",
    desc: "Collaborate and connect with your coworkers",
    icon: "🏢",
    people: "5",
  },
  {
    id: 5,
    title: "Group Expedition",
    desc: "An adventurous journey for a large group",
    icon: "🗺️",
    people: "6",
  },

  {
    id: 6,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "🚶",
    people: "1",
  },
];

export const SelectBudgetList = [
  {
    id: 1,
    title: "Budget Traveler",
    desc: "Affordable stays and cost-effective experiences",
    icon: "💸",
    budgetRange: "$ - $$",
  },
  {
    id: 2,
    title: "Standard Comfort",
    desc: "Balanced expenses with decent comfort",
    icon: "💰",
    budgetRange: "$$ - $$$",
  },
  {
    id: 3,
    title: "Luxury Escape",
    desc: "Premium stays and exclusive experiences",
    icon: "✨",
    budgetRange: "$$$ - $$$$",
  },
  {
    id: 4,
    title: "Ultra-Premium",
    desc: "Top-tier luxury with no spending limits",
    icon: "👑",
    budgetRange: "$$$$+",
  },
];

export const AI_PROMPT = `Generate a detailed travel plan in JSON format for the following scenario: 
Location: {location}, 
Duration: {totalDays} days, 
Travelers: {travellers}, 
Budget: {budget}.

Requirements:
1. Provide a list of recommended hotels, each with:
   - Hotel Name
   - Hotel Address
   - Price (per night)
   - Hotel Image URL
   - Geo Coordinates
   - Rating
   - Description

2. Suggest a daily itinerary covering {totalDays} days, each day including:
   - Place Name
   - Place Details
   - Place Image URL
   - Geo Coordinates
   - Ticket Pricing
   - Best Time to Visit
   - Travel Time to/from each location

Output everything in valid JSON format, with clear structure for the hotels list and the daily itinerary plan.`;
