import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container, Heading, Spinner, Stack} from "@chakra-ui/react";

const Projects = () => {

    const [name, setName] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useOutletContext();

    useEffect(() => {
        fetch(`http://localhost:8080/api/user`, {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setLoading(false);
            })
    })

    return (
        <>
            {isLoading ?
                <Container maxW={'5xl'} align={'center'} py={40}>
                    <Spinner size='xl' colorScheme={"teal"}/>
                </Container>
                :
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
                            {
                                name ?
                                    'Hi ' + name + '!'
                                    :
                                    'Log in first'
                            }
                        </Heading>
                    </Stack>
                </Container>
            }
        </>
    )
}

export default Projects;