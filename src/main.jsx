import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from "./theme.js";
import Home from "./components/Home.jsx";
import SignUp from "./components/login/SignUp.jsx";
import SignIn from "./components/login/SignIn.jsx";
import Projects from "./components/Projects.jsx";
import NewProject from "./components/projects/NewProject.jsx";
import EditProject from "./components/projects/EditProject.jsx";
import Project from "./components/Project.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {index: true, element: <Home/>},
            {
                path: "/signin",
                element: <SignIn/>
            },
            {
                path: "/signup",
                element: <SignUp/>
            },
            {
                path: "/projects",
                element: <Projects/>
            },
            {
                path: "/projects/new",
                element: <NewProject/>
            },
            {
                path: "/projects/:id/edit",
                element: <EditProject/>
            },
            {
                path: "/projects/:id",
                element: <Project/>
            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <RouterProvider router={router}/>
        </ChakraProvider>
    </React.StrictMode>,
)
