import { useQuery } from '@tanstack/react-query'
import {CardItem} from '../types'
import Loader from './Loader';
import { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import ProductsContext from '../ProductsContext';
import SortingBar from './SortingBar';
import { useSearchParams } from 'react-router-dom';

export default function CardsGrid() {

    const {productsData, searchedProducts, filteredProducts} = useContext(ProductsContext);


    const [pageLimit, setPageLimit] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [params, _] = useSearchParams();

    const sortingSelected = params.get("sorting");

    useEffect(() => {
        productsData && setTotalPages(Math.ceil(productsData.length/pageLimit));
    }, [productsData, pageLimit]);


    const fetchProducts = async (): Promise<CardItem[]> => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const response = await fetch(`https://dummyjson.com/products/search?q=${searchedProducts}&limit=${sortingSelected ? "1000" : pageLimit}&skip=${pageLimit*(currentPage-1)}`);
                const data = await response.json();
                resolve(data.products);
            }, 500);
        });
    };

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['searched-products', pageLimit, currentPage, searchedProducts, sortingSelected],
        queryFn: fetchProducts,
    })

    if (isError) {
    return <span>Error: {error.message}</span>
    }


    

    function sortProducts(products: CardItem[] | undefined, criteria: string | null): CardItem[] {
        if (!products) return [];

        switch (criteria) {
            case "price-ascending":
                return [...products].sort((a, b) => a.price - b.price);
            case "price-descending":
                return [...products].sort((a, b) => b.price - a.price);
            case "least-rating":
                return [...products].sort((a, b) => a.rating - b.rating);
            case "top-rating":
                return [...products].sort((a, b) => b.rating - a.rating);
            case "name-ascending":
                return [...products].sort((a, b) => a.title.localeCompare(b.title));
            case "name-descending":
                return [...products].sort((a, b) => b.title.localeCompare(a.title));
            default:
                return products;
        }
    }

    const productsToSort: CardItem[] | undefined = filteredProducts?.length
        ? filteredProducts
        : data;

    const sortedProducts = sortProducts(productsToSort, sortingSelected);

    

    function handlePagelimit(e: React.ChangeEvent<HTMLSelectElement>) {
        setPageLimit(parseInt(e.target.value));
        setCurrentPage(1);
    }

    function handlePageChange(i: number) {
        setCurrentPage(i + 1);
    }

    return (
        <section className="flex items-center justify-start flex-col gap-[1.25rem] px-5 bg-[#F7FAFC] w-full">
            <SortingBar />
            <div className={`w-full mb-[1.875rem] ${isPending ? "flex justify-center items-center" : "grid grid-cols-3 gap-4"}`}>
                {isPending ? (<div className='flex w-full items-center justify-center mt-40'><Loader /></div>)
                : (
                    (sortedProducts.length ? sortedProducts : (data ? data : productsToSort))?.map((item: CardItem, index: number) => {
                        const fullStars = Math.floor(item.rating);
                        const emptyStars = 5 - fullStars;
                
                        return (
                            <ProductCard 
                                key={index}
                                id={item.id} 
                                thumbnail={item.images[0]}
                                title={item.title}
                                price={item.price}
                                discountPercentage={item.discountPercentage}
                                rating={item.rating}
                                description={item.description}
                                fullStars={fullStars}
                                emptyStars={emptyStars}
                            />
                        );
                    })
                )}
            </div>
            {filteredProducts?.length >0 ? <></> : (<div className="flex max-w-[1440px] w-full gap-2">
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
            </div>)}
        </section>
    );
}
