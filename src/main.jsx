import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Documentation from "./components/Documentation.jsx";
import Home from "./components/Home.jsx";
import SignIn from "./components/login/SignIn.jsx";
import SignUp from "./components/login/SignUp.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Project from "./components/Project.jsx";
import Projects from "./components/Projects.jsx";
import EditProject from "./components/projects/EditProject.jsx";
import NewProject from "./components/projects/NewProject.jsx";
import { Criteria } from "./config.js";
import './scrollbar.css';
import theme from "./theme.js";

export const routes = [
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
                path: "/documentation",
                element: <Documentation/>,
                children: [
                    {
                        path: "start",
                        element: <Box/>,
                        displayName: "Start",
                        fullUrl: "/documentation/start"
                    },
                    {
                        path: "uta-gms",
                        element: <Box/>,
                        displayName: "UTA-GMS",
                        fullUrl: "/documentation/uta-gms"
                    },
                    {
                        path: "project",
                        element: <Box/>,
                        displayName: "Project",
                        fullUrl: "/documentation/project",
                        children: [
                            {
                                path: "criteria",
                                element: <Box/>,
                                displayName: "Criteria",
                                fullUrl: "/documentation/project/criteria"
                            },
                            {
                                path: "alternatives",
                                element: <Box/>,
                                displayName: "Alternatives",
                                fullUrl: "/documentation/project/alternatives"
                            },
                            {
                                path: "categories",
                                element: <Box/>,
                                displayName: "Categories",
                                fullUrl: "/documentation/project/categories"
                            },
                            {
                                path: "preferences",
                                element: <Box/>,
                                displayName: "Preferences",
                                fullUrl: "/documentation/project/preferences"
                            },
                            {
                                path: "results",
                                element: <Box/>,
                                displayName: "Results",
                                fullUrl: "/documentation/project/results"
                            }
                        ],
                    },
                    {
                        path: "contact",
                        element: <Box/>,
                        displayName: "Contact",
                        fullUrl: "/documentation/contact"
                    }
                ],
            },
            {
                path: "*",
                element: <PageNotFound/>
            }
        ]
    }
]

const router = createBrowserRouter(routes)

document.title = import.meta.env.MODE === 'development' ? 'UTA-GMS-DEV' : 'UTA-GMS';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <RouterProvider router={router}/>
        </ChakraProvider>
    </React.StrictMode>,
)
