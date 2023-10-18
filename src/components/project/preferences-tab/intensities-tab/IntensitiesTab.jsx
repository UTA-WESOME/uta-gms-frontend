import { Show, useToast } from "@chakra-ui/react";
import IntensitiesTabDesktop from "./IntensitiesTabDesktop.jsx";
import IntensitiesTabMobile from "./IntensitiesTabMobile.jsx";

const IntensitiesTab = ({ preferenceIntensities, setPreferenceIntensities, alternatives, criteria }) => {

    const toast = useToast();
    const toastId = "toast-project-preference-tab-add";

    const addPreferenceIntensity = () => {

        if (alternatives.length === 0) {
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: 'Warning!',
                    description: "You need to add alternatives first.",
                    status: 'warning',
                    duration: 6000,
                    isClosable: true,
                })
            }
            return;
        }

        // get max preference intensity id
        let maxId = Math.max(...preferenceIntensities.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        // get first alternative
        // we can be sure that there is at least one alternative because of the if statement
        // at the beginning of the function
        let firstAltId = alternatives[0].id

        // set preference intensity
        setPreferenceIntensities(pPreferenceIntensities => [...pPreferenceIntensities, {
            id: maxId + 1,
            alternative_1: firstAltId,
            alternative_2: firstAltId,
            alternative_3: firstAltId,
            alternative_4: firstAltId,
            criterion: null
        }])
    }

    const deletePreferenceIntensity = (id) => {
        setPreferenceIntensities(pPreferenceIntensities => pPreferenceIntensities.filter(item => item.id !== id));
    }

    return (
        <>
            {/*DESKTOP*/}
            <Show above={'lg'}>
                <IntensitiesTabDesktop
                    alternatives={alternatives}
                    criteria={criteria}
                    preferenceIntensities={preferenceIntensities}
                    setPreferenceIntensities={setPreferenceIntensities}
                    addPreferenceIntensity={addPreferenceIntensity}
                    deletePreferenceIntensity={deletePreferenceIntensity}
                />
            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>
                <IntensitiesTabMobile
                    alternatives={alternatives}
                    criteria={criteria}
                    preferenceIntensities={preferenceIntensities}
                    setPreferenceIntensities={setPreferenceIntensities}
                    addPreferenceIntensity={addPreferenceIntensity}
                    deletePreferenceIntensity={deletePreferenceIntensity}
                />
            </Show>
        </>
    )

}

export default IntensitiesTab;