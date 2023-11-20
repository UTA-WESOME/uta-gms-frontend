import { Box, Divider, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const PercentagesTab = ({alternatives, percentages}) => {
    return (

        <Box textAlign={'center'} mx={{ base: '1%', sm: '5%'}} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={2}>
                Percentages
            </Heading>
            <Divider/>
            <TableContainer mt={3}>
                <Table variant='striped' size={'sm'}>
                    <TableCaption>How many percent...</TableCaption>
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
                                        <Td key={index}>
                                            {p.percent}
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

export default PercentagesTab;