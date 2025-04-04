import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from "sonner"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';


export default function CreateTrip() {
    const [place, setPlace] = useState(null);

    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    useEffect(() => {
        // console.log(formData)
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => GetUserProfile(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    })

    const OnGenrateTrip = async () => {
        const user = localStorage.getItem('user')

        if (!user) {
            setOpenDialog(true)
            return;
        }

        if (!formData.location) {
            toast.error("Please select a location")
            return;
        }
        if (!formData.budget) {
            toast.error("Please select a budget")
            return;
        }
        if (!formData.traveler) {
            toast.error("Please select a traveler")
            return;
        }
        if (!formData.noOfDays) {
            toast.error("Please select number of days")
            return;
        }

        if (formData.noOfDays < 1 || formData.noOfDays > 5) {
            toast.error("Please select between 1 to 5 days for your trip");
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        // console.log("result", result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text())
    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true)

        const user = JSON.parse(localStorage.getItem('user'))
        const docId = Date.now().toString()

        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId,
        });

        setLoading(false)
        navigate(`/view-trip/${docId}`)
    }

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((response) => {
            // console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data))
            setOpenDialog(false)
            OnGenrateTrip()
            toast.success("User logged in successfully")
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences</p>

            <div className='mt-20 flex flex-col gap-9'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v); },
                            placeholder: 'Enter a destination',
                        }}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <Input
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        className='w-full'
                        type='number'
                        placeholder='Ex.3'
                        min={0}
                        max={5}
                    />
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title && 'shadow-lg border-black'}`}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelsList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.traveler === item.people && 'shadow-lg border-black'}`}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            <h2 className='text-sm text-gray-500'>{item.people}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='my-10 flex justify-end'>
                <Button
                    disabled={loading}
                    onClick={OnGenrateTrip}
                >
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : "Generate Trip"
                    }

                </Button>
            </div>

            {/*  Dialog for user not logged in */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <div className="flex justify-between items-center">
                        <DialogHeader>
                            <DialogTitle className="text-center text-2xl font-bold"></DialogTitle>
                        </DialogHeader>
                        <DialogClose />
                    </div>

                    <div>
                        <img src="/logo.svg" alt="Logo" />
                        <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                        <div>Sign in to the App with Google authentication securely</div>

                        <Button
                            disabled={loading}
                            onClick={login}
                            className="w-full mt-5 flex gap-4 items-center"
                        >
                            <FcGoogle className="w-7 h-7" />
                            Sign In With Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
