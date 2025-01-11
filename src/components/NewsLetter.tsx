export default function NewsLetter() {
    return (
        <section className="flex items-center justify-center md:px-[8.125rem] px-5 py-10 flex-col bg-[#EFF2F4] mt-auto">
            <div className="flex flex-col items-center justify-center max-w-[1440px] w-full">
                <h1 className="text-[#1C1C1C] font-semibold text-[1.25rem]">Subscribe on our newsletter</h1>
                <p className="text-[#606060] mb-[1.313rem]">Get daily news on upcoming offers from many suppliers all over the world</p>
                <form className="flex gap-2 items-center">
                    <input type="email" name="newsletter" id="newsletter" placeholder="Email" className="border-[1px] border-[#DEE2E7] outline-none p-[9px] rounded-[6px]"/>
                    <button className="bg-[linear-gradient(180deg,_#127FFF_0%,_#0067FF_100%)] text-white px-4 py-[0.625rem] rounded-[6px]">Subscribe</button>
                </form>
            </div>
        </section>
    )
}