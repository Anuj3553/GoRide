import { db } from '@/service/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCardItem from './components/UserTripCardItem'

export default function MyTrips() {
    const navigate = useNavigate()
    const [userTrips, setUserTrips] = useState([])

    useEffect(() => {
        // /** 
        // Used to Get All User Trips
        // * @returns
        // */

        const GetUserTrips = async () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (!user) {
                navigate('/')
                return;
            }

            const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email))
            const querySnapshot = await getDocs(q);
            setUserTrips([])
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                setUserTrips((prevVal) => [...prevVal, doc.data()])
            });
        }

        GetUserTrips()
    }, [navigate])



    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <div key={index}>
                        <UserTripCardItem trip={trip} />
                    </div>
                )) :
                    [1, 2, 3, 4, 5, 6].map((trip, index) => (
                        <div key={index} className='animate-pulse'>
                            <div className='h-[200px] w-full bg-gray-200 rounded-lg'></div>
                            <div className='mt-2'>
                                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                                <div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
