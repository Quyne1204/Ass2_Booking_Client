import { useEffect } from "react";


const FeaturedPropertiesItem = (props) => {
    useEffect(() => {

    }, [props.items])

    return (
        <div className="fpItem">
            <img
                src={props.items.photos[0]}
                alt=""
                className="fpImg"
            />
            <span className="fpName"><a href={`/hotels/room/${props.items._id}`} >{props.items.name}</a></span>
            <span className="fpCity">{props.items.city}</span>
            <span className="fpPrice">Starting from ${props.items.cheapestPrice}</span>
            <div className="fpRating">
                <span>Rating: </span>
                <button style={{ padding: "3px 6px" }}>{props.items.rating}</button>
            </div>
        </div>
    );
};

export default FeaturedPropertiesItem;
