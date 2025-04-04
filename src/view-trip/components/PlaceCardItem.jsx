import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function PlaceCardItem({ place }) {
    const [photoUrl, setPhotoUrl] = useState(null)

    useEffect(() => {
        const GetPlacePhoto = async () => {
            const data = { textQuery: place?.placeName }
            const result = await GetPlaceDetails(data)
            // console.log(result.places[0].photos[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", result.places[0].photos[4].name)
            setPhotoUrl(PhotoUrl)
        }

        if (place?.placeName) {
            GetPlacePhoto()
        }
    }, [place?.placeName])

    return (
        <div className="border rounded-2xl p-4 mt-3 flex flex-col md:flex md:flex-row items-center gap-6 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-lg bg-white sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
            {/* Image */}
            <img
                src={photoUrl || '/placeholder.png'}
                alt={place.placeName}
                className="md:w-[150px] md:h-[120px] w-full md:object-bottom rounded-2xl object-cover shadow-md"
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
