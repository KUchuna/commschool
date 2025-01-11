import BreadCrumbs from "./components/BreadCrumbs";
import CardsGrid from "./components/CardsGrid";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsLetter from "./components/NewsLetter";
import SortingBar from "./components/SortingBar";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
        <Header />
        <BreadCrumbs />
        <SortingBar />
        <CardsGrid />
        <NewsLetter />
        <Footer />
    </QueryClientProvider>
    </>
  )
}