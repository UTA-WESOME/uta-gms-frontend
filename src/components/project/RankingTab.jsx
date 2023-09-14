import { Box, Button, ButtonGroup, Flex, Heading, Show, Spacer } from "@chakra-ui/react";
import Rank from "./drag-and-drop/Rank.jsx";
import Alternative from "./drag-and-drop/Alternative.jsx";
import { useState } from "react";

const RankingTab = ({ alternatives, setAlternatives }) => {

    const [ranks, setRanks] = useState(() => {
        const ranksInAlternatives = alternatives
            .map(alternative => alternative.reference_ranking)
            .filter(value => value !== 0)
            .sort()

        let minRank = Math.min(...ranksInAlternatives)
        let maxRank = Math.max(...ranksInAlternatives)
        return Array.from({ length: maxRank - minRank + 1 }, (_, index) => minRank + index);

    });

    const handleNewRank = () => {
        // get max rank
        let maxRank = Math.max(...ranks);
        maxRank = maxRank === -Infinity ? 0 : maxRank;

        setRanks(pRanks => [...pRanks, maxRank + 1])
    }

    const handleReset = () => {
        setAlternatives(pAlternatives =>
            pAlternatives.map(pAlternative => ({
                ...pAlternative,
                reference_ranking: 0,
            })))
    }


    return (
        <>

            {/*DESKTOP*/}
            <Show above={'lg'}>
                <Flex
                    justify={'center'}
                    mx={'10%'}
                >
                    {/*ALTERNATIVES BOX*/}
                    <Box
                        w={'full'}
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        p={3}
                        m={5}
                    >
                        <Heading
                            fontWeight={400}
                            fontSize={'3xl'}
                            textAlign={'center'}
                        >
                            Alternatives
                        </Heading>
                        {alternatives.filter(alt => alt.reference_ranking === 0).map(alternative => (
                            <Alternative id={alternative.id} name={alternative.name}/>
                        ))}
                    </Box>

                    <Spacer/>

                    {/*RANKS BOX*/}
                    <Box
                        w={'full'}
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        p={3}
                        m={5}
                    >
                        <Heading fontWeight={400} fontSize={'3xl'} textAlign={'center'}>
                            Ranks
                        </Heading>
                        {ranks.map(rank => (
                            <Rank id={rank} ranks={ranks} setRanks={setRanks}>
                                {alternatives
                                    .filter(alt => alt.reference_ranking === rank)
                                    .map(alternative => (
                                        <Alternative id={alternative.id} name={alternative.name}/>
                                    ))}
                            </Rank>
                        ))}

                        <ButtonGroup pt={"1rem"}>
                            <Button
                                colorScheme={"teal"}
                                variant='outline'
                                ml={5}
                                mt={2}
                                onClick={handleNewRank}
                            >New rank</Button>
                            <Button
                                colorScheme={'red'}
                                variant='outline'
                                ml={5}
                                mt={2}
                                onClick={handleReset}
                            >Reset</Button>
                        </ButtonGroup>
                    </Box>
                </Flex>
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 991px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'991px'}>

            </Show>

        </>
    )
}

export default RankingTab;