import { useState } from "react";
import { ProductDetailsProps } from "../../types";
import { createPortal } from "react-dom";

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
        setModalIndex(0);
    }

    return (
        <section className="bg-white md:flex hidden items-center justify-center px-[8.125rem] py-[1rem]">
            <div className="flex items-center justify-between max-w-[1440px] w-full border-[1px] border-gray-3 p-[1.25rem] rounded-[6px]">
                <div className="flex flex-col gap-[1.25rem]">
                    <div className="rounded-[6px] border-[1px] border-gray-3 ">
                        <img src={selectedImage} alt={props.title} className="w-[380px] h-[380px] object-contain cursor-pointer" onClick={() => setShowImageModal(true)}/>
                    </div>
                    <div className="flex gap-2">
                        {props.images.map((image, index) => (
                            <img key={index} src={image} alt={props.title} className={`w-[56px] h-[56px] object-contain rounded-[6px] border-[2px] border-gray-3 cursor-pointer hover:border-gray-2 ${selectedImage ===image ? "border-primary" : ""}`} onClick={() => setSelectedImage(props.images[index])}/>
                        ))}
                    </div>
                </div>
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