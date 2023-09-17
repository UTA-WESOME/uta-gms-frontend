import { Box, Button, ButtonGroup, Flex, Heading, Show, Spacer } from "@chakra-ui/react";
import Rank from "./desktop/Rank.jsx";
import Alternative from "./desktop/Alternative.jsx";
import { useState } from "react";
import RankMobile from "./mobile/RankMobile.jsx";
import { DndContext } from "@dnd-kit/core";
import AlternativeMobile from "./mobile/AlternativeMobile.jsx";

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
                            {alternatives.filter(alt => alt.reference_ranking === 0).map((alternative, index) => (
                                <Alternative id={alternative.id} name={alternative.name} key={index}/>
                            ))}
                        </Box>

                        <Spacer/>

                        {/*RANKS BOX*/}
                        <Box w={'full'} borderWidth={'1px'} borderRadius={'lg'} p={3} m={5}>
                            <Heading fontWeight={400} fontSize={'3xl'} textAlign={'center'}>
                                Ranks
                            </Heading>
                            {ranks.map((rank, index) => (
                                <Rank id={rank}
                                    // needed for deleting a rank
                                      setRanks={setRanks} setAlternatives={setAlternatives}
                                      key={index}
                                >
                                    {alternatives
                                        .filter(alt => alt.reference_ranking === rank)
                                        .map((alternative, index) => (
                                            <Alternative id={alternative.id} name={alternative.name} key={index}/>
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
                    {ranks.map((rank, index) => (
                        <RankMobile id={rank} key={index}
                            // needed for deleting a rank
                                    setRanks={setRanks} setAlternatives={setAlternatives}
                            // needed for modal
                                    alternatives={alternatives}
                        >
                            {alternatives
                                .filter(alt => alt.reference_ranking === rank)
                                .map((alternative, index) => (
                                    <AlternativeMobile name={alternative.name} key={index}/>
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