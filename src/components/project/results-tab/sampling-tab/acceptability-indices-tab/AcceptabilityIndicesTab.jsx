import {
    Box,
    Divider,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import * as c from "./../../../../../config.js";


const findColor = (number) => {
    const colors = useColorModeValue(c.Results.Sampling.lightModeColors, c.Results.Sampling.darkModeColors);
    const range = Object.keys(colors).reverse().find(key => number >= parseInt(key));
    return colors[range];
}


const AcceptabilityIndicesTab = ({ alternatives, percentages }) => {
    return (

        <Box textAlign={'center'} mx={{ base: '1%', sm: '4%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={2}>
                Acceptability indices
            </Heading>
            <Divider/>
            <TableContainer my={3}>
                <Table size={'sm'} mb={2}>
                    <Thead>
                        <Tr>
                            <Th>alternative</Th>
                            <>
                                {[...new Set(percentages.map(p => p.position))]
                                    .sort((x, y) => x.position > y.position ? 1 : x.position < x.position ? -1 : 0)
                                    .map((p, index) => (
                                        <Th key={index}>
                                            Pos. {p} [%]
                                        </Th>
                                    ))
                                }
                            </>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {alternatives.map((alternative, index) => (
                            <Tr key={index}>
                                <Td>{alternative.name}</Td>
                                {percentages
                                    .filter(p => p.alternative === alternative.id)
                                    .sort((x, y) => x.position > y.position ? 1 : x.position < x.position ? -1 : 0)
                                    .map((p, index) => (
                                        <Td key={index} bgColor={findColor(p.percent)}>
                                            {p.percent.toFixed(3).replace(/\.?0+$/, '')}
                                        </Td>
                                    ))
                                }
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AcceptabilityIndicesTab;