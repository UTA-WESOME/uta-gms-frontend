import { Show, useToast } from "@chakra-ui/react";
import PreferenceTabDesktop from "./PreferenceTabDesktop.jsx";

const PreferenceTab = ({ preferenceIntensities, setPreferenceIntensities, alternatives, criteria }) => {

    const toast = useToast();
    const toastId = "toast-project-preference-tab-add"

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

        // get min alternatives id
        let minAltId = Math.min(...alternatives.map(item => item.id));

        // set preference intensity
        setPreferenceIntensities(pPreferenceIntensities => [...pPreferenceIntensities, {
            id: maxId + 1,
            alternative_1: minAltId,
            alternative_2: minAltId,
            alternative_3: minAltId,
            alternative_4: minAltId,
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
                <PreferenceTabDesktop
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

            </Show>
        </>
    )

}

export default PreferenceTab;