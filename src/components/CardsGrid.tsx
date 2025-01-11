import { useQuery } from '@tanstack/react-query'
import {CardItem} from '../types'
import heart from '/logos/heart.svg'
import fullStar from '/logos/fullstar.svg';
import emptyStar from '/logos/emptystar.svg';
import Loader from './Loader';
import { useState } from 'react';

export default function CardsGrid() {

    const [pageLimit, setPageLimit] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = async (): Promise<CardItem[]> => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                
                //need to move this in useContext so that it does not refetch on every page change
                const totalProducts = await fetch(`https://dummyjson.com/products?limit=1000`);
                const totalProductsData = await totalProducts.json();
                
                const response = await fetch(`https://dummyjson.com/products?limit=${pageLimit}&skip=${pageLimit*(currentPage-1)}`);
                const data = await response.json();
                setTotalPages(Math.ceil(totalProductsData.products.length/pageLimit));
                resolve(data.products);
            }, 500);
        });
    };

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['products', pageLimit, currentPage],
        queryFn: fetchProducts,
    })

    if (isError) {
    return <span>Error: {error.message}</span>
    }

    function handlePagelimit(e: React.ChangeEvent<HTMLSelectElement>) {
        setPageLimit(parseInt(e.target.value));
        setCurrentPage(1);
    }

    function handlePageChange(i: number) {
        setCurrentPage(i + 1);
        console.log(currentPage)
    }

    return (
        <section className="flex items-center justify-center md:px-[8.125rem] pt-[1rem] md:pb-[10.5rem] pb-[1.875rem] flex-col px-5">
            <div className="max-w-[1440px] w-full mb-[1.875rem] flex flex-wrap justify-start gap-y-[20px] gap-x-7">
                {isPending ? <div className='flex w-full items-center justify-center mt-40'><Loader /></div>
                : data.map((item: CardItem, index: number) => {
                    
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
                                    <div className="card-favorite-icon">
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
                    id="page-size" onChange={(e) => handlePagelimit(e)} value={pageLimit}
                >
                    <option value="3">Show 3</option>
                    <option value="6">Show 6</option>
                    <option value="9">Show 9</option>
                    <option value="12">Show 12</option>
                </select>
                <div className="pagination flex gap-2">
                    <button className='single-item' onClick={() => setCurrentPage(1)}>First</button>
                    {totalPages > 0 &&
                        Array.from({ length: totalPages })
                            .map((_, i) => i)
                            .filter((i) => 
                                i >= Math.max(currentPage - 4, 0) && 
                                i <= Math.min(currentPage + 2, totalPages - 1) 
                            )
                            .map((i) => (
                                <button
                                    key={i}
                                    className={`single-item ${i === currentPage-1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(i)}
                                >
                                    {i + 1}
                                </button>
                            ))
                    }
                    <button className='single-item' onClick={() => setCurrentPage(totalPages)}>Last</button>
                </div>
            </div>
        </section>
    );
}
