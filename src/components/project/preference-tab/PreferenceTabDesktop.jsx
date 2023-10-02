import { HStack, Select, Spacer, VStack } from "@chakra-ui/react";
import { Fragment } from "react";

const PreferenceTabDesktop = ({ preferenceIntensities, setPreferenceIntensities, alternatives, criteria }) => {

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
            <VStack mt={3}>
                {preferenceIntensities.map(preferenceIntensity => (
                    <HStack my={2} key={preferenceIntensity.id}>

                        {/*ALTERNATIVES*/}
                        {[1, 2, 3, 4].map(alternativeNumber => (
                            <Fragment key={alternativeNumber}>
                                <Select
                                    value={preferenceIntensity[`alternative_${alternativeNumber}`]}
                                    w={'210px'}
                                    onChange={(event) => handleChangeAlternative(preferenceIntensity.id, alternativeNumber, parseInt(event.target.value))}
                                >
                                    {alternatives.map(alternative => (
                                        <option value={alternative.id} key={alternative.id}>{alternative.name}</option>
                                    ))}
                                </Select>
                                {alternativeNumber !== 4 && <Spacer/>}
                            </Fragment>
                        ))}

                        {/*CRITERION*/}
                        <Select
                            value={preferenceIntensity.criterion !== null ? preferenceIntensity.criterion : 0}
                            w={'210px'}
                            onChange={(event) => handleChangeCriterion(preferenceIntensity.id, parseInt(event.target.value))}
                        >
                            <option value={0}>General</option>
                            {criteria.map(criterion => (
                                <option value={criterion.id} key={criterion.id}>{criterion.name}</option>
                            ))}
                        </Select>
                    </HStack>
                ))}
            </VStack>
        </>
    )
}

export default PreferenceTabDesktop;