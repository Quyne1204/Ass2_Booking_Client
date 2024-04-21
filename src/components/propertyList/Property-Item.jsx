import { useEffect, useState } from "react";

const PropertyItem = (props) => {
    const [data, setData] = useState('');
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:5000/hotels/category?type=${props.query}`);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();

    }, [props.query]);

    return (
        <div className="pListTitles">
          <h1>{props.query}</h1>
          <h2>{data.item} hotels</h2>
        </div>
    );
};

export default PropertyItem;
