import { useQuery } from '@tanstack/react-query'
import {CardItem} from '../types'
import Loader from './Loader';
import { useState } from 'react';
import ProductCard from './ProductCard';

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
            <div className="max-w-[1440px] w-full mb-[1.875rem] flex flex-wrap justify-center gap-y-[20px] gap-x-4">
                {isPending ? <div className='flex w-full items-center justify-center mt-40'><Loader /></div>
                : data.map((item: CardItem, index: number) => {
                    
                    const fullStars = Math.floor(item.rating);
                    const emptyStars = 5 - fullStars;

                    return (
                        <ProductCard 
                            key={index}
                            id={item.id} 
                            thumbnail={item.thumbnail}
                            title={item.title}
                            price={item.price}
                            discountPercentage={item.discountPercentage}
                            rating={item.rating}
                            description={item.description}
                            fullStars={fullStars}
                            emptyStars={emptyStars}
                        />
                    )
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
