import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import Loader from "../components/Loader";
import ProductDetails from "../components/productsPage/ProductDetails";
import Header from "../components/Header";
import ProductDescription from "../components/productsPage/ProductDescription";

export default function Product() {

    const params = useParams();

    const fetchSingleProduct = async () => {
        const response = await fetch(`https://dummyjson.com/products/${params.id}`);
        const data = await response.json();
        return data
    }
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['product', params.id],
        queryFn: fetchSingleProduct,
    })

    if (isError) {
    return <span>Error: {error.message}</span>
    }

    console.log(data)

    return (
        <>
            <Header 
                productPage
            />
            {isPending ? (<div className="flex justify-center w-full h-full items-center"><Loader /></div>) :
            data && 
            <>
                <ProductDetails 
                    brand={data.brand}
                    category={data.category}
                    discountPercentage={data.discountPercentage}
                    images={data.images}
                    price={data.price}
                    rating={data.rating}
                    returnPolicy={data.returnPolicy}
                    stock={data.stock}
                    title={data.title}
                    thumbnail={data.thumbnail}
                    reviews={data.reviews}
                    minimumOrderQuantity={data.minimumOrderQuantity}
                    warrantyInformation={data.warrantyInformation}
                />
                <ProductDescription 
                    description={data.description}
                    reviews={data.reviews}
                    category={data.category}
                />
                <section className="w-full flex justify-center py-[1rem] px-[8.125rem]">
                    <div className="max-w-[1440px]">
                        <img src="/logos/Banner.png" className="cursor-pointer"/>
                    </div>
                </section>
            </>
            }
        </>
    )
}