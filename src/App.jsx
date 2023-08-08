import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {useCallback, useEffect, useState} from "react";

const App = () => {

    const [jwtToken, setJwtToken] = useState("");
    const [tickInterval, setTickInterval] = useState();

    const toggleRefresh = useCallback((status) => {
        if (status) {
            console.log("turning on ticking");
            let i = setInterval(() => {
                const requestOptions = {
                    method: "GET",
                    credentials: "include",
                }
                fetch(`/refresh`, requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if(data.access_token) {
                            setJwtToken(data.access_token);
                        }
                    })
                    .catch(error => {
                        console.log("user is not logged in");
                    })
            }, 600000);
            setTickInterval(i);
            console.log("setting tick interval to", i);
        } else {
            console.log("turning off ticking");
            console.log("turning off tickInterval", tickInterval);
            setTickInterval(null);
            clearInterval(tickInterval);
        }
    }, [tickInterval])


    useEffect(() => {
        if (jwtToken === "") {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            }

            fetch(`http://localhost:8080/api/refresh`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.access_token) {
                        setJwtToken(data.access_token);
                        toggleRefresh(true);
                    }
                })
                .catch(error => {
                    console.log("user is not logged in", error);
                })
        }
    }, [jwtToken, toggleRefresh])

    return (
        <>
            <Navbar jwtToken={jwtToken} setJwtToken={setJwtToken} toggleRefresh={toggleRefresh}/>
            <Outlet context={{
                jwtToken, setJwtToken,
                toggleRefresh
            }}/>
        </>
    )
}

export default App;
