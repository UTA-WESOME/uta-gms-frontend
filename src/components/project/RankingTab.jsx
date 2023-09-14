import { Box, Button, ButtonGroup, Flex, Heading, Show, Spacer } from "@chakra-ui/react";
import Rank from "./drag-and-drop/Rank.jsx";
import Alternative from "./drag-and-drop/Alternative.jsx";
import { useState } from "react";
import RankMobile from "./ranking-mobile/RankMobile.jsx";
import { DndContext } from "@dnd-kit/core";
import AlternativeMobile from "./ranking-mobile/AlternativeMobile.jsx";

const RankingTab = ({ alternatives, setAlternatives }) => {

    const [ranks, setRanks] = useState(() => {
        const ranksInAlternatives = alternatives
            .map(alternative => alternative.reference_ranking)
            .filter(value => value !== 0)
            .sort()

        let maxRank = Math.max(...ranksInAlternatives)
        return Array.from({ length: maxRank }, (_, index) => 1 + index);

    });

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setAlternatives(pAlternatives => {
            return pAlternatives.map(pAlternative => {
                if (pAlternative.id.toString() === active.id) {
                    return {
                        ...pAlternative,
                        reference_ranking: over ? parseInt(over.id) : 0
                    };
                }
                return pAlternative;
            })
        })
    }

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
            <Show above={'1000px'}>

                <DndContext onDragEnd={handleDragEnd}>
                    <Flex justify={'center'} mx={{ base: '5%', xl: '8%' }}>
                        {/*ALTERNATIVES BOX*/}
                        <Box w={'full'} borderWidth={'1px'} borderRadius={'lg'} p={3} m={5}>
                            <Heading fontWeight={400} fontSize={'3xl'} textAlign={'center'}>
                                Alternatives
                            </Heading>
                            {alternatives.filter(alt => alt.reference_ranking === 0).map(alternative => (
                                <Alternative id={alternative.id} name={alternative.name}/>
                            ))}
                        </Box>

                        <Spacer/>

                        {/*RANKS BOX*/}
                        <Box w={'full'} borderWidth={'1px'} borderRadius={'lg'} p={3} m={5}>
                            <Heading fontWeight={400} fontSize={'3xl'} textAlign={'center'}>
                                Ranks
                            </Heading>
                            {ranks.map(rank => (
                                <Rank id={rank}
                                    // needed for deleting a rank
                                      setRanks={setRanks} setAlternatives={setAlternatives}>
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
                </DndContext>
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 1200px to const*/}
            <Show below={'999px'}>
                <Flex direction={'column'}>
                    {ranks.map(rank => (
                        <RankMobile id={rank}
                            // needed for deleting a rank
                            setRanks={setRanks} setAlternatives={setAlternatives}>
                            {alternatives
                                .filter(alt => alt.reference_ranking === rank)
                                .map(alternative => (
                                    <AlternativeMobile name={alternative.name}/>
                                ))}
                        </RankMobile>
                    ))}
                </Flex>

                <ButtonGroup pt={"1rem"}>
                    <Button
                        colorScheme={"teal"}
                        variant='outline'
                        ml={1}
                        onClick={handleNewRank}
                    >New rank</Button>
                    <Button
                        colorScheme={'red'}
                        variant='outline'
                        ml={1}
                        onClick={handleReset}
                    >Reset</Button>
                </ButtonGroup>
            </Show>

        </>
    )
}

export default RankingTab;