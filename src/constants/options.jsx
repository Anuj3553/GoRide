export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💵",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep const on the average side",
        icon: "💰",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Dont worry about the cost",
        icon: "💎",
    }
]

export const SelectTravelsList = [
    {
        id: 1,
        title: "Just Me",
        desc: "A sole traveles in exploration",
        icon: "✈️",
        people: "1 Person",
    },
    {
        id: 2,
        title: "A Couple",
        desc: "Two travels in tandem",
        icon: "🥂",
        people: "2 People",
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of fun loving adv",
        icon: "🏡",
        people: "3 to 5 People",
    },
    {
        id: 4,
        title: "Friends",
        desc: "A bunch of thrill seekers",
        icon: "⛵",
        people: "5+ People",
    }
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo cordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Cordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'