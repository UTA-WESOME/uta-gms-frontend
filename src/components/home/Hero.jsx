import {
    Container,
    Heading,
    Stack,
    Text,
    Button,
} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";

export default function Hero() {

    const navigate = useNavigate();

    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{base: 8, md: 10}}
                py={{base: 15, md: 20}}>
                <Heading
                    fontWeight={600}
                    fontSize={{base: '3xl', sm: '4xl', md: '6xl'}}
                    lineHeight={'110%'}>
                    Decision making {' '}
                    <Text as={'span'} color={'teal.200'}>
                        made easy
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'} fontSize={{base: 'sm', sm: 'lg'}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque rerum! Provident similique accusantium nemo autem.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <Button
                        rounded={'full'}
                        px={6}
                        colorScheme={'teal'}
                        onClick={() => navigate("/signup")}
                    >
                        Get started
                    </Button>
                    <Button rounded={'full'} px={6}>
                        Learn more
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}