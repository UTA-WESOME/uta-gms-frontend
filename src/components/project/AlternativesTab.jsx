import { Show, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";

const AlternativesTab = ({ alternatives, setAlternatives, criteria }) => {

    return (
        <>
            {/*{JSON.stringify(alternatives, null, 4)}*/}


            {/*DESKTOP*/}
            <Show above={'lg'}>
                <TableContainer pb={2}>
                    <Table style={{borderCollapse: 'separate', borderSpacing: "0"}}>
                        <Thead>
                            <Tr>
                                <Th
                                    position={'sticky'}
                                    backgroundColor={useColorModeValue('white', 'gray.800')}
                                    left={0}
                                    borderRightWidth={'2px'}
                                >
                                    <Text>Name</Text>
                                </Th>
                                {criteria.map(criterion => {
                                    return (
                                        <>
                                            <Th>
                                                <Text>{criterion.name}</Text>
                                            </Th>
                                        </>
                                    )
                                })}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {alternatives
                                .sort((x, y) => (x.name > y.name) ? 1 : ((x.name < y.name) ? -1 : 0))
                                .map((alternative, index) => {
                                    return (
                                        <Tr>
                                            <Td
                                                position={'sticky'}
                                                backgroundColor={useColorModeValue('white', 'gray.800')}
                                                left={0}
                                                borderRightWidth={'2px'} >
                                                <Text>{alternative.name}</Text>
                                            </Td>
                                            {criteria.map(criterion => {
                                                const performance = alternative.performances.filter(p => p.criterion === criterion.id)[0]
                                                return (
                                                    <Td>
                                                        <Text>{performance.value}</Text>
                                                    </Td>
                                                )
                                            })}
                                        </Tr>
                                    )
                                })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>

            </Show>
        </>

    )
}

export default AlternativesTab;