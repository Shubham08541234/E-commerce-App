import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../Assets/frontend_assets/assets";
import { ProductItem, Title, SearchBar } from "../components/index.js";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

  const [productToShow, setProductToShow] = useState(products);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [searchVal, setSearchVal] = useState("");

  

  console.log("category: ", category);
  console.log("subCategory: ", subCategory);

  const searchedProduct = () => {
    setProductToShow(() => products.filter(e => {
      const name = e.name.toLowerCase();
      const words = name.split(/\s+/);
      return words.some(word => word.startsWith(searchVal));
    }));
  }

  const toggleCategory = (e) => {
    const val = e.target.value;
    let cat;
    if (category.includes(val)) {
      cat = category.filter((e) => e !== val);
    } else cat = [...category, val];

    setCategory(cat);
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    let cat;
    if (subCategory.includes(val)) {
      cat = subCategory.filter((e) => e !== val);
    } else cat = [...subCategory, val];

    setSubCategory(cat);
  };

  const toggleSortBy = (e) => {
    const val = e.target.value;
    let copy = productToShow.slice();
    if (val === "low-high") {
      copy.sort((a, b) => a.price - b.price);
    } else if (val === "high-low") {
      copy.sort((a, b) => b.price - a.price);
    } else {
      copy = products.slice();
      if (category.length > 0) {
        copy = copy.filter((prod) => category.includes(prod.category));
      }
      if (subCategory.length > 0) {
        copy = copy.filter((prod) => subCategory.includes(prod.subCategory));
      }
    }

    setProductToShow(copy);
  };

  const toggleFilter = () => {
    let prod = products.slice();

    if (category && category.length > 0) {
      prod = prod.filter((each) => category.includes(each.category));
    }

    if (subCategory && subCategory.length > 0) {
      prod = prod.filter((each) => subCategory.includes(each.subCategory));
    }
    setProductToShow(prod);
  };

  useEffect(() => {
    toggleFilter();
  }, [category, subCategory, searchVal]);

  useEffect(() => {
    searchedProduct();
  }, [searchVal])

  return (
    <div>
      <SearchBar
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />
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

          {/* category filter */}

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
              onChange={toggleSortBy}
            >
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* map products */}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
            {productToShow?.map((item, idx) => (
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
    </div>
  );
};
export default Collection;
