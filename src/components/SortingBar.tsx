import { useContext } from "react";
import grid from "/logos/grid.svg";
import list from "/logos/list.svg";
import ProductsContext from "../ProductsContext";

export default function SortingBar() { 

    const {productsData} = useContext(ProductsContext);

    return (
        <div className="flex items-center justify-center w-full bg-[#F7FAFC]">
            <div className="flex items-center justify-between max-w-[1440px] w-full border-[1px] border-solid border-gray-200 bg-white py-[0.688rem] md:px-[0.625rem] md:rounded-lg">
                <p className="md:block hidden">{productsData?.length} <strong>Products found</strong></p>
                <div className="flex items-center justify-between w-full md:w-[initial] gap-[17px]">
                    <select className="border-[1px] border-[#DEE2E7] p-[10px] rounded-[6px]" id="sorting">
                        <option value="default">
                            Default
                        </option>
                        <option value="price-ascending">
                            Price ascending
                        </option>
                        <option value="price-descending">
                            Price descending
                        </option>
                        <option value="top-rating">
                            Top rating
                        </option>
                        <option value="least-rating">
                            Least rating
                        </option>
                    </select>
                    <ul className="flex items-center">
                        <li className="border-[1px] border-[#DEE2E7] p-[10px]  rounded-l-[6px] cursor-pointer bg-[#EFF2F4]"><img src={grid} alt="" className="w-[18px] h-[18px]"/></li>
                        <li className="border-[1px] border-[#DEE2E7] p-[10px] rounded-r-[6px] cursor-pointer"><img src={list} alt="" className="w-[18px] h-[18px]"/></li>
                    </ul>
                </div>
            </div>  
        </div>
    ) 
}