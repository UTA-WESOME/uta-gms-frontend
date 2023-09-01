import {
    FormControl,
    HStack,
    Input,
    Show,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import CustomTooltip from "../CustomTooltip.jsx";
import { InfoIcon } from "@chakra-ui/icons";

const AlternativesTab = ({ alternatives, setAlternatives, criteria }) => {

    const colorMode = useColorModeValue('white', 'gray.800');

    const handleChangeName = (event, id) => {
        let newName = event.target.value;
        if (newName.length <= 64) {
            setAlternatives(pAlternatives => {
                return pAlternatives.map(alternative => {
                    if (alternative.id === id) {
                        return { ...alternative, name: newName };
                    }
                    return alternative;
                });
            });
        } else {
            // length of the alternative name is too long
            let alternative = alternatives.filter(alternative => alternative.id === id)[0];
            event.target.value = alternative.name;
        }
    }


    return (
        <>


            {/*DESKTOP*/}
            <Show above={'lg'}>
                <TableContainer pb={2}>
                    <Table style={{ borderCollapse: 'separate', borderSpacing: "0" }}>
                        <Thead>
                            <Tr>
                                <Th
                                    position={'sticky'}
                                    backgroundColor={useColorModeValue('white', 'gray.800')}
                                    left={0}
                                    borderRightWidth={'2px'}
                                >
                                    <HStack>
                                        <Text>Name</Text>
                                        <CustomTooltip label={"Alternative name"} openDelay={200}>
                                            <InfoIcon/>
                                        </CustomTooltip>
                                    </HStack>
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
                                    console.log(alternative.name, index);
                                    return (
                                        <Tr>
                                            <Td
                                                position={'sticky'}
                                                backgroundColor={colorMode}
                                                left={0}
                                                borderRightWidth={'2px'}
                                                minW={'225px'}
                                                maxW={'225px'}
                                            >
                                                <FormControl isInvalid={alternative.name.length === 0}>
                                                    <Input
                                                        defaultValue={alternative.name}
                                                        onChange={(event) => handleChangeName(event, alternative.id)}
                                                    />
                                                </FormControl>
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

            {JSON.stringify(alternatives, null, 4)}

        </>

    )
}

export default AlternativesTab;