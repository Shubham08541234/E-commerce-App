import React from 'react'
import { NewsLetterBox, Title } from '../components'
import { assets } from '../Assets/frontend_assets/assets'
const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center gap-10 mb-20'>
          <img src={assets.contact_img} alt="img" className='w-full md:max-w-120'/>
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>54709 jj station, <br /> New Delhi, India</p>
            <p className='text-gray-500'>Tel: (91) 0839439482 <br /> Email: admin@gamil.com</p>
            <p className='text-gray-600 font-semibold text-xl'>Careers at Forever</p>
            <p className='text-gray-500'>Learn more about our team and job opening</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore</button>
          </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}
export default Contact
