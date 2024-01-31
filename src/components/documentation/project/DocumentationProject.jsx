import { Box, Divider, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DocumentationProject = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if(window.location.pathname === "/documentation/project")
            navigate("/documentation/project/overview");
    }, [])

    return (
        <Box>
            <Heading>Basketball dataset</Heading>
            <Divider my={2}/>
            <Outlet/>
        </Box>
    )
}

export default DocumentationProject;