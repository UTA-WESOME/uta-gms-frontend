import Function from "./Function.jsx";
import { Center, Divider, Heading, useMediaQuery, VStack } from "@chakra-ui/react";

const FunctionsTab = ({ criteria }) => {


    const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

    return (
        <>
            {!isLargerThan480 &&
                <>
                    <Center>
                        <Heading size={{ base: 'md', md: 'xl' }} mb={3}>
                            Criteria functions
                        </Heading>
                    </Center>
                    <Divider/>
                </>
            }
            <VStack
                mt={3}
                spacing={5}
            >
                <>
                    {criteria.map(c => (
                        <>
                            <Heading size={'lg'}>{c.name}</Heading>
                            <Function key={c.id} criterion={c}/>
                        </>
                    ))}
                </>
            </VStack>
        </>
    )

}

export default FunctionsTab;