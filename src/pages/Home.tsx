import BreadCrumbs from "../components/BreadCrumbs";
import CardsGrid from "../components/CardsGrid";
import NewsLetter from "../components/NewsLetter";
import SortingBar from "../components/SortingBar";

export default function Home() {
    return (
        <>
            <BreadCrumbs />
            <SortingBar />
            <CardsGrid />
            <NewsLetter />
        </>
    )
}