import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/home/Login";
import Register from "./pages/home/Register";
import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./context/context";
import { useCookies } from "react-cookie";
import Transaction from "./pages/home/Transaction";

function App() {
  const { user, login } = useContext(UserContext);
  const [cookies] = useCookies(['token']);

  const handleLogin = useCallback(() => {
    const myHeaders = new Headers();
    myHeaders.append("cookies", cookies.token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:5000/auth/checklogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        login(result);
      })
      .catch((error) => console.error(error));
  }, [cookies.token]);

  useEffect(() => {
    if (cookies.token) {
      handleLogin();
    }
  }, [cookies.token, handleLogin]);
  // console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotels/search" element={<List />} />
        <Route path="/hotels/room/:id" element={<Hotel />} />
        <Route path="/auth/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
