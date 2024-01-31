import { Box, Divider, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ImportAndExport = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if(window.location.pathname === "/documentation/import-and-export")
            navigate("/documentation/import-and-export/csv");
    }, [])

    return (
        <Box>
            <Heading>Import and export</Heading>
            <Divider my={2}/>
            <Outlet/>
        </Box>
    )
}

export default ImportAndExport;