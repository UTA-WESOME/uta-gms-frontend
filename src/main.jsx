import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Home from "./components/Home.jsx";
import Jobs from "./components/Jobs.jsx";
import SignIn from "./components/login/SignIn.jsx";
import SignUp from "./components/login/SignUp.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Project from "./components/Project.jsx";
import Projects from "./components/Projects.jsx";
import EditProject from "./components/projects/EditProject.jsx";
import NewProject from "./components/projects/NewProject.jsx";
import './scrollbar.css';
import theme from "./theme.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { index: true, element: <Home/> },
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
            },
            {
                path: "/jobs",
                element: <Jobs/>
            },
            {
                path: "*",
                element: <PageNotFound/>
            }
        ]
    }
])

document.title = import.meta.env.MODE === 'development' ? 'UTA-GMS-DEV' : 'UTA-GMS';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <RouterProvider router={router}/>
        </ChakraProvider>
    </React.StrictMode>,
)
