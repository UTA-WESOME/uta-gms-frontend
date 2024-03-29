import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "./components/utils/useLocalStorage.jsx";

const App = () => {

    const navigate = useNavigate();
    const [getAuth, setAuth, _] = useLocalStorage('auth');
    const [tickInterval, setTickInterval] = useState();

    const toggleRefresh = useCallback((status) => {
        if (status) {
            clearInterval(tickInterval);
            let i = setInterval(() => {
                fetch(`${import.meta.env.VITE_BACKEND}/api/refresh`, {
                    method: "GET",
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.message === "authenticated") {
                            setAuth(true);
                        }
                    })
                    .catch(_ => {
                        console.log("user is not logged in");
                    })
            }, 600000);
            setTickInterval(i);
        } else {
            setTickInterval(null);
            clearInterval(tickInterval);
        }
    }, [tickInterval])


    useEffect(() => {
        const requestOptions = {
            method: "GET",
            credentials: "include",
        }

        fetch(`${import.meta.env.VITE_BACKEND}/api/refresh`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("user not logged in");
                }
                return response.json()
            })
            .then((data) => {
                if (data.message === "authenticated") {
                    setAuth(true);
                    toggleRefresh(true);
                }
            })
            .catch(error => {
                if (getAuth() === true) {
                    // this means that the user was logged in - in the past
                    // but the refresh token expired
                    setAuth(false);
                    navigate(0);
                }
                console.log(error);
            })
    }, [])

    return (
        <>
            <Navbar toggleRefresh={toggleRefresh}/>
            <Outlet context={{ toggleRefresh }}/>
        </>
    )
}

export default App;
