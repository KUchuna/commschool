import { useQuery } from '@tanstack/react-query'
import {CardItem} from '../types'
import heart from '/logos/heart.svg'
import fullStar from '/logos/fullstar.svg';
import emptyStar from '/logos/emptystar.svg';
import Loader from './Loader';



export default function CardsGrid() {

    const fetchProducts = async (): Promise<CardItem[]> => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                console.log(data.products);
                resolve(data.products);
            }, 2000);
        });
    };

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })

    if (isPending) {
    return <div className='flex w-full items-center justify-center mt-40'><Loader /></div>
    }

    if (isError) {
    return <span>Error: {error.message}</span>
    }

    return (
        <section className="flex items-center justify-center md:px-[8.125rem] pt-[1rem] md:pb-[10.5rem] pb-[1.875rem] flex-col px-5">
            <div className="max-w-[1440px] w-full mb-[1.875rem]" id="list-container">
                {data && data.map((item: CardItem, index: number) => {
                    const fullStars = Math.floor(item.rating);
                    const emptyStars = 5 - fullStars;

                    return (
                        <div key={index} className="card-container">
                            <img src={item.thumbnail} className="card-thumbnail" />
                            <div className="card-description-container">
                                <div className="card-price-rating-container">
                                    <div>
                                        <div className="card-title-price-container">
                                            <p className="card-title">{item.title}</p>
                                            <strong>${item.price}</strong>
                                            <span className="card-original-price">
                                                {Math.round(item.price + (item.price * item.discountPercentage) / 100)}.00
                                            </span>
                                        </div>
                                        <div className="card-rating-container">
                                            <div className="card-star-container flex">
                                                {Array.from({ length: fullStars }).map((_, i) => (
                                                    <img
                                                        key={`full-${i}`}
                                                        src={fullStar}
                                                        alt="Full Star"
                                                        className="star-icon"
                                                    />
                                                ))}
                                                {Array.from({ length: emptyStars }).map((_, i) => (
                                                    <img
                                                        key={`empty-${i}`}
                                                        src={emptyStar}
                                                        alt="Empty Star"
                                                        className="star-icon"
                                                    />
                                                ))}
                                            </div>
                                            {item.rating}
                                        </div>
                                        <p className="card-shipping-container">Free Shipping</p>
                                    </div>
                                    <div className="card-favorite-icon border-[2px] border-gray-3 p-2 rounded-lg">
                                        <img src={heart} alt="Favorite Icon" />
                                    </div>
                                </div>
                                <p className="card-description">{item.description.slice(0, 50)}...</p>
                            </div>
                        </div>)
                })}
            </div>
            <div className="flex max-w-[1440px] w-full gap-2">
                <select
                    className="ml-auto border-[1px] border-[#DEE2E7] rounded-[6px] outline-none px-[10px]"
                    id="page-size"
                >
                    <option value="9">Show 9</option>
                    <option value="13">Show 13</option>
                    <option value="16">Show all</option>
                </select>
                <div className="pagination flex gap-2"></div>
            </div>
        </section>
    );
}
