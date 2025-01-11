export interface CardItem {
    title: string;
    thumbnail: string;
    price: number;
    rating: number;
    description: string;
    discountPercentage: number;
    id: number;
}


export interface ProductCardProps {
    thumbnail: string;
    title: string;
    price: number;
    rating: number;
    description: string;
    discountPercentage: number;
    fullStars: number;
    emptyStars: number;
    id: number;
}