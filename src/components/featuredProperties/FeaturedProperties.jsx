import { useEffect, useState } from "react";
import "./featuredProperties.css";
import FeaturedPropertiesItem from "./FeaturedProperties-Item";

const FeaturedProperties = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/hotels/top3-rating`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

  }, []);
  return (
    <div className="fp">
      {data.map((i) => {
        return <FeaturedPropertiesItem items={i} key={i._id} />;
      })}
    </div>
  );
};

export default FeaturedProperties;
