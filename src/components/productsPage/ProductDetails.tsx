import { useState } from "react";
import { ProductDetailsProps } from "../../types";
import { createPortal } from "react-dom";
import SellerDetails from "./SellerDetails";

export default function ProductDetails(props: ProductDetailsProps) {


    const [selectedImage, setSelectedImage] = useState(props.images[0]);

    const [showImageModal, setShowImageModal] = useState(false);
    
    const [modalIndex, setModalIndex] = useState(0);

    function handlePrevImage() {
        if(modalIndex === 0) return;
        setModalIndex(modalIndex-1);
    }
    
    function handleNextImage() {
        if(modalIndex === props.images.length-1) return;
        setModalIndex(modalIndex+1);
    }

    function handleModalClose() { 
        setShowImageModal(false);
    }

    function handleImageSelection(i:number) {
        setSelectedImage(props.images[i]);
        setModalIndex(i);
    }

    const fullStars = Math.floor(props.rating);
    const emptyStars = 5 - fullStars;

    return (
        <section className="bg-white flex items-center justify-center px-[8.125rem] py-[1rem]">
            <div className="flex items-start justify-start max-w-[1440px] w-full border-[1px] border-gray-3 p-[1.25rem] rounded-[6px]">
                <div className="flex flex-col gap-[1.25rem]">
                    <div className="rounded-[6px] border-[1px] border-gray-3 ">
                        <img src={selectedImage} alt={props.title} className="w-[380px] h-[380px] object-contain cursor-pointer" onClick={() => setShowImageModal(true)}/>
                    </div>
                    <div className="flex gap-2">
                        {props.images.map((image, index) => (
                            <img key={index} src={image} alt={props.title} className={`w-[56px] h-[56px] object-contain rounded-[6px] border-[2px] border-gray-3 cursor-pointer hover:border-gray-2 ${selectedImage ===image ? "border-primary" : ""}`} onClick={() => handleImageSelection(index)}/>
                        ))}
                    </div>
                </div>
                <div className="ml-[1.25rem] flex flex-col">
                    <span className="text-green flex items-center gap-1"><img src="/logos/checkmark.svg" /> In stock {props.stock}</span>
                    <h1 className="font-semibold text-[1.25rem] text-dark mb-[0.625rem]">{props.title}</h1>
                    <div className="card-rating-container mb-2">
                        <div className="card-star-container flex">
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
                        {props.rating}
                        <span className="text-gray-3">&#9679;</span>
                        <div className="flex items-center gap-2 text-gray-2">
                            <img src="/logos/reviews.svg" alt="Reviews"/>
                            <span>{props.reviews.length} reviews</span>
                            <span className="text-gray-3">&#9679;</span>
                            <img src="/logos/shoppingcart.svg" alt=""/>
                            <span>100 sold</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start bg-[#FFF0DF] p-4 w-fit">
                        <div className="flex items-center gap-2">
                            <span className="text-[1.5rem] text-red font-semibold">${props.price}</span>
                            <span className="text-gray-2 line-through">${Math.round(props.price + (props.price * props.discountPercentage) / 100)}.00</span>
                        </div>
                        <span className="text-[#606060]">Min. {props.minimumOrderQuantity} pcs</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-5 mt-[1.25rem] border-y py-3">
                        <ul className="flex flex-col gap-3">
                            <li className="text-gray-2">Brand:</li>
                            <li className="text-gray-2">Category:</li>
                            <li className="text-gray-2">Return Policy:</li>
                            <li className="text-gray-2">Warranty Information:</li>
                        </ul>
                        <ul className="flex flex-col gap-3 items-start h-full">
                            {props.brand ? <li className="text-dark">{props.brand}</li> : <li>N/A</li>}
                            <li className="text-dark first-letter:uppercase">{props.category}</li>
                            <li className="text-dark">{props.returnPolicy}</li>
                            <li className="text-dark">{props.warrantyInformation}</li>
                        </ul>
                    </ul>
                </div>
                <SellerDetails />
            </div>
            {showImageModal && createPortal(
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center z-[1000]">
                    <div className="relative w-[50%] h-[80%] flex justify-center items-center bg-white rounded-lg">
                        <button onClick={() => handlePrevImage()} className="flex justify-center items-center h-[60px] min-w-[60px] hover:bg-gray-3 rounded-full ml-2"><img src="/logos/rightarrow.svg" className="rotate-180 cursor-pointer w-[40px]"/></button>
                        <img src={props.images[modalIndex]} alt={props.title} className="w-[90%] h-[90%] object-contain" />
                        <button onClick={() => handleNextImage()} className="flex justify-center items-center h-[60px] min-w-[60px] hover:bg-gray-3 rounded-full mr-2"><img src="/logos/rightarrow.svg" className="cursor-pointer w-[40px]"/></button>
                    </div>
                    <button className="absolute right-[20%] top-[10%] bg-orange text-white p-2 w-[50px] h-[50px] font-bold rounded-full" onClick={() => handleModalClose()}>X</button>
                </div>,
                document.body
            )}
        </section>
    )
}