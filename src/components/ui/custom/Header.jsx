import React from 'react'
import { Button } from '../button'

export default function Header() {
    return (
        <div className='p-3 shadow-sm flex justify-between items-center px-5'>
            <a href="/">
                <img src="/logo.svg" alt="logo" />
            </a>
            <div>
                <Button>Sign in</Button>
            </div>
        </div>
    )
}
