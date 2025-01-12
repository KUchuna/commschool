export interface CardItem {
    title: string;
    thumbnail: string;
    price: number;
    rating: number;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[]
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

export interface ProductDetailsProps {
    brand: string;
    category: string;
    discountPercentage: number;
    images: string[];
    price: number;
    rating: number;
    returnPolicy: string;
    stock: number;
    title: string;
    thumbnail: string;
    reviews: [{comment: string, rating: number, date: string, reviewerName: string, reviewerEmail: string}];
    minimumOrderQuantity: number;
    warrantyInformation: string;
}

export interface ProductDescriptionProps {
    description: string;
    reviews: [{comment: string, rating: number, date: string, reviewerName: string, reviewerEmail: string}];
    category: string;
}

export interface MayLikeProduct {
    images: string[];
    title: string;
    price: number;
    id: number;
}
