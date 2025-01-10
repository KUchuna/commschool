import BreadCrumbs from "./components/BreadCrumbs";
import CardsGrid from "./components/CardsGrid";
import Header from "./components/Header";
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
    </QueryClientProvider>
    </>
  )
}