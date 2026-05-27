import React from 'react'
import { Hero,LatestCollection, BestSeller, OurPolicy, NewsLetterBox, SearchBar } from '../components'

const Home = () => {
  return (
    <div>
      <SearchBar />
      <Hero/>
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}
export default Home
