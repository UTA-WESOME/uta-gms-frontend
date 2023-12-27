import { InfoIcon } from "@chakra-ui/icons";
import {
    Box,
    Divider,
    Heading,
    HStack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import CustomTooltip from "../../../utils/CustomTooltip.jsx";
import * as c from "./../../../../config.js";

const ExtremesTab = ({ alternatives, rankings }) => {
    return (
        <Box textAlign={'center'} mx={{ base: '1%', sm: '3%', lg: '10%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={2}>
                Extreme ranks
            </Heading>
            <Divider/>
            <TableContainer mt={3}>
                <Table size={'sm'}>
                    <TableCaption>Best and worst possible ranks for alternatives</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>name</Th>
                            <Th>
                                <HStack>
                                    <Text>pessimistic best</Text>
                                    <CustomTooltip
                                        label={c.Results.Extremes.pbDescription}
                                        openDelay={200}>
                                        <InfoIcon/>
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                <HStack>
                                    <Text>pessimistic worst</Text>
                                    <CustomTooltip
                                        label={c.Results.Extremes.pwDescription}
                                        openDelay={200}>
                                        <InfoIcon/>
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                <HStack>
                                    <Text>optimistic best</Text>
                                    <CustomTooltip
                                        label={c.Results.Extremes.obDescription}
                                        openDelay={200}>
                                        <InfoIcon/>
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                <HStack>
                                    <Text>optimistic worst</Text>
                                    <CustomTooltip
                                        label={c.Results.Extremes.owDescription}
                                        openDelay={200}>
                                        <InfoIcon/>
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {alternatives
                            .sort((x, y) => x.name > y.name ? 1 : x.name < x.name ? -1 : 0)
                            .map((alternative, index) => (
                                <Tr key={index}>
                                    <Td>{alternative.name}</Td>
                                    <Td borderLeftWidth={'1px'}>{rankings.find(r => r.alternative === alternative.id).extreme_pessimistic_best}</Td>
                                    <Td>{rankings.find(r => r.alternative === alternative.id).extreme_pessimistic_worst}</Td>
                                    <Td borderLeftWidth={'1px'}>{rankings.find(r => r.alternative === alternative.id).extreme_optimistic_best}</Td>
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