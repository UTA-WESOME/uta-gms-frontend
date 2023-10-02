import { Show } from "@chakra-ui/react";
import PreferenceTabDesktop from "./PreferenceTabDesktop.jsx";

const PreferenceTab = ({preferenceIntensities, setPreferenceIntensities, alternatives, criteria}) => {

    return (
        <>
            {/*DESKTOP*/}
            <Show above={'lg'}>
                {JSON.stringify(preferenceIntensities)}
                <PreferenceTabDesktop
                    alternatives={alternatives}
                    criteria={criteria}
                    preferenceIntensities={preferenceIntensities}
                    setPreferenceIntensities={setPreferenceIntensities}
                />
            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>

            </Show>
        </>
    )

}

export default PreferenceTab;