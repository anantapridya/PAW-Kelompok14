import { Link } from 'react-router-dom'
import logo from '../img/websitelogo.png'
import React from 'react'
import Dropdown from './Dropdown'
// import '../css/Navbar.css'

export default function Navbar({ isLogin, isAdmin }) {
    const profile =[{id:1, value:"Profile"},{id:2, value:"Sign Out"}]
    return (
    <nav role="navigation" className="h-[60px] w-full px-[60px] box-border bg-putih font-body font-medium text-[20px] text-biru-tua xl:h-16 xl:text-[22px]">
        <ul className="h-full w-full flex items-center box-border list-none">
            <li className='mr-[50px] mx-[30px] xl:mx-[50px]'>
                <Link to="/" className="flex items-center hover:drop-shadow-3xl">
                    <img src={logo} alt="app logo on navigation bar" className='h-[35px] xl:h-[40px]'></img>
                    <span className='font-bold text-[23px] xl:text-[25px] ml-[13px]'>Pharma</span><span className='font-bold text-[23px] xl:text-[25px] text-black'>Web</span>
                </Link>
            </li>
            <li className={`mx-[50px] xl:mx-[30px] hover:drop-shadow-3xl ${isLogin ? "hidden": "inline"}`}><Link to="/list">List</Link></li>
            <li className={`mx-[50px] xl:mx-[30px] hover:drop-shadow-3xl ${isAdmin ? "hidden": "inline"}`}><Link to="/add">Add</Link></li>
            <li className={`mx-[50px] ml-auto hover:drop-shadow-3xl ${isLogin ? "hidden": "inline"}`}><Link to="/welcome">Sign in/Sign out</Link></li>
            <li className={`mx-[50px] ml-auto hover:drop-shadow-3xl ${isLogin ? "inline": "hidden"} `}><Dropdown items={profile} judul="Profile" className="text-biru-tua text-[22px] bg-transparent" /></li>
        </ul>
    </nav>
    )
}