import { useContext, useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    const navigate = useNavigate();
    const [error, setError] = useState();

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

        fetch(`http://localhost:5000/auth/login`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.accessToken) {
                    let expires = new Date();
                    expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000)); // Thêm 1 ngày tính bằng mili giây
                    setCookie('token', result.accessToken, { path: '/', expires });
                    navigate('/');
                }
                setError(result);
            })
            .catch((error) => console.error(error));

    }
    return (
        <div>
            <Navbar />
            <div className="homeContainer">
                <div className="login">
                    <h1 className="title-login">Login</h1>
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
                        <button type="button" className="btn" onClick={() => HandelSubmit()}>Login</button>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    );
};

export default Login;
