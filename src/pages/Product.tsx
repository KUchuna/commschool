import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import Loader from "../components/Loader";

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
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <img src={data.thumbnail} alt={data.title} />
        </div>
    )
}