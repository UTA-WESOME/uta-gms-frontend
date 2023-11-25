import { Icon, IconButton, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FaGreaterThan, FaMinus } from "react-icons/fa";
import * as c from '../../../../config.js';
import { Fragment } from "react";

const IntensitiesTabDesktop = ({
                                   alternatives,
                                   criteria,
                                   currentCategoryId,
                                   preferenceIntensities,
                                   setPreferenceIntensities,
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
                                {c.Preferences.Intensities.alternatives.map(alternative => (
                                    <Fragment key={alternative.number}>
                                        <Th>
                                            <Text>Alternative {alternative.letter}</Text>
                                        </Th>
                                        {alternative.number !== 4 && <Th/>}
                                    </Fragment>
                                ))}
                            </>
                            {currentCategoryId === 0 && <Th borderLeftWidth={'1px'}>Criterion</Th>}
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {preferenceIntensities
                            .filter(pi => {
                                if (currentCategoryId === 0)
                                    return pi.criterion !== null;
                                return pi.category === currentCategoryId;
                            })
                            .map((preferenceIntensity, index) => (
                                <Tr key={index}>
                                    <>
                                        {c.Preferences.Intensities.alternatives.map(alternativeConst => (
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
                                    {currentCategoryId === 0 &&
                                        <Td borderLeftWidth={'1px'}>
                                            <Select
                                                value={preferenceIntensity.criterion !== null ? preferenceIntensity.criterion : 0}
                                                onChange={(event) => handleChangeCriterion(preferenceIntensity.id, parseInt(event.target.value))}
                                            >
                                                {criteria.map(criterion => (
                                                    <option value={criterion.id}
                                                            key={criterion.id}>{criterion.name}</option>
                                                ))}
                                            </Select>
                                        </Td>
                                    }
                                    <Td>
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
        </>
    )
}

export default IntensitiesTabDesktop;