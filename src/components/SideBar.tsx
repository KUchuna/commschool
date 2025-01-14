import { useRef, useState } from "react";

export default function SideBar() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const ulRef = useRef<HTMLUListElement>(null)

    function handleQuestionClick (index: number) {
        setOpenIndex(index === openIndex ? null : index);
    };

    function handleCategorySelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.name != "Category") return
        console.log(e.target.name)
    }

    const accordionItems = [
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


    return (
        <div className="max-w-[230px] w-full">
            {accordionItems.map((item, index) => {

                const radioName = `${item.name}`

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
                            className={`flex flex-col gap-0 overflow-hidden transition-all duration-300 h-${index === openIndex ? "[200px]" : "[0px]"} opacity-100`}
                            ref={ulRef}
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