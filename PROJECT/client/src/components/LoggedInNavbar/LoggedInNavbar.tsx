import { NAV_LINKS } from "@/constants"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react' // DELETE THIS? 
import Button from "../Button/Button"
import SignUpText from "../ClickableText/Sign Up Text"

const LoggedInNavbar = () => {
    return (
        <nav className = " border-bottom gray-30 flexBetween max-container padding-container relative z-30 py-5"> 
        
            <Link href = "/">
                <Image src = "/Site Asset 1.png" alt = "logo" width = {74} height = {29} priority= {true} />
            </Link>
            
            <ul className = "hidden h-full gap-12 lg:flex">
                {NAV_LINKS.map((link) => (
                    <Link href = {link.href} key = {link.key} className = "regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                        {link.label}
                    </Link>
                ))} 
            </ul>
        
            
            <div className = "font-color: text-white"> 
                <Link href = "/signup">
                    <span>Click Here to Sign Up!</span>
                </Link>
            </div>

            <div className = "lg:flexCenter hidden"> 
                <Button
                    type = "button"
                    title = "LogOut"
                    icon = "/Login asset.png"
                    variant = "btn_dark_green"

                /> 
            </div>
        </nav>
    )
}

export default LoggedInNavbar 

