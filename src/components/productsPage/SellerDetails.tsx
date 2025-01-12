export default function SellerDetails() {
    return (
        <div className="flex flex-col items-center gap-[1.438rem] ml-[auto] max-w-[280px] w-full">
            <div className="flex flex-col border px-4 py-[1.25rem] rounded-[6px] w-full">
                <div className="flex items-center gap-2">
                    <img src='/logos/ucha.jpg' className="w-[48px] h-[48px] rounded-[4px]"/>
                    <p className="text-lg max-w-[100px] ml-[0.688rem]">Ucha Kobakhidze</p>
                </div>
                <hr className="my-[1.25rem]"></hr>
                <ul>
                    <li className="flex gap-[1.063rem] text-gray-2"><img src="/logos/georgia.svg" className="w-[21px]"/> Georgia, Tbilisi</li>
                    <li className="flex gap-[1.063rem] text-gray-2"><img src="/logos/verified.svg" className="w-[21px]"/> Verified seller</li>
                    <li className="flex gap-[1.063rem] text-gray-2"><img src="/logos/language.svg" className="w-[21px]"/> Worldwide shipping</li>
                </ul>
                <button className="w-full bg-primary text-white py-[0.625rem] mt-[1.25rem] rounded-[6px]">Send inquiry</button>
                <button className="w-full bg-white text-primary py-[0.625rem] mt-2 rounded-[6px] border">Seller's profile</button>
            </div>
            <span className="text-primary flex items-center gap-2 cursor-pointer"><img src="/logos/fav.svg"/> Save for later</span>
        </div>
    )
}