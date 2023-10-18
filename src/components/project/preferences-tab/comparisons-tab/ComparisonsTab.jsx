import { useState } from "react";
import { HStack, Switch, Text, VStack } from "@chakra-ui/react";
import RankingTab from "./ranking-tab/RankingTab.jsx";

const ComparisonsTab = ({ alternatives, setAlternatives }) => {

    const [isPairwise, setIsPairwise] = useState(false);

    return (
        <>
            <VStack>
                <HStack>
                    <Text color={isPairwise ? 'gray' : 'teal.300'} fontSize={'lg'}>Reference ranking</Text>
                    <Switch
                        colorschemechecked={'teal'}
                        colorschemeunchecked={'teal'}
                        onChange={() => {
                            setIsPairwise(!isPairwise);
                        }}
                    />
                    <Text color={isPairwise ? 'teal.300' : 'gray'} fontSize={'lg'}>Pairwise</Text>
                </HStack>
            </VStack>

            {!isPairwise ?
                <RankingTab
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                />
                :
                <Text>Pairwise comparisons!</Text>

            }

        </>

    )

}

export default ComparisonsTab;