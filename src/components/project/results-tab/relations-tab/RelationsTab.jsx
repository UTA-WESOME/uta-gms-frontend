import { Box, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";


const RelationsTab = ({ alternatives, relations }) => {

    const bgColorNecessary = useColorModeValue("teal.200", "teal.500")
    const bgColorPossible = useColorModeValue("teal.400", "teal.700")

    return (
        <Box textAlign={'center'} mx={{ base: '1%', sm: '4%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={2}>Necessary and possible relations</Heading>
            <TableContainer my={3}>
                <Table size={'sm'} mb={2}>
                    <Thead>
                        <Tr>
                            <Th>name</Th>
                            <>
                                {alternatives
                                    .sort((x, y) => x.id > y.id ? 1 : x.id < y.id ? -1 : 0)
                                    .map((alt, i) => (
                                        <Th key={i}>{alt.name}</Th>
                                    ))
                                }
                            </>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {alternatives
                            .sort((x, y) => x.id > y.id ? 1 : x.id < y.id ? -1 : 0)
                            .map((alternative_1, index) => (
                                <Tr key={index}>
                                    <Td>{alternative_1.name}</Td>
                                    {alternatives
                                        .sort((x, y) => x.id > y.id ? 1 : x.id < y.id ? -1 : 0)
                                        .map((alternative_2, index) => {
                                            if (alternative_1.id === alternative_2.id)
                                                return <Td key={index} bgColor={bgColorNecessary}>Necessary</Td>

                                            let relation = relations
                                                .filter(r => r.alternative_1 === alternative_1.id && r.alternative_2 === alternative_2.id);

                                            if (relation.length > 0) {
                                                if (relation.some(r => r.type === "necessary")) {
                                                    return <Td key={index} bgColor={bgColorNecessary}>Necessary</Td>;
                                                } else if (relation.some(r => r.type === "possible")) {
                                                    return <Td key={index} bgColor={bgColorPossible}>Possible</Td>;
                                                }
                                            }
                                            return <Td key={index}></Td>;
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

export default RelationsTab;