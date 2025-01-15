import { Link } from "react-router-dom";
import { ProductCardProps } from "../types";

export default function ProductCard(props: ProductCardProps) {
    return (
        <Link to={`/product/${props.id}`} className="card-container">
            <img src={props.thumbnail} className="card-thumbnail" />
            <div className="card-description-container">
                <div className="card-price-rating-container">
                    <div>
                        <div className="card-title-price-container">
                            <p className="card-title">{props.title}</p>
                            <strong>${props.price}</strong>
                            <span className="card-original-price">
                                {Math.round(props.price + (props.price * props.discountPercentage) / 100)}.00
                            </span>
                        </div>
                        <div className="card-rating-container">
                            <div className="card-star-container flex">
                                {Array.from({ length: props.fullStars }).map((_, i) => (
                                    <img
                                        key={`full-${i}`}
                                        src="/logos/fullstar.svg"
                                        alt="Full Star"
                                        className="star-icon"
                                    />
                                ))}
                                {Array.from({ length: props.emptyStars }).map((_, i) => (
                                    <img
                                        key={`empty-${i}`}
                                        src="/logos/emptystar.svg"
                                        alt="Empty Star"
                                        className="star-icon"
                                    />
                                ))}
                            </div>
                            {props.rating}
                        </div>
                        <p className="card-shipping-container">Free Shipping</p>
                    </div>
                    <div className="card-favorite-icon">
                        <img src="/logos/heart.svg" alt="Favorite Icon" />
                    </div>
                </div>
                <p className="card-description">{props.description.slice(0, 60)}...</p>
            </div>
        </Link>
    )
}