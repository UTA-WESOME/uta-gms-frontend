import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {useEffect, useState} from "react";

const App = () => {

    const [jwtToken, setJwtToken] = useState("");

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
                    }
                })
                .catch(error => {
                    console.log("user is not logged in", error);
                })
        }
    }, [jwtToken])

    return (
        <>
            <Navbar jwtToken={jwtToken} setJwtToken={setJwtToken}/>
            <Outlet context={{
                jwtToken, setJwtToken
            }}/>
        </>
    )
}

export default App;
