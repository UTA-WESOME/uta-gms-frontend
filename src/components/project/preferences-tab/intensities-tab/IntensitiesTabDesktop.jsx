import {
    Button,
    Icon,
    IconButton,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FaGreaterThan, FaMinus } from "react-icons/fa";
import * as c from './constants.js';
import { Fragment } from "react";

const IntensitiesTabDesktop = ({
                                  preferenceIntensities,
                                  setPreferenceIntensities,
                                  alternatives,
                                  criteria,
                                  addPreferenceIntensity,
                                  deletePreferenceIntensity
                              }) => {

    const handleChangeAlternative = (preferenceId, alternativeNumber, alternativeId) => {
        setPreferenceIntensities(pPreferenceIntensities => {
            return pPreferenceIntensities.map(pi => {
                if (pi.id === preferenceId) {
                    return { ...pi, [`alternative_${alternativeNumber}`]: alternativeId };
                }
                return pi;
            })
        })
    }

    const handleChangeCriterion = (preferenceId, criterionId) => {
        setPreferenceIntensities(pPreferenceIntensities => {
            return pPreferenceIntensities.map(pi => {
                if (pi.id === preferenceId) {
                    return { ...pi, criterion: criterionId !== 0 ? criterionId : null };
                }
                return pi;
            })
        })
    }

    return (
        <>
            <TableContainer>
                <Table size={'sm'}>
                    <Thead>
                        <Tr>
                            <>
                                {c.alternatives.map(alternative => (
                                    <Fragment key={alternative.number}>
                                        <Th>
                                            <Text>Alternative {alternative.letter}</Text>
                                        </Th>
                                        {alternative.number !== 4 && <Th/>}
                                    </Fragment>
                                ))}
                            </>
                            <Th borderLeftWidth={'1px'}>
                                <Text>Criterion</Text>
                            </Th>
                            <Th/>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {preferenceIntensities.map((preferenceIntensity, index) => (
                            <Tr key={index}>
                                <>
                                    {c.alternatives.map(alternativeConst => (
                                        <Fragment key={alternativeConst.number}>
                                            <Td>
                                                <Select
                                                    value={preferenceIntensity[`alternative_${alternativeConst.number}`]}
                                                    onChange={(event) => handleChangeAlternative(preferenceIntensity.id, alternativeConst.number, parseInt(event.target.value))}
                                                >
                                                    {alternatives.map(alternative => (
                                                        <option value={alternative.id}
                                                                key={alternative.id}>{alternative.name}</option>
                                                    ))}
                                                </Select>
                                            </Td>
                                            {(alternativeConst.number === 1 || alternativeConst.number === 3) &&
                                                <Td textAlign={'center'}>
                                                    <Icon as={FaMinus}/>
                                                </Td>
                                            }
                                            {alternativeConst.number === 2 &&
                                                <Td textAlign={'center'}>
                                                    <Icon as={FaGreaterThan}/>
                                                </Td>
                                            }
                                        </Fragment>
                                    ))}
                                </>
                                <Td borderLeftWidth={'1px'}>
                                    <Select
                                        value={preferenceIntensity.criterion !== null ? preferenceIntensity.criterion : 0}
                                        onChange={(event) => handleChangeCriterion(preferenceIntensity.id, parseInt(event.target.value))}
                                    >
                                        <option value={0}>General</option>
                                        {criteria.map(criterion => (
                                            <option value={criterion.id} key={criterion.id}>{criterion.name}</option>
                                        ))}
                                    </Select>
                                </Td>
                                <Td textAlign={'right'}>
                                    <IconButton
                                        color={'red.300'}
                                        aria-label={'delete-preference-intensity'}
                                        icon={<DeleteIcon/>}
                                        onClick={() => deletePreferenceIntensity(preferenceIntensity.id)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Button mx={6} my={4} colorScheme={'teal'} onClick={addPreferenceIntensity} variant='outline'>
                New preference
            </Button>
        </>
    )
}

export default IntensitiesTabDesktop;