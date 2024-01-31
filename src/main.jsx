import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Documentation from "./components/Documentation.jsx";
import Dashboard from "./components/documentation/project/Dashboard.jsx";
import DocumentationAlternatives from "./components/documentation/project/DocumentationAlternatives.jsx";
import DocumentationCriteria from "./components/documentation/project/DocumentationCriteria.jsx";
import DocumentationProject from "./components/documentation/project/DocumentationProject.jsx";
import Overview from "./components/documentation/project/Overview.jsx";
import Start from "./components/documentation/start/Start.jsx";
import UtaGms from "./components/documentation/uta-gms/UtaGms.jsx";
import ImportAndExport from "./components/documentation/import-and-export/ImportAndExport.jsx";
import CSV from "./components/documentation/import-and-export/CSV.jsx";
import XMCDA from "./components/documentation/import-and-export/XMCDA.jsx";
import Import from "./components/documentation/import-and-export/Import.jsx";
import Export from "./components/documentation/import-and-export/Export.jsx";
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
                        element: <Start/>,
                        displayName: "Start",
                        fullUrl: "/documentation/start"
                    },
                    {
                        path: "uta-gms",
                        element: <UtaGms/>,
                        displayName: "UTA-GMS",
                        fullUrl: "/documentation/uta-gms"
                    },
                    {
                        path: "project",
                        element: <DocumentationProject/>,
                        displayName: "Project",
                        fullUrl: "/documentation/project/overview",
                        children: [
                            {
                                path: "overview",
                                element: <Overview/>,
                                displayName: "Overview",
                                fullUrl: "/documentation/project/overview"
                            },
                            {
                                path: "dashboard",
                                element: <Dashboard/>,
                                displayName: "Dashboard",
                                fullUrl: "/documentation/project/dashboard"
                            },
                            {
                                path: "criteria",
                                element: <DocumentationCriteria/>,
                                displayName: "Criteria",
                                fullUrl: "/documentation/project/criteria"
                            },
                            {
                                path: "alternatives",
                                element: <DocumentationAlternatives/>,
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
                        path: "import-and-export",
                        element: <ImportAndExport/>,
                        displayName: "Import and export",
                        fullUrl: "/documentation/import-and-export/csv",
                        children: [
                            {
                                path: "csv",
                                element: <CSV/>,
                                displayName: "CSV",
                                fullUrl: "/documentation/import-and-export/csv"
                            },
                            {
                                path: "xmcda",
                                element: <XMCDA/>,
                                displayName: "XMCDA",
                                fullUrl: "/documentation/import-and-export/xmcda"
                            },
                            {
                                path: "import",
                                element: <Import/>,
                                displayName: "Import",
                                fullUrl: "/documentation/import-and-export/import"
                            },
                            {
                                path: "export",
                                element: <Export/>,
                                displayName: "Export",
                                fullUrl: "/documentation/import-and-export/export"
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
