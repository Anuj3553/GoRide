import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

export default function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} />
                ))}
            </div>
        </div>
    )
}
