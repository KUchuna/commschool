import Header from "../components/Header";

export default function NotFound() {
    return (
        <>
        <Header 
            productPage
        />
            <div className="flex w-full h-full justify-center items-center">
                <h1 className="font-bold text-2xl">This page was not found!</h1>
            </div>
        </>
    )
}