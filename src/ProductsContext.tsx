import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useState } from "react";
import { CardItem } from "./types";

const ProductsContext = createContext({
    productsData: [] as CardItem[] | undefined,
    setSearchedProducts: (searchedProducts: string) => {searchedProducts},
    setFilteredProducts: (filteredProducts: []) => {filteredProducts},
    filteredProducts: [],
    searchedProducts: ""
});

export function ProductsProvider({ children }: PropsWithChildren<{}>) {

    const [searchedProducts, setSearchedProducts] = useState("");
    
    const [filteredProducts, setFilteredProducts] = useState([])



    const fetchProducts = async (): Promise<CardItem[]> => {

        const totalProducts = await fetch(`https://dummyjson.com/products/search?q=${searchedProducts}&limit=1000`);

        const totalProductsData = await totalProducts.json();

        return(totalProductsData.products);
    };

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['products', searchedProducts],
        queryFn: fetchProducts,
    })

    isPending && console.log('loading products...');

    isError && console.log('error loading products:', error);
    
    return (
        <ProductsContext.Provider value={{
            productsData: data,
            setSearchedProducts,
            setFilteredProducts,
            filteredProducts,
            searchedProducts
        }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;