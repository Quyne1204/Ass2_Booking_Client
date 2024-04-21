import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Booking from "./Booking";
import { UserContext } from "../../context/context";

const Hotel = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { user } = useContext(UserContext);


  const fetchData = useCallback(async () => {

    try {
      const response = await fetch(`http://localhost:5000/hotels/room/${id}`);
      const result = await response.json();
      setData(result);
      setPhotos(result.photos);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data.rooms);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleOpenForm = (i) => {
    setOpenForm(!openForm);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    let count = photos.length - 1;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? count : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === count ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleOpenForm}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">

              <h2>
                <b>${data.cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={handleOpenForm}>Reserve or Book Now!</button>
            </div>
          </div>
          {openForm && (
            user.auth ? <Booking idHotel={id} /> : <span className="checklogin">Bạn cần phải đăng nhập để đặt được phòng</span>
          )}
        </div>
        <MailList isMr={true} />
        <Footer />

      </div>
    </div>
  );
};

export default Hotel;
