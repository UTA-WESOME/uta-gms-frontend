import { Box, Divider, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import CustomTooltip from "../../../utils/CustomTooltip.jsx";
import { WarningIcon } from "@chakra-ui/icons";

const RankingTab = ({ alternatives, rankings }) => {
    return (

        <Box textAlign={'center'} mx={{ base: '1%', sm: '10%', lg: '18%', '2xl': '25%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={2}>
                Result ranking
            </Heading>
            <Divider/>
            <TableContainer mt={3}>
                <Table variant='striped' size={'sm'}>
                    <TableCaption>Results of the most representative function method</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>position</Th>
                            <Th>name</Th>
                            <Th>value</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rankings
                            .sort((x, y) => x.ranking > y.ranking ? 1 : x.ranking < y.ranking ? -1 : 0)
                            .map((ranking, index) => (
                                <Tr key={index}>
                                    <Td>{ranking.ranking}</Td>
                                    <Td>{alternatives.find(a => a.id === ranking.alternative).name}</Td>
                                    <Td>{ranking.ranking_value}</Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default RankingTab;