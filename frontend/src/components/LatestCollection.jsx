import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);

    const [prod, setProd] = useState();

    useEffect(() =>{
      if(products && products.length > 0) setProd(products.slice(0,10));
    },[products])

  return (
    <section className='my-10'>
      <div className='text-center py-8 texgt-3xl'>
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem facilis laudantium voluptas, ab magni quasi?
        </p>
      </div>

      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
        {
          prod?.map((item,idx) => (
            <ProductItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </section>
  )
}

export default LatestCollection
