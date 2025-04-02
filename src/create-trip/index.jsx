import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from "sonner"

export default function CreateTrip() {
    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([]);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])


    const OnGenrateTrip = async () => {

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

        if (formData.noOfDays > 5) {
            toast.error("Please select a minimum of 5 days for your trip")
            return;
        }

        if (formData.noOfDays < 1) {
            toast.error("Please select a minimum of 1 days for your trip")
            return;
        }

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        console.log(FINAL_PROMPT)

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        console.log("result", result?.response?.text());
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
                    onClick={OnGenrateTrip}
                >
                    Generate Trip
                </Button>
            </div>
        </div>
    )
}
