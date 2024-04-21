import { useCallback, useContext, useEffect, useState } from "react";
import { DateRange } from 'react-date-range';
import { UserContext } from "../../context/context";


function Booking({ idHotel }) {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [date, setDate] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" },]);
    const [totalBill, setTotalBill] = useState(0);
    const [checkboxValues, setCheckboxValues] = useState({});
    const [rooms, setRooms] = useState([]);
    const [roomIds, setRoomIds] = useState([]);
    const [fullname, setFullname] = useState(user.info.fullName ? user.info.fullName : '');
    const [email, setEmail] = useState(user.info.email ? user.info.email : '');
    const [phone, setPhone] = useState(user.info.phoneNumber ? user.info.phoneNumber : '');
    const [cardnumber, setCardnumber] = useState(user.info.cardNumber ? user.info.cardNumber : '');
    const [paymentMethod, setPaymentMethod] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [openBtn, setOpenBtn] = useState(true);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevCheckboxValues) => ({
            ...prevCheckboxValues,
            [name]: checked
        }));

    };
    const handleGetRoomIds = () => {
        let roomIds = [];

        data.forEach((item) => {
            const roomIdsForItem = item.roomNumbers
                .filter((roomnumber) => rooms.includes(roomnumber))
                .map(() => item._id);

            roomIds = roomIds.concat(roomIdsForItem);
        });
        const uniqueRoomIds = roomIds.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        setRoomIds(uniqueRoomIds);
    }

    const handleGetValues = () => {
        const room = Object.entries(checkboxValues)
            .filter(([name, checked]) => checked)
            .map(([name, { checked }]) => Number(name));
        setRooms(room);

        let total = 0;
        data.forEach((item) => {
            if (item.roomNumbers.some(roomNumber => room.includes(roomNumber))) {
                const roomPrice = item.price;
                const numberOfRooms = room.filter((room) => item.roomNumbers.includes(room)).length;
                const numberOfDays = (date[0].endDate - date[0].startDate) / (1000 * 3600 * 24);
                total += roomPrice * numberOfRooms * (numberOfDays + 1);
            }
        });

        setTotalBill(total);
    };

    const handelCheckRoom = useCallback(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", user.info._id);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "startDate": date[0].startDate,
            "endDate": date[0].endDate,
            "id": idHotel
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        fetch("http://localhost:5000/hotels/room-hotels", requestOptions)
            .then((response) => response.json())
            .then((result) =>
                setData(result)
            )
            .catch((error) => console.error(error));
    }, [date]);

    useEffect(() => {
        handelCheckRoom();
    }, [date,handelCheckRoom]);
    useEffect(() => {
        handleGetValues();
    }, [checkboxValues]);
    useEffect(() => {
        handleGetRoomIds();
    }, [rooms]);

    const handelBooking = () => {
        if (fullname && email && phone && cardnumber && paymentMethod) {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", user.info._id);
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "user": {
                    username: user.info.username,
                    _id: user.info._id
                },
                "id_hotel": idHotel,
                "rooms": rooms,
                "roomIds": roomIds,
                "dateStart": date[0].startDate,
                "dateEnd": date[0].endDate,
                "price": Number(totalBill),
                "payment": paymentMethod,
                "fullname": fullname,
                "email": email,
                "phone": phone,
                "cardnumber": Number(cardnumber)
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("http://localhost:5000/transactions/postBooking", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setSuccess(result);
                    setError("");
                    setOpenBtn(false);
                })
                .catch((error) => console.error(error));
        } else {
            setSuccess("");
            setOpenBtn(true);
            setError("Ban hay dien day du thong tin");
        }
    }

    return (
        <div className="booking">
            <div className="form-control">
                <div className="datebooking">
                    <p className="title-form">Dates</p>
                    <div className="">
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className=""
                            minDate={new Date()}
                        />
                    </div>
                </div>
                <div className="form">
                    <p className="title-form">Reserve Info</p>
                    <div className="form-input">
                        <label htmlFor="">Your Full Name:</label>
                        <input type="text" defaultValue={user.info.fullName ? user.info.fullName : ''} onChange={e => setFullname(e.target.value)} />
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Your Email:</label>
                        <input type="email" defaultValue={user.info.email ? user.info.email : ''} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Your Phone Number:</label>
                        <input type="number" defaultValue={user.info.phoneNumber ? user.info.phoneNumber : ''} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="form-input">
                        <label htmlFor="">Your Identity Card Number:</label>
                        <input type="number" defaultValue={user.info.cardNumber ? user.info.cardNumber : ''} onChange={e => setCardnumber(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="rooms">
                <p className="title-form">Select Rooms</p>
                <div className="box-rooms">
                    {data.map((item) => {
                        return <div className="room-item" key={item._id}>
                            <div className="room-child" >
                                <p style={{ fontSize: "20px", fontWeight: "500" }}>{item.title}</p>
                                <p>{item.desc}</p>
                                <p style={{ fontSize: "13px" }}>Max people: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{item.maxPeople}</span></p>
                                <p style={{ fontSize: "20px", fontWeight: "600" }}>${item.price}</p>
                            </div>
                            <div className="checkbox">
                                {item.roomNumbers.map((i) => {
                                    return <div className="column" key={i}>
                                        <label htmlFor="">{i}</label>
                                        <input type="checkbox"
                                            id={item._id}
                                            name={i}
                                            checked={checkboxValues[i] || false}
                                            onChange={handleCheckboxChange}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                    })}

                </div>
                <div className="">
                    <p className="title-form">Total Bill: <span>${totalBill}</span></p>
                    {success && <p className="error">{success.message}</p>}
                    {error && <p className="error">{error}</p>}
                    <div className="checkpay">
                        <select name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Cash">Cash</option>
                        </select>
                        {openBtn && <button className="" onClick={handelBooking}>Reserve Now</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
