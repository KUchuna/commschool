import headerlogo from "/logos/headerlogo.svg";
import profile from "/logos/profile.svg";
import message from "/logos/message.svg";
import orders from "/logos/orders.svg";
import cart from "/logos/cart.svg";
import mobilecart from "/logos/mobilecart.svg";
import mobileprofile from "/logos/mobileprofile.svg";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ProductsContext from '../ProductsContext';

export default function Header({productPage}: {productPage?: boolean}) {

    const {searchedProducts, setSearchedProducts} = useContext(ProductsContext);


    return (
        <>
            <header className="sticky top-0 z-50 bg-white flex items-center justify-center border-b-[1px] border-solid border-gray-200 md:px-[8.125rem] md:py-[1.25rem] px-5 py-4">
                <div className="flex items-center justify-between max-w-[1440px] w-full">
                    <Link to="/">
                        <img src={headerlogo} alt="logo" className="cursor-pointer w-[120px] md:w-[initial]"/>
                    </Link>
                    {productPage ? <></> : <div className="w-[50%] md:flex hidden border-primary border-[2px] rounded-lg">
                        <input type="text" name="search" id="search" value={searchedProducts} onChange={(e) => setSearchedProducts(e.target.value)}
                        placeholder="Search" className="w-full rounded-l-lg border-r-[1px] border-primary px-[10px] outline-none"/>
                        {/* <select className="outline-none mx-[10px]">
                            <option>All</option>
                            <option>Mobile phones</option>
                            <option>Clothes</option>
                            <option>Footwear</option>
                        </select> */}
                        <button className="bg-primary text-white px-[23px] py-[11px]" onClick={() => setSearchedProducts('')}>
                            Clear
                        </button>
                    </div>}
                    <ul className="md:flex hidden gap-[1.438rem] items-center">
                        <li className="flex flex-col items-center gap-2 cursor-pointer"><img src={profile} className="w-[20px] h-[20px]"/><p className="text-gray-2 text-sm">Profile</p></li>
                        <li className="flex flex-col items-center gap-2 cursor-pointer"><img src={message} className="w-[20px] h-[20px]"/><p className="text-gray-2 text-sm">Message</p></li>
                        <li className="flex flex-col items-center gap-2 cursor-pointer"><img src={orders} className="w-[20px] h-[20px]"/><p className="text-gray-2 text-sm">Orders</p></li>
                        <li className="flex flex-col items-center gap-2 cursor-pointer"><img src={cart} className="w-[20px] h-[20px]"/><p className="text-gray-2 text-sm w-max">My cart</p></li>
                    </ul>
                    <ul className="md:hidden flex gap-5 items-center">
                        <li className="cursor-pointer"><img src={mobilecart}/></li>
                        <li className="cursor-pointer"><img src={mobileprofile}/></li>
                    </ul>
                </div>
            </header>
            <NavBar />
        </>
    )
}