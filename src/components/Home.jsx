import Hero from "./home/Hero.jsx";
import Features from "./home/Features.jsx";
import Footer from "./Footer.jsx";
import {Stack} from "@chakra-ui/react";

export default function Home() {

    return (
        <>
            <Stack>
                <Hero/>
                <Features/>
                <Footer/>
            </Stack>
        </>
    );
}