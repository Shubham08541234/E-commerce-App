import React from 'react'
import { Hero,LatestCollection, BestSeller, OurPolicy, NewsLetterBox, Footer } from '../components'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}
export default Home
