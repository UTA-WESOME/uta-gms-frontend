import { Select, Spacer, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const PreferenceTabDesktop = ({ preferenceIntensities, setPreferenceIntensities, alternatives, criteria }) => {


    const alternativesNumbers = [1, 2, 3, 4];

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
                                {alternativesNumbers.map(alternativeNumber => (
                                    <Th>
                                        <Text>Alternative {alternativeNumber}</Text>
                                    </Th>
                                ))}
                            </>
                            <Th>
                                <Text>Criterion</Text>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {preferenceIntensities.map((preferenceIntensity, index) => (
                            <Tr key={index}>
                                {alternativesNumbers.map(alternativeNumber => (
                                    <Td key={alternativeNumber}>
                                        <Select
                                            value={preferenceIntensity[`alternative_${alternativeNumber}`]}
                                            onChange={(event) => handleChangeAlternative(preferenceIntensity.id, alternativeNumber, parseInt(event.target.value))}
                                        >
                                            {alternatives.map(alternative => (
                                                <option value={alternative.id}
                                                        key={alternative.id}>{alternative.name}</option>
                                            ))}
                                        </Select>
                                        {alternativeNumber !== 4 && <Spacer/>}
                                    </Td>
                                ))}
                                <Td>
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
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default PreferenceTabDesktop;