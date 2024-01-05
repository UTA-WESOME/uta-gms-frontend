import { Box, Flex } from "@chakra-ui/react";
import Features from "./home/Features.jsx";
import Footer from "./home/Footer.jsx";
import Hero from "./home/Hero.jsx";

const Home = () => {

    return (
        <Flex minH={'100vh'} direction={'column'}>
            <Box flex={1}>
                <Hero/>
                <Features/>
            </Box>
            <Footer/>
        </Flex>
    );
}


export default Home;