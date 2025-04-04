import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../dialog';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import axios from 'axios';

export default function Header() {
    const [openDialog, setOpenDialog] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => GetUserProfile(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    })

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data))
            setOpenDialog(false)
            toast.success("User logged in successfully")
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        console.log('User data:', user);
    }, [user]);

    return (
        <header className="p-4 shadow-md bg-white flex justify-between items-center relative">
            <a href="/" className="flex items-center">
                <img src="/logo.png" className="h-12 w-auto" alt="GoRide Logo" />
                <span className="ml-3 text-xl font-bold text-gray-800">GoRide</span>
            </a>
            <div>
                {user ?
                    <div className='flex items-center gap-4'>
                        <a href="/create-trip">
                            <Button variant="outline" className="rounded-full cursor-pointer">+ Create Trip</Button>
                        </a>
                        <a href="/my-trips">
                            <Button variant="outline" className="rounded-full cursor-pointer">My Trips</Button>
                        </a>
                        <Popover>
                            <PopoverTrigger>
                                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2
                                    className='cursor-pointer'
                                    onClick={() => {
                                        googleLogout();
                                        window.localStorage.removeItem('user');
                                        window.location.reload();
                                    }}
                                >Logout</h2>
                            </PopoverContent>
                        </Popover>

                    </div> :
                    <Button onClick={() => setOpenDialog(true)} className="px-4 py-2 rounded">
                        Sign in
                    </Button>
                }
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
                            onClick={login}
                            className="w-full mt-5 flex gap-4 items-center"
                        >
                            <FcGoogle className="w-7 h-7" />
                            Sign In With Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </header>
    );
}
