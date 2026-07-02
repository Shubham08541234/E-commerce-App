import React from 'react'
import { NewsLetterBox, Title } from '../components'
import { assets } from '../Assets/frontend_assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-112.5' src={assets.about_img} alt="img" />
        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way
people shop online. Our journey began with a simple idea: to provide a platform where
customers can easily discover, explore, and purchase a wide range of products from the
comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality
products that cater to every taste and preference. From fashion and beauty to
electronics and home essentials, we offer an extensive collection sourced from trusted
brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus aliquam quaerat est cumque quam modi ullam recusandae porro! Eius reiciendis tempore perferendis quaerat voluptatibus id.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assuarence:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla beatae reiciendis quaerat recusandae distinctio in.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla beatae reiciendis quaerat recusandae distinctio in.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla beatae reiciendis quaerat recusandae distinctio in.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}
export default About
