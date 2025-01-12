import BreadCrumbs from "../components/BreadCrumbs";
import CardsGrid from "../components/CardsGrid";
import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import SortingBar from "../components/SortingBar";

export default function Home() {
    return (
        <>
            <Header />
            <BreadCrumbs />
            <SortingBar />
            <CardsGrid />
            <NewsLetter />
        </>
    )
}