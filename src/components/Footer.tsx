export default function Footer() {
    return (
        <>
            <footer className="flex items-center justify-center md:px-[8.125rem] px-5 py-10 flex-col bg-white mt-auto">
            <div className="flex items-center justify-between max-w-[1440px] w-full">
                <div className="flex w-full justify-between">
                    <div>
                        <img src="/logos/headerlogo.svg" alt="" className="md:mb-0 mb-[0.938rem]"/>
                        <p className="my-[0.938rem] max-w-[276px] hidden md:block">Best information about the company gies here but now lorem ipsum is</p>
                        <ul className="flex gap-[0.625rem]">
                            <li className="cursor-pointer"><img src="/logos/facebook.svg" alt=""/></li>
                            <li className="cursor-pointer"><img src="/logos/twitter.svg" alt=""/></li>
                            <li className="cursor-pointer"><img src="/logos/linkedin.svg" alt=""/></li>
                            <li className="cursor-pointer"><img src="/logos/instagram.svg" alt=""/></li>
                            <li className="cursor-pointer"><img src="/logos/youtube.svg" alt=""/></li>
                        </ul>
                    </div>
                    <div className="md:flex gap-16 hidden">
                        <ul className="flex flex-col gap-[3px]">
                            <li className="mb-[0.625rem]"><strong>About</strong></li>
                            <li className="text-[#8B96A5] cursor-pointer">About Us</li>
                            <li className="text-[#8B96A5] cursor-pointer">Find Store</li>
                            <li className="text-[#8B96A5] cursor-pointer">Categories</li>
                            <li className="text-[#8B96A5] cursor-pointer">Blogs</li>
                        </ul>
                        <ul className="flex flex-col gap-[3px]">
                            <li className="mb-[0.625rem]"><strong>Partnership</strong></li>
                            <li className="text-[#8B96A5] cursor-pointer">About Us</li>
                            <li className="text-[#8B96A5] cursor-pointer">Find Store</li>
                            <li className="text-[#8B96A5] cursor-pointer">Categories</li>
                            <li className="text-[#8B96A5] cursor-pointer">Blogs</li>
                        </ul>
                        <ul className="flex flex-col gap-[3px]">
                            <li className="mb-[0.625rem]"><strong>Information</strong></li>
                            <li className="text-[#8B96A5] cursor-pointer">Help Center</li>
                            <li className="text-[#8B96A5] cursor-pointer">Money Refund</li>
                            <li className="text-[#8B96A5] cursor-pointer">Shipping</li>
                            <li className="text-[#8B96A5] cursor-pointer">Contact Us</li>
                        </ul>
                        <ul className="flex flex-col gap-[3px]">
                            <li className="mb-[0.625rem]"><strong>For Users</strong></li>
                            <li className="text-[#8B96A5] cursor-pointer">Login</li>
                            <li className="text-[#8B96A5] cursor-pointer">Register</li>
                            <li className="text-[#8B96A5] cursor-pointer">Settings</li>
                            <li className="text-[#8B96A5] cursor-pointer">My Orders</li>
                        </ul>
                    </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="font-bold mb-[0.625rem]">Get app</h4>
                            <img src="/logos/appstore.svg" alt="" className="cursor-pointer"/>
                            <img src="/logos/googleplay.svg" alt="" className="cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="md:px-[8.125rem] px-5 flex items-center justify-between border-t-[#DEE2E7] border-t-[1px] bg-[#EFF2F4] py-[1.313rem]">
                <p className="text-[#606060]">© 2023 Ecommerce.</p>
                <select className="outline-none bg-[#EFF2F4]">
                    <option>English</option>
                    <option>German</option>
                </select>
            </div>
        </>
    )
}