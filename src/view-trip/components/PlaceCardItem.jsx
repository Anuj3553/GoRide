import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function PlaceCardItem({ place }) {
    return (
        <div className="border rounded-2xl p-4 mt-3 flex flex-col md:flex md:flex-row items-center gap-6 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg bg-white sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {/* Image */}
            <img
                src="/placeholder.png"
                className="md:w-[150px] md:h-[120px] w-full md:object-bottom rounded-2xl object-cover shadow-md"
                alt={place.placeName}
            />

            {/* Content */}
            <div className="flex flex-col justify-between flex-1">
                <h2 className="font-semibold text-lg text-gray-800">{place.placeName}</h2>
                <p className="text-sm text-gray-500 mt-1">{place.placeDetails}</p>

                {/* Travel Time & Time */}
                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                    <span className="flex items-center">🧳 {place.travelTime}</span>
                    <span className="flex items-center">💵 {place.ticketPricing}</span>
                    <span className="flex items-center">🕒 {place.time}</span>
                </div>

                {/* Button */}
                <Link to={`https://www.google.com/maps/search/?api=1&query=` + place.placeName + "," + place.placeAddress} target="_blank" className="w-full">
                    <Button className="w-full mt-4 px-3 py-2 text-sm flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                        <FaMapLocationDot className="text-lg" />
                        View Location
                    </Button>
                </Link>
            </div>
        </div>
    );
}
