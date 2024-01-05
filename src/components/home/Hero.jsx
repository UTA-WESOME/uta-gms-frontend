import { Button, Container, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

export default function Hero() {

    const navigate = useNavigate();

    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 15, md: 20 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Decision making {' '}
                    <Text as={'span'} color={useColorModeValue('teal.500', 'teal.200')}>
                        made easy
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'} fontSize={{ base: 'sm', sm: 'lg' }}>
                    Elevate your decision-making with the UTA-GMS, a groundbreaking solution
                    that fuses the power of the UTA method with advanced robustness analysis.
                    Choose the UTA-GMS for a future-ready approach to Multiple Criteria Decision Analysis,
                    where making complex decisions becomes both confident and effortless.
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
    )
        ;
}