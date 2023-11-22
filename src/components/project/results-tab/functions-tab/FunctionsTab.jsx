import Function from "./Function.jsx";
import { Center, Divider, Heading, useMediaQuery, VStack } from "@chakra-ui/react";
import { Fragment } from "react";

const FunctionsTab = ({ criteria, functions }) => {


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
                    {criteria.filter(c => functions.map(point => point.criterion).includes(c.id)).map(c => (
                        <Fragment key={c.id}>
                            <Heading size={'lg'}>{c.name}</Heading>
                            <Function function_points={functions.filter(f => f.criterion === c.id)}/>
                        </Fragment>
                    ))}

                </>
            </VStack>
        </>
    )

}

export default FunctionsTab;