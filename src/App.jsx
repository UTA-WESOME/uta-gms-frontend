import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import {useEffect, useState} from "react";

const App = () => {

    const [isResponse, setIsResponse] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        fetch(`http://localhost:8080/api/user`, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setIsResponse(true);
                setName(data.name);
            })
    }, [name])

    return (
        <>
            {
                isResponse &&
                <>
                    <Navbar name={name} setName={setName}/>
                    <Outlet context={[name, setName]}/>
                </>
            }
        </>
    )
}

export default App;
