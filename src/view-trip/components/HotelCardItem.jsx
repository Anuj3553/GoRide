import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState(null)

    useEffect(() => {
        const GetPlacePhoto = async () => {
            const data = { textQuery: hotel?.hotelName }
            const result = await GetPlaceDetails(data)
            // console.log(result.places[0].photos[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", result.places[0].photos[4].name)
            setPhotoUrl(PhotoUrl)
        }

        if (hotel?.hotelName) {
            GetPlacePhoto()
        }
    }, [hotel?.hotelName])

    return (
        <div>
            <div className='hover:scale-105 transition-all duration-200 ease-in-out'>
                <img
                    src={photoUrl || '/placeholder.png'}
                    alt={hotel?.hotelName}
                    className='rounded-lg h-[180px] w-full object-bottom'
                />

                <div className='my-2 flex flex-col gap-1'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💵 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
                    <Link to={`https://www.google.com/maps/search/?api=1&query=` + hotel?.hotelName + "," + hotel?.hotelAddress} target='_blank' className='w-full'>
                        <Button className='w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all cursor-pointer'>
                            Visit  ✈︎
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
