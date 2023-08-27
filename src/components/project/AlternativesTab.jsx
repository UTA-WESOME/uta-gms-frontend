import { Text } from "@chakra-ui/react";

const AlternativesTab = ({alternatives, setAlternatives}) => {

    return (
            <>
            {JSON.stringify(alternatives, null, 4)}
            </>

    )
}

export default AlternativesTab;