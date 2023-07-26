import {useOutletContext} from "react-router-dom";
import {Container, Heading, Stack} from "@chakra-ui/react";

const Projects = () => {

    const [name, setName] = useOutletContext();

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
                    {
                        name ?
                            'Hi ' + name + '!'
                            :
                            'Log in first'
                    }
                </Heading>
            </Stack>
        </Container>
    )
}

export default Projects;