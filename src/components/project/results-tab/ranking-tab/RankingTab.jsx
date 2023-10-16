import { Box, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import CustomTooltip from "../../../CustomTooltip.jsx";
import { WarningIcon } from "@chakra-ui/icons";

const RankingTab = ({ alternatives }) => {
    return (

        <Box textAlign={'center'} mx={{ base: '1%', sm: '10%', lg: '18%', '2xl': '25%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl'}} mb={3}>
                Result ranking
                {alternatives.some(alt => alt.ranking === 0) &&
                    <CustomTooltip
                        label={'Click "Save & run" button to update ranking!'}
                        openDelay={200}>
                        <WarningIcon ml={{ base: 1, md: 2, xl: 3 }} mb={{ base: 1, md: 3 }}
                                     color={'orange.200'}/>
                    </CustomTooltip>
                }
            </Heading>

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

export default RankingTab;