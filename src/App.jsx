import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {useState} from "react";

const App = () => {

    const [isLoggedIn, setLoggedIn] = useState('');

    return (
        <>
            <Navbar/>
            <Outlet context={[isLoggedIn, setLoggedIn]}/>
        </>
    )
}

export default App
