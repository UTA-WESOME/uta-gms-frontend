import BestWorstTabDesktop from "./BestWorstTabDesktop.jsx";
import { Show } from "@chakra-ui/react";
import BestWorstTabMobile from "./BestWorstTabMobile.jsx";

const BestWorstTab = ({ alternatives, setAlternatives }) => {


    return (
        <>
            <Show above={'lg'}>
                <BestWorstTabDesktop
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                />
            </Show>

            <Show below={'991px'}>
                <BestWorstTabMobile
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                />
            </Show>

        </>
    )
}

export default BestWorstTab;