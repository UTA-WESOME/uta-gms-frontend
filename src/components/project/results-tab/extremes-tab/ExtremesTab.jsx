import { Box, Divider, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const ExtremesTab = ({ alternatives, rankings }) => {
    return (
        <Box textAlign={'center'} mx={{ base: '1%', sm: '3%', lg: '10%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={2}>
                Extreme ranks
            </Heading>
            <Divider/>
            <TableContainer mt={3}>
                <Table variant='striped' size={'sm'}>
                    <TableCaption>Best and worst possible ranks for alternatives</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>name</Th>
                            <Th>pessimistic best</Th>
                            <Th>pessimistic worst</Th>
                            <Th>optimistic best</Th>
                            <Th>optimistic worst</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {alternatives
                            .sort((x, y) => x.name > y.name ? 1 : x.name < x.name ? -1 : 0)
                            .map((alternative, index) => (
                                <Tr key={index}>
                                    <Td>{alternative.name}</Td>
                                    <Td>{rankings.find(r => r.alternative === alternative.id).extreme_pessimistic_best}</Td>
                                    <Td>{rankings.find(r => r.alternative === alternative.id).extreme_pessimistic_worst}</Td>
                                    <Td>{rankings.find(r => r.alternative === alternative.id).extreme_optimistic_best}</Td>
                                    <Td>{rankings.find(r => r.alternative === alternative.id).extreme_optimistic_worst}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ExtremesTab;