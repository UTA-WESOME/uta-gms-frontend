import { Heading, Link, Text, useColorModeValue, VStack, } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";
import PageTemplate from "./utils/PageTemplate.jsx";

const PageNotFound = () => {
    const [headingOffset, setHeadingOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = (e.clientX - centerX) / 100;
            const offsetY = (e.clientY - centerY) / 100;

            setHeadingOffset({ x: offsetX, y: offsetY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <PageTemplate title='Page not found'>
                <VStack
                    justify={'center'}
                    spacing={'1rem'}>
                    <Heading
                        fontSize={{ base: '100px', sm: '150px', md: '200px' }}
                        color={useColorModeValue('teal.500', 'teal.200')}
                        transform={`translate(${headingOffset.x}px, ${headingOffset.y}px)`}
                        paddingTop={'10px'}
                        paddingBottom={'60px'}
                        userSelect="none">
                        404
                    </Heading>
                    <Text fontSize={{ base: '16px', sm: '24px', md: '32px' }} textAlign="center">
                        Sorry, we couldn't find the page you were looking for. <br/> Please go to the{' '}
                        <Link color={useColorModeValue('teal.500', 'teal.200')} href='/'>
                            main page.
                        </Link>
                    </Text>
                </VStack>
            </PageTemplate>
        </>
    );
}
export default PageNotFound;
