import { Center, Flex, Heading, } from '@chakra-ui/react';


const PageTemplate = (props) => {
    return (
        <Center>
            <Flex
                direction={'column'}
                w={{ base: '80%', sm: '90%', md: '90%', lg: '90%', xl: '85%', '2xl': '75%' }}
                marginBottom={'10'}
                justify={'center'}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                    lineHeight={'90%'}
                    textAlign={'center'}
                    py={{ base: 10, md: 10 }}>
                    {props.title}
                </Heading>
                {props.children}
            </Flex>
        </Center>
    );
};
export default PageTemplate;