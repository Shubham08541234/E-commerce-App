import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [ image, setImage ] = useState("");
  console.log(productId);

  const fetchProductData = async () => {

    products.map((item) => {
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
    
  }
  console.log(productData);

  useEffect(() => {
    fetchProductData();
  },[productId, products])
  return (
    productData? <div className=' border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Img */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item, idx) => (
                  <img onClick={() => setImage(item)} key={idx} src={item} alt="img" className='w-[24%] sm:mb-3 shrink-0 cursor-pointer'/>
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="img" className='w-full h-auto'/>
          </div>
        </div>
      </div>

    </div> : <div className='opacity-0'></div>
  )
}
export default Product
