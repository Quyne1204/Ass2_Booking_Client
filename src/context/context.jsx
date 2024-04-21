import { createContext, useState } from "react";
import { useCookies } from 'react-cookie';

const UserContext = createContext({
    info: [],
    isAdmin: false,
    auth: false
});

const UserProvider = ({ children }) => {

    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({
        info: [],
        isAdmin: false,
        auth: false
    });

    // Login updates the user data with a name parameter
    const login = (user) => {
        setUser((item) => ({
            info: user,
            isAdmin: user.isAdmin,
            auth: true
        }));
    };

    // Logout updates the user data to default
    const logout = () => {
        //xoa token
        let expires = new Date();
        expires.setTime(expires.getTime() -1 ); // Thêm 1 ngày tính bằng mili giây
        setCookie('token', '', { path: '/', expires });
        setUser({
            info: [],
            isAdmin: false,
            auth: false
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };