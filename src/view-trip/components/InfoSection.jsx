import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(null)

    useEffect(() => {
        const GetPlacePhoto = async () => {
            const data = { textQuery: trip?.userSelection?.location?.label }
            const result = await GetPlaceDetails(data)
            // console.log(result.places[0].photos[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", result.places[0].photos[4].name)
            setPhotoUrl(PhotoUrl)
        }

        if (trip?.userSelection?.location?.label) {
            GetPlacePhoto()
        }
    }, [trip?.userSelection?.location?.label])

    return (
        <div>
            <img src={photoUrl || '/placeholder.png'}
                alt={trip?.userSelection?.location?.label}
                className='h-[340px] w-full object-bottom rounded-xl'
            />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>📅 Day: {trip?.userSelection?.noOfDays}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰 Budget: {trip?.userSelection?.budget}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>🥂 No. of Traveler: {trip?.userSelection?.traveler}</h2>
                    </div>
                </div>

                <Link to={`https://www.google.com/maps/search/?api=1&query=` + trip?.userSelection?.location?.label} target="_blank">
                    <Button className="cursor-pointer"><IoIosSend /></Button>
                </Link>
            </div>
        </div>
    )
}
