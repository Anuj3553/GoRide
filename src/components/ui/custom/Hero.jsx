import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1
                className='font-extrabold text-[50px] text-center mt-16'
            >
                <span className='text-[#f56551]'>Discover Your Next Adventure with AI:
                    <p className='text-black'>Personalized itineraries at Your Fingertips</p>
                </span>

            </h1>
            <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itinera tailord to your interest to your interests and budget</p>

            <Link to="/create-trip">
                <Button className="p-4">Get Started, It's Free</Button>
            </Link>

            <img src="/landing.png" className='-mt-7' />
        </div>
    )
}
