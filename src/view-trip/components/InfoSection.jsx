import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from 'react-icons/io'

export default function InfoSection({ trip }) {
    return (
        <div>
            <img src='/placeholder.png' className='h-[340px] w-full object-bottom rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>📅 Day: {trip?.userSelection?.noOfDays}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰 Budget: {trip?.userSelection?.budget}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>🥂 No. of Traveler: {trip?.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    )
}
