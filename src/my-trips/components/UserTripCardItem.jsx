import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserTripCardItem({ trip }) {
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
        <Link to={`/view-trip/${trip?.id}`}>
            <div className='hover:scale-105 transition-all duration-200 ease-in-out'>
                <img src={photoUrl || "/placeholder.png"} alt="" className="object-cover rounded-xl" />
                <div>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <h2>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}
