import { Box, Divider, Heading, Table, TableContainer, Tbody, Td, Tr, useColorModeValue } from "@chakra-ui/react";
import * as c from "./../../../../../config.js";


const findColor = (number) => {
    const colors = useColorModeValue(c.Results.Sampling.lightModeColors, c.Results.Sampling.darkModeColors);
    const range = Object.keys(colors).reverse().find(key => number >= parseInt(key));
    return colors[range];
}


const PairwiseWinningTab = ({ alternatives, percentages }) => {
    return (
        <Box textAlign={'center'} mx={{ base: '1%', sm: '4%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={2}>
                Pairwise winning
            </Heading>
            <Divider/>
            <TableContainer my={3}>
                <Table size={'sm'} mb={2}>
                    <Tbody>
                        <Tr>
                            <Td/>
                            <>
                                {alternatives
                                    .sort((x, y) => x.id > y.id ? 1 : x.id < y.id ? -1 : 0)
                                    .map((alt, i) => (
                                        <Td key={i} fontWeight={'bold'}>{alt.name}</Td>
                                    ))
                                }
                            </>
                        </Tr>
                        {alternatives
                            .sort((x, y) => x.id > y.id ? 1 : x.id < y.id ? -1 : 0)
                            .map((alternative_1, index) => (
                                <Tr key={index}>
                                    <Td fontWeight={'bold'}>{alternative_1.name}</Td>
                                    {alternatives
                                        .sort((x, y) => x.id > y.id ? 1 : x.id < y.id ? -1 : 0)
                                        .map((alternative_2, index) => {
                                            if (alternative_1.id === alternative_2.id)
                                                return <Td key={index} bgColor={findColor(0)}>0</Td>

                                            let p = percentages
                                                .find(r => r.alternative_1 === alternative_1.id && r.alternative_2 === alternative_2.id);

                                            return <Td
                                                key={index}
                                                bgColor={findColor(p.percentage)}
                                            >{p.percentage}</Td>;
                                        })
                                    }
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default PairwiseWinningTab;