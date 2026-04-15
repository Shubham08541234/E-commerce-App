import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../Assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  
  const [relevent, setRelevent] = useState([]);
  
  console.log("relevent: ", relevent);

  const onSelectChange = (e) => {
      let copyOfProd = allProducts.slice();

      if(e.target.value === "low-high")copyOfProd.sort((a,b) => a.price - b.price);
      else if(e.target.value === "high-low")copyOfProd.sort((a,b) => b.price - a.price);
      else copyOfProd = relevent;

      console.log("copyOfProd: ", copyOfProd);
      setAllProducts(copyOfProd);
  }

  const toggleFilter = () => {
      let copyOfproducts = products.slice();

      if(category.length > 0){
        copyOfproducts = copyOfproducts.filter(eachProducts => category.includes(eachProducts.category));
      }

      if(subCategory.length > 0){
        copyOfproducts = copyOfproducts.filter(eachProducts => subCategory.includes(eachProducts.subCategory))
      }

      setAllProducts(copyOfproducts);
      setRelevent(copyOfproducts);
  }
  useEffect(() => {
      toggleFilter();
  },[category, subCategory]);

  // funtion to toggle category
  function toggleCategory(e) {
    if (category.includes(e.target.value)) {
      setCategory(item => item.filter(a => a !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(subCategory => subCategory.filter(b => b !== e.target.value));
    }
    else setSubCategory([...subCategory, e.target.value]);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl  flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropDownIcon"
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? " " : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              kids
            </p>
          </div>
        </div>

        {/* subCatorgyfilter */}

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? " " : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>


      {/* right side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            name=""
            id=""
            className="border-2 border-gray-300 text-sm px-2"
            onChange={onSelectChange}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* map products */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
          {allProducts?.map((item, idx) => (
            <ProductItem
              key={idx}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Collection;
