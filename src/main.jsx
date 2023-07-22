import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from "./theme.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
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
