import { Show, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const AlternativesTab = ({ alternatives, setAlternatives, criteria }) => {

    return (
        <>
            {JSON.stringify(alternatives, null, 4)}


            {/*DESKTOP*/}
            <Show above={'lg'}>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>
                                    <Text>Name</Text>
                                </Th>
                                {criteria.map(criterion => {
                                    return (
                                        <Th>
                                            {criterion.name}
                                        </Th>
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
                                            <Td>
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