import BreadCrumbs from "../components/BreadCrumbs";
import CardsGrid from "../components/CardsGrid";
import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import SideBar from "../components/SideBar";

export default function Home() {
    return (
        <>
            <Header />
            <BreadCrumbs />
            <section className="flex items-center justify-center md:px-[8.125rem] pt-[1rem] md:pb-[10.5rem] pb-[1.875rem] px-5 bg-[#F7FAFC]">
                <div className="max-w-[1440px] w-full mb-[1.875rem] flex md:justify-start justify-start">
                    <SideBar />
                    <CardsGrid />
                </div>
            </section>
            <NewsLetter />
        </>
    )
}