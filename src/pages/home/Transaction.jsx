import { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./transaction.css";
import { UserContext } from "../../context/context";
import { useCallback } from "react";
import { format } from "date-fns";

const Transaction = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState();


    const HandelTransaction = useCallback(() => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", user.info._id);
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`http://localhost:5000/transactions/getByUser`, requestOptions)
            .then((response) => response.json())
            .then((result) => setData(result))
            .catch((error) => console.error(error));
    }, [user])

    useEffect(() => {
        if (user && user.info && user.info._id) {
            HandelTransaction();
        }
    }, [user, HandelTransaction]);

    return (
        <div>
            <Navbar />
            <div className="homeContainer">
                <div className="tranList">
                    <h2>Your Transaction</h2>
                    <table>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Hotel</td>
                                <td>Room</td>
                                <td>Date</td>
                                <td>Price</td>
                                <td>Payment Method</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item,i) => (
                                <tr key={item._id}>
                                    <td>{i + 1}</td>
                                    <td>{item.hotel}</td>
                                    <td>{item.rooms.join(", ")}</td>
                                    <td>{`${format(new Date(item.dateStart), "MM/dd/yyyy")} - ${format(new Date(item.dateEnd), "MM/dd/yyyy")}`}</td>
                                    <td>{`$ ${item.price}`}</td>
                                    <td>{item.payment}</td>
                                    <td>
                                        <span className="booked">{item.status}</span>
                                    </td>
                                </tr>
                            ))}
                            {!data && <tr>There is no data</tr>}
                        </tbody>
                    </table>
                </div>

                <Footer />
            </div>

        </div>
    );
};

export default Transaction;
