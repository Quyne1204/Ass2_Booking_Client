
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();
    const HandelSubmit = (e) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": username,
            "password": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`http://localhost:5000/auth/register`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setError(result);
                if (result.status === 200) {
                    navigate('/login');
                }
            })
            .catch((error) => console.error(error));

    }
    return (
        <div>
            <Navbar />
            <div className="homeContainer">
                <div className="login">
                    <h1 className="title-login">Register</h1>
                    <div className="form-control1">
                        <label htmlFor="">User Name</label>
                        <input type="text" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="form-control1">
                        <label htmlFor="">Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-control1">
                        {error && <p className="error">{error.message}</p>}
                    </div>

                    <div className="btn-control">
                        <button type="button" className="btn" onClick={() => HandelSubmit()}>Create Account</button>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    );
};

export default Register;
