import navham from "/logos/navham.svg";
import downarrow from "/logos/downarrow.svg";
import german from "/logos/german.svg";

export default function NavBar() { 
    return (
        <nav className="bg-white md:flex hidden items-center justify-center border-b-[1px] border-solid border-gray-200 px-[8.125rem] py-[1rem]">
            <div className="flex items-center justify-between max-w-[1440px] w-full">
                <ul className="flex gap-[1.563rem]">
                    <li className="cursor-pointer font-medium flex items-center gap-2"><img src={navham}/>All category</li>
                    <li className="cursor-pointer font-medium">Hot offers</li>
                    <li className="cursor-pointer font-medium">Gift boxes</li>
                    <li className="cursor-pointer font-medium">Projects</li>
                    <li className="cursor-pointer font-medium">Menu item</li>
                    <li className="cursor-pointer font-medium flex items-center gap-2">Help <img src={downarrow} /></li>
                </ul>
                <ul className="flex items-center gap-[1.563rem]">
                    <li className="flex items-center gap-2 cursor-pointer">English, USD <img src={downarrow}/></li>
                    <li className="flex items-center gap-2 cursor-pointer">Ship to <img src={german} /> <img src={downarrow}/></li>
                </ul>
            </div>
        </nav>
    )
}