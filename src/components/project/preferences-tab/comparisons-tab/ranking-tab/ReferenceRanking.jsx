import { Box, Button, ButtonGroup, Flex, Heading, Show, Spacer } from "@chakra-ui/react";
import Rank from "./desktop/Rank.jsx";
import Alternative from "./desktop/Alternative.jsx";
import { useEffect, useState } from "react";
import RankMobile from "./mobile/RankMobile.jsx";
import { DndContext } from "@dnd-kit/core";
import AlternativeMobile from "./mobile/AlternativeMobile.jsx";
import * as c from "./../../../../../config.js";

const ReferenceRanking = ({ alternatives, currentCategoryId, categories, setCategories }) => {

    // ranks is an array of integers [1, 2, ...] that represents each rank
    const [ranks, setRanks] = useState(() => {
        const ranksInAlternatives = categories
            .find(c => c.id === currentCategoryId)
            .rankings
            .map(ranking => ranking.reference_ranking)
            .filter(value => value !== 0)
            .sort()

        let maxRank = Math.max(...ranksInAlternatives)
        return Array.from({ length: maxRank }, (_, index) => 1 + index);
    });

    useEffect(() => {
        const ranksInAlternatives = categories
            .find(c => c.id === currentCategoryId)
            .rankings
            .map(ranking => ranking.reference_ranking)
            .filter(value => value !== 0)
            .sort()

        let maxRank = Math.max(...ranksInAlternatives)
        setRanks(Array.from({ length: maxRank }, (_, index) => 1 + index))
    }, [currentCategoryId])

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setCategories(categories.map(category => {
            if (category.id === currentCategoryId) {
                return {
                    ...category,
                    rankings: category.rankings.map(ranking => {
                        if (ranking.alternative.toString() === active.id)
                            return {
                                ...ranking,
                                reference_ranking: over ? parseInt(over.id) : 0
                            };
                        return ranking;
                    })
                }
            }
            return category;
        }))
    }

    const addRank = () => {
        // get max rank
        let maxRank = Math.max(...ranks);
        maxRank = maxRank === -Infinity ? 0 : maxRank;

        setRanks(pRanks => [...pRanks, maxRank + 1])
    }

    const deleteRank = (id) => {
        // delete rank
        setRanks(pRanks => pRanks.filter(rank => rank !== id));

        // update rankings that have this rank
        setCategories(categories.map(category => {
            if (category.id === currentCategoryId) {
                return {
                    ...category,
                    rankings: category.rankings.map(ranking => {
                        if (ranking.reference_ranking === id)
                            return {
                                ...ranking,
                                reference_ranking: 0
                            };
                        return ranking;
                    })
                }
            }
            return category;
        }))
    }

    const handleReset = () => {
        setCategories(categories.map(category => {
            if (category.id === currentCategoryId) {
                return {
                    ...category,
                    rankings: category.rankings.map(ranking => {
                        return {
                            ...ranking,
                            reference_ranking: 0
                        };
                    })
                }
            }
            return category;
        }))
    }

    return (
        <>

            {/*DESKTOP*/}
            <Show above={c.Preferences.Comparisons.ReferenceRanking.minWidthDesktop}>
                <DndContext onDragEnd={handleDragEnd}>
                    <Flex justify={'center'} mx={{ base: '5%', xl: '8%' }}>
                        {/*ALTERNATIVES BOX*/}
                        <Box w={'full'} borderWidth={'1px'} borderRadius={'lg'} p={3} m={5}>
                            <Heading fontWeight={400} fontSize={'3xl'} textAlign={'center'}>
                                Alternatives
                            </Heading>
                            <>
                                {categories
                                    .find(c => c.id === currentCategoryId)
                                    ?.rankings
                                    .filter(ranking => ranking.reference_ranking === 0)
                                    .map((ranking, index) => {
                                        let alternative = alternatives.find(alt => alt.id === ranking.alternative);
                                        return (
                                            <Alternative id={alternative.id} name={alternative.name} key={index}/>
                                        )
                                    })
                                }
                            </>
                        </Box>

                        <Spacer/>

                        {/*RANKS BOX*/}
                        <Box w={'full'} borderWidth={'1px'} borderRadius={'lg'} p={3} m={5}>
                            <Heading fontWeight={400} fontSize={'3xl'} textAlign={'center'}>
                                Ranks
                            </Heading>
                            <>
                                {ranks.map((rank, index) => (
                                    <Rank
                                        id={rank}
                                        deleteRank={() => deleteRank(rank)}
                                        key={index}
                                    >
                                        {categories
                                            .find(c => c.id === currentCategoryId)
                                            ?.rankings
                                            .filter(ranking => ranking.reference_ranking === rank)
                                            .map((ranking, index) => {
                                                let alternative = alternatives.find(alt => alt.id === ranking.alternative);
                                                return (
                                                    <Alternative
                                                        id={alternative.id}
                                                        name={alternative.name}
                                                        key={index}
                                                    />
                                                )
                                            })
                                        }
                                    </Rank>
                                ))}
                            </>
                            <ButtonGroup pt={"1rem"}>
                                <Button
                                    colorScheme={"teal"}
                                    variant='outline'
                                    ml={5}
                                    mt={2}
                                    onClick={addRank}
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
            <Show below={c.Preferences.Comparisons.ReferenceRanking.maxWidthMobile}>
                <Flex direction={'column'}>
                    <>
                        {ranks.map((rank, index) => (
                            <RankMobile
                                id={rank}
                                alternatives={alternatives}
                                currentCategoryId={currentCategoryId}
                                categories={categories}
                                setCategories={setCategories}
                                deleteRank={() => deleteRank(rank)}
                                key={index}
                            >
                                {categories
                                    .find(c => c.id === currentCategoryId)
                                    ?.rankings
                                    .filter(ranking => ranking.reference_ranking === rank)
                                    .map((ranking, index) => {
                                        let alternative = alternatives.find(alt => alt.id === ranking.alternative);
                                        return (
                                            <AlternativeMobile
                                                id={alternative.id}
                                                name={alternative.name}
                                                key={index}
                                            />
                                        )
                                    })
                                }
                            </RankMobile>
                        ))}
                    </>
                </Flex>

                <ButtonGroup pt={"1rem"}>
                    <Button
                        colorScheme={"teal"}
                        variant='outline'
                        ml={1}
                        onClick={addRank}
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

export default ReferenceRanking;