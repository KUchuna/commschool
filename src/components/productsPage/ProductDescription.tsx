import { useState } from "react";
import { MayLikeProduct, ProductDescriptionProps } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loader from "../Loader";

export default function ProductDescription(props: ProductDescriptionProps) {
    
    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = ["Description", "Reviews", "Shipping", "About company"];

    async function similarProducts() {
        const response = await fetch(`https://dummyjson.com/products/category/${props.category}`)
        const data = await response.json()
        return data.products
    }


    const { isPending, isError, data, error } = useQuery({
        queryKey: ['products', props.category],
        queryFn: similarProducts,
    })

    if (isError) {
        return <span>Error: {error.message}</span>
    }




    function handleTabChange(index: number) {
        setSelectedTab(index);
    }

    

    return (
        <section className="bg-white flex items-center justify-center px-[8.125rem] py-[1rem]">
            <div className="flex items-start justify-between gap-[1.25rem] max-w-[1440px] w-full  rounded-[6px]">
                <div className="w-full">
                    <div className="flex  justify-between w-full">
                        <ul className="flex border-b w-full">
                            {tabs.map((tab, index) => (
                                <li key={index} className={`p-4 text-gray-2 font-medium cursor-pointer ${selectedTab === index ? "text-primary border-b-primary border-b-[2px]" : ""}`} onClick={() => handleTabChange(index)}>{tab}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="py-4">
                    {selectedTab === 0 ? (
                        <p className="max-w-[500px]">{props.description}</p>
                    ) : selectedTab === 1 ? (
                        <div className="flex flex-wrap gap-10">
                            {props.reviews.map((review, index) => {
                                
                                const date = new Date(review.date)

                                const fullStars = Math.floor(review.rating);
                                const emptyStars = 5 - fullStars;

                                return <div key={index} className="flex flex-col gap-3 border p-4 rounded-[6px] max-w-[380px] w-full">
                                    <div className="flex items-center gap-4">
                                        <img src="/logos/defprofile.jpg" className="w-[40px] h-[40px] rounded-full"/>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-primary">
                                                {review.reviewerName}
                                            </span>
                                            <span className="text-gray-0">
                                                {review.reviewerEmail}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-dark flex justify-between">
                                            {review.comment}
                                            <span className="text-gray-2">
                                                {date.toLocaleDateString("en-US")}
                                            </span>
                                        </p>
                                        <div className="card-star-container flex mt-2">
                                            {Array.from({ length: fullStars }).map((_, i) => (
                                                <img
                                                    key={`full-${i}`}
                                                    src="/logos/fullstar.svg"
                                                    alt="Full Star"
                                                    className="star-icon"
                                                />
                                            ))}
                                            {Array.from({ length: emptyStars }).map((_, i) => (
                                                <img
                                                    key={`empty-${i}`}
                                                    src="/logos/emptystar.svg"
                                                    alt="Empty Star"
                                                    className="star-icon"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    ) : selectedTab === 2 ? (
                        "Learn about our shipping policies, estimated delivery times, and any associated costs for this product."
                    ) : (
                        "Discover more about our company, including our values, mission, and commitment to quality and customer satisfaction."
                    )}
                    </div>
                </div>
                <div className="max-w-[280px] w-full border rounded-[6px] py-[1.25rem] px-4">
                        <span className="font-bold">
                            You may also like
                        </span>
                        <ul className="flex flex-col gap-4">
                            {isPending ? (<div className="flex justify-center w-full h-full items-center"><Loader /></div>) :
                            (data && data.slice(0,5).map((item: MayLikeProduct, index: number) => (
                                <Link to={`/product/${item.id}`} key={index}>
                                    <li className="flex flex-col gap-4 cursor-pointer">
                                        <div className="flex gap-[0.688rem]">
                                            <img src={item.images[0]} alt="" className="w-[80px] h-[80px] object-contain border rounded-[6px]"/>
                                            <div className="flex-col flex">
                                                <span className="font-medium">
                                                    {item.title}
                                                </span>
                                                <span className="text-gray-2">${item.price}</span>
                                            </div>
                                        </div>                                
                                    </li>
                                </Link>
                            )))}
                        </ul>
                </div>
            </div>
        </section>
    )
}