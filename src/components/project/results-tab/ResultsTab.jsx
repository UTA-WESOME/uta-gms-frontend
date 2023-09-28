import { Box, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";


const ResultsTab = ({ alternatives }) => {
    return (
        <Box textAlign={'center'} mx={{base: '1%', sm: '10%', lg: '18%', '2xl': '25%'}} mt={'10px'}>
            <Heading size={{base: 'md', md: 'xl', xl: '2xl'}}>Result ranking</Heading><br/>
            <TableContainer>
                <Table variant='striped' size={'sm'}>
                    <TableCaption>Results of the UTA-GMS method</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>position</Th>
                            <Th>name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {alternatives
                            .filter(alternative => alternative.ranking !== 0)
                            .sort((x, y) => x.ranking > y.ranking ? 1 : x.ranking < y.ranking ? -1 : 0)
                            .map((alternative, index) => (
                            <Tr key={index}>
                                <Td>{alternative.ranking}</Td>
                                <Td>{alternative.name}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default ResultsTab;