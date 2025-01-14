import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useContext } from "react";
import ProductsContext from "../ProductsContext";

export const accordionItems = [
    {
        name: "Category",
        values: [
            "beauty",
            "fragrances",
            "furniture",
            "groceries",
            "home-decoration",
            "kitchen-accessories",
            "laptops",
            "mens-shirts",
            "mens-shoes",
            "mens-watches",
            "mobile-accessories",
            "motorcycle",
            "skin-care",
            "smartphones",
            "sports-accessories",
            "sunglasses",
            "tablets",
            "tops",
            "vehicle",
            "womens-bags",
            "womens-dresses",
            "womens-jewellery",
            "womens-shoes",
            "womens-watches"
        ]
    },
    {
        name: "Brands",
        values: ["Example1", "Example2", "Example3", "Example4", "Example5"]
    },
    {
        name: "Features",
        values: ["Example6", "Example7", "Example8", "Example9", "Example10"]
    },
    {
        name: "Manufacturer",
        values: ["Example11", "Example12", "Example13", "Example14", "Example15"]
    },
]

export default function SideBar() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("")

    const {setFilteredProducts} = useContext(ProductsContext)


    function handleQuestionClick (index: number) {
        setOpenIndex(index === openIndex ? null : index);
    };

    function handleCategorySelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name != "Category") return
        setSelectedCategory(e.target.value)
    }


    const productsByCategory = async () => {

        const products = await fetch(`https://dummyjson.com/products/category/${selectedCategory}`);

        const productsData = await products.json();
        

        return(productsData.products);
    };

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['selectedProducts', selectedCategory],
        queryFn: productsByCategory,
        enabled: selectedCategory !== ""
    })

    isPending && <></>;

    isError && console.log(error)

    setFilteredProducts(data)

    return (
        <div className="max-w-[230px] w-full">
            {selectedCategory != "" ? <button className="bg-primary text-white px-[23px] py-[11px] rounded-[6px] mb-4 w-full" onClick={() => setSelectedCategory("")}>
                Clear
            </button> : <></>}
            {accordionItems.map((item, index) => {

                const radioName = `${item.name}`
                const ulRef = useRef<HTMLUListElement>(null)

                return (
                    <form className={`flex flex-col border-t border-gray-3`} key={index}>
                        <span
                            className="font-semibold cursor-pointer py-4 flex justify-between select-none"
                            onClick={() => handleQuestionClick(index)}
                        >
                            {item.name}
                            <img
                            src="/logos/downarrow.svg"
                            className={`w-6 transition-transform duration-300 ${index === openIndex ? "rotate-180" : "rotate-0"} select-none`}
                            />
                        </span>
                        <ul
                            className={`flex flex-col overflow-auto scroll transition-all duration-300 max-h-[200px]`}
                            style={index === openIndex
                                ? { height: ulRef.current?.scrollHeight }
                                : { height: "0px" }}
                            ref={ulRef}
                            id="sidebar-ul"
                        >
                            {item.values.map((item, index) => (
                            <li
                                className="py-2 flex items-center gap-2 transition-all duration-300"
                                key={index}
                            >
                                <input
                                type="radio"
                                name={radioName}
                                id={`${item}`}
                                checked={selectedCategory === item}
                                value={item}
                                className="h-4 w-4"
                                onChange={(e) => handleCategorySelect(e)}
                                />
                                <label
                                className="first-letter:uppercase cursor-pointer"
                                htmlFor={`${item}`}
                                >
                                {item}
                                </label>
                            </li>
                            ))}
                        </ul>
                    </form>
                )
            })}
        </div>
    )
}