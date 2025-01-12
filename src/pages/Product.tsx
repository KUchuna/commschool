import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import Loader from "../components/Loader";
import ProductDetails from "../components/productsPage/ProductDetails";

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

    if(isPending) {
        return <div className="flex justify-center w-full"><Loader /></div>
    }

    return (
        <div>
            {data && 
                <ProductDetails 
                    brand={data.brand}
                    category={data.category}
                    description={data.description}
                    discountPercentage={data.discountPercentage}
                    images={data.images}
                    price={data.price}
                    rating={data.rating}
                    returnPolicy={data.returnPolicy}
                    stock={data.stock}
                    title={data.title}
                    thumbnail={data.thumbnail}
                />
            }
        </div>
    )
}