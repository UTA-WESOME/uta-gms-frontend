import { Box, Card, CardBody, Table, Text, Thead, Tbody, Tr, Th, Td, TableContainer, } from "@chakra-ui/react";

const CSV = () => {
    return (
        <Box>
            <Text my={5} textAlign={'justify'}>
                This section of the documentation is dedicated to import and export mechanism in the app.
            </Text>
            <Text my={5} textAlign={'justify'}>
                The <b>CSV</b> file used in the application is a simple text file containing information about alternatives,
                criteria and values of alternatives on the criteria. The file is a text representation of the performance
                table, with the first row corresponding to the scales of the criteria. The columns are separated by a
                semicolon. A simple example of the data stored in a <b>CSV</b> file is given below.
            </Text>

            <Card my={5}>
                <CardBody>
                    <Text>;gain;gain;gain;cost</Text>
                    <Text>;PTS;REB;AST;TOV</Text>
                    <Text>Joel Embiid;34.2;11.7;6.0;3.8</Text>
                    <Text>Luka Doncic;32.7;8.3;9.1;4.0</Text>
                    <Text>Stephen Curry;29.0;4.9;4.2;3.3</Text>
                    <Text>LeBron James;25.2;7.5;7.0;3.4</Text>
                </CardBody>
            </Card>

            <Text my={5} textAlign={'justify'}>
                The file provided could be illustrated as the table.
            </Text>

            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>gain</Th>
                            <Th>gain</Th>
                            <Th>gain</Th>
                            <Th>cost</Th>
                        </Tr>
                        <Tr>
                            <Th></Th>
                            <Th>PTS</Th>
                            <Th>REB</Th>
                            <Th>AST</Th>
                            <Th>TOV</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Joel Embiid</Td>
                            <Td>34.2</Td>
                            <Td>11.7</Td>
                            <Td>6.0</Td>
                            <Td>3.8</Td>
                        </Tr>
                        <Tr>
                            <Td>Luka Doncic</Td>
                            <Td>32.7</Td>
                            <Td>8.3</Td>
                            <Td>9.1</Td>
                            <Td>4.0</Td>
                        </Tr>
                        <Tr>
                            <Td>Stephen Curry</Td>
                            <Td>29.0</Td>
                            <Td>4.9</Td>
                            <Td>4.2</Td>
                            <Td>3.3</Td>
                        </Tr>
                        <Tr>
                            <Td>LeBron James</Td>
                            <Td>25.2</Td>
                            <Td>7.5</Td>
                            <Td>7.0</Td>
                            <Td>3.4</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <Text my={5} textAlign={'justify'}>
                The data represents information about basketball players and their statistics. It consists of four criteria,
                which are listed in the second row. The first three are of the gain type. The fourth is of the cost type.
                The first column contains the names of the alternatives, which in this example are basketball players. The
                middle cells are responsible for representing the value of each alternative for each criterion. For example,
                according to the data in the table, <i>Stephen Curry</i> averages 4.2 assists per game.
            </Text>
        </Box>
    )
}

export default CSV;