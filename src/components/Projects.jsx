import {useNavigate, useOutletContext} from "react-router-dom";
import {Container, Heading, Stack} from "@chakra-ui/react";
import {useEffect} from "react";

const Projects = () => {

    const navigate = useNavigate();
    const {jwtToken} = useOutletContext();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/");
        }
    }, [jwtToken]);


    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{base: 8, md: 10}}
                py={{base: 15, md: 20}}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{base: '3xl', sm: '4xl', md: '6xl'}}
                    lineHeight={'110%'}>
                    Your projects
                </Heading>
            </Stack>
        </Container>
    )
}

export default Projects;