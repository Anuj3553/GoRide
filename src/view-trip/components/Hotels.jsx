import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <div key={index} className='hover:scale-105 transition-all duration-200 ease-in-out'>
                        <img src="/placeholder.png" alt="" className='rounded-lg' />

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
                ))}
            </div>
        </div>
    )
}
