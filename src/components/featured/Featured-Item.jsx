import { useEffect, useState } from "react";
import "./featured.css";

const FeaturedItem = (props) => {
    const [data, setData] = useState('');
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:5000/hotels/city?city=${props.query}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

    }, [props.query]);

    return (
        <div className="featuredTitles">
            <h1>{props.query}</h1>
            <h2>{data.item} properties</h2>
        </div>
    );
};

export default FeaturedItem;
