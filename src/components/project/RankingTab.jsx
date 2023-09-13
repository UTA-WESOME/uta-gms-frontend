import { Box, HStack, Show, Spacer, Text } from "@chakra-ui/react";
import Rank from "./drag-and-drop/Rank.jsx";
import Alternative from "./drag-and-drop/Alternative.jsx";
import { useState } from "react";

const RankingTab = ({ alternatives, setAlternatives }) => {

    const [ranks, setRanks] = useState([1, 2, 3]);


    return (
        <>

            {/*DESKTOP*/}
            <Show above={'lg'}>
                <HStack
                    justify={'center'}
                    mx={'10%'}
                >
                    <Box
                        w={'full'}
                        h={'full'}
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        p={5}
                    >
                        {alternatives.filter(alt => alt.reference_ranking === 0).map(alternative => (
                            <Alternative id={alternative.id} name={alternative.name}/>
                        ))}
                    </Box>

                    <Spacer/>

                    <Box
                        w={'full'}
                        h={'full'}
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        p={5}
                    >
                        {ranks.map(rank => (
                            <Rank key={rank} id={rank}>
                                {alternatives
                                    .filter(alt => alt.reference_ranking === rank)
                                    .map(alternative => (
                                    <Alternative id={alternative.id} name={alternative.name}/>
                                ))}
                            </Rank>
                        ))}
                    </Box>
                </HStack>
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 991px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'991px'}>

            </Show>

        </>
    )
}

export default RankingTab;