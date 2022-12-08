import React from 'react'
import img404 from '../img/404.svg'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] bg-putih'>
      <img src={img404} alt="" className='w-[350px] mb-10 md:w-[1000px]'></img>
      <h4 className='font-bold font-body text-biru-tua text-2xl'>Ooops...</h4>
      <h4 className='font-bold font-body text-biru-tua text-2xl'>Sorry, the page not found</h4>
      <button onClick={() => navigate(-1)} className="mt-20 border-biru-tua border-2 font-body font-bold text-biru-tua px-5 py-2">Back</button>
    </div>
  )
}
