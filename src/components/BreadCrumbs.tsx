import rightarrow from "/logos/rightarrow.svg";

export default function BreadCrumbs() {
    return (
        <div className="md:flex hidden items-center justify-center px-[8.125rem] py-[1rem] bg-[#F7FAFC]">
            <div className="flex items-center justify-between max-w-[1440px] w-full">
                <ul className="flex gap-2">
                    <li className="text-text-gray flex gap-2 cursor-pointer hover:underline">Home <img src={rightarrow} alt="" /></li>
                    <li className="text-text-gray flex gap-2 cursor-pointer hover:underline">Shopping <img src={rightarrow} alt="" /></li>
                    <li className="text-text-gray flex gap-2 cursor-pointer hover:underline">Products</li>
                </ul>
            </div>  
        </div>
    )
}