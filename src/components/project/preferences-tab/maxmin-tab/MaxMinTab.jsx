import MaxMinTabDesktop from "./MaxMinTabDesktop.jsx";
import { Show } from "@chakra-ui/react";
import MaxMinTabMobile from "./MaxMinTabMobile.jsx";

const MaxMinTab = ({ alternatives, setAlternatives }) => {


    return (
        <>
            <Show above={'lg'}>
                <MaxMinTabDesktop
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                />
            </Show>

            <Show below={'991px'}>
                <MaxMinTabMobile
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                />
            </Show>

        </>
    )
}

export default MaxMinTab;