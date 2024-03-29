import {
    Button,
    ButtonGroup,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spacer,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import * as c from '../../../../config.js';

const IntensitiesTabMobile = ({
                                  alternatives,
                                  criteria,
                                  currentCategoryId,
                                  preferenceIntensities,
                                  setPreferenceIntensities,
                                  deletePreferenceIntensity
                             }) => {

    const [currentPreferenceIntensity, setCurrentPreferenceIntensity] = useState({
        id: 0,
        type: c.Preferences.Intensities.types.preference,
        alternative_1: 0,
        alternative_2: 0,
        alternative_3: 0,
        alternative_4: 0,
        category: null,
        criterion: null
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChangeAlternative = (alternativeNumber, alternativeId) => {
        setCurrentPreferenceIntensity({
            ...currentPreferenceIntensity,
            [`alternative_${alternativeNumber}`]: alternativeId,
        })
    }

    const handleChangeCriterion = (criterionId) => {
        setCurrentPreferenceIntensity({
            ...currentPreferenceIntensity,
            criterion: criterionId !== 0 ? criterionId : null,
        })
    }

    const handleChangeType = (newType) => {
        setCurrentPreferenceIntensity({
            ...currentPreferenceIntensity,
            type: newType,
        })
    }

    const submitData = (event) => {
        event.preventDefault();

        setPreferenceIntensities(pPreferenceIntensities => pPreferenceIntensities.map(pi => {
            if (pi.id === currentPreferenceIntensity.id) {
                return currentPreferenceIntensity;
            }
            return pi;
        }))

        onClose();
    }

    return (
        <>
            <Flex direction={'column'} spacing={4}>
                <Center>
                    <Heading size={'lg'} mb={2}>Intensities</Heading>
                </Center>
                {preferenceIntensities
                    .filter(pi => {
                        if (currentCategoryId === 0)
                            return pi.criterion !== null;
                        return pi.category === currentCategoryId;
                    })
                    .map((preferenceIntensity, index) => (
                    <HStack
                        borderTopWidth={'1px'}
                        borderBottomWidth={index === preferenceIntensities
                            .filter(pi => {
                                if (currentCategoryId === 0)
                                    return pi.criterion !== null;
                                return pi.category === currentCategoryId;
                            }).length - 1 ? '1px' : '0px'}
                        p={2}
                        key={index}
                    >
                        <Text isTruncated>Intensity {index + 1}</Text>
                        <Spacer/>
                        <IconButton
                            aria-label={'edit-preference-intensity'}
                            icon={<EditIcon/>}
                            onClick={() => {
                                setCurrentPreferenceIntensity(preferenceIntensity);
                                onOpen();
                            }}
                        />
                        <IconButton
                            color={'red.300'}
                            aria-label={'delete-preference-intensity'}
                            icon={<DeleteIcon/>}
                            onClick={() => deletePreferenceIntensity(preferenceIntensity.id)}
                        />
                    </HStack>
                ))}
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent
                    mx={'15px'}
                    as={"form"}
                    onSubmit={submitData}
                >
                    <ModalHeader>Edit intensity</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody textAlign={'center'}>
                        <VStack spacing={"15px"}>
                            <Heading colorScheme={'teal'} size={'xl'}>A - B {currentPreferenceIntensity.type} C - D</Heading>
                            <FormControl>
                                <FormLabel fontSize={'sm'}>Type</FormLabel>
                                <Select
                                    value={currentPreferenceIntensity.type}
                                    onChange={(event) => handleChangeType(event.target.value)}
                                >
                                    <>
                                        {Object.entries(c.Preferences.Intensities.types).map(([type, preference]) => (
                                            <option value={preference} key={type}>
                                                {preference}
                                            </option>
                                        ))}
                                    </>
                                </Select>
                            </FormControl>
                            <>
                                {c.Preferences.Intensities.alternatives.map(alternativeConst => (
                                    <FormControl key={alternativeConst.number}>
                                        <FormLabel fontSize={'sm'}>Alternative {alternativeConst.letter}</FormLabel>
                                        <Select
                                            value={currentPreferenceIntensity[`alternative_${alternativeConst.number}`]}
                                            onChange={(event) => handleChangeAlternative(alternativeConst.number, parseInt(event.target.value))}
                                        >
                                            {alternatives.map(alternative => (
                                                <option value={alternative.id}
                                                        key={alternative.id}>{alternative.name}</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ))}
                            </>
                            {currentCategoryId === 0 &&
                                <FormControl>
                                    <FormLabel fontSize={'sm'}>Criterion</FormLabel>
                                    <Select
                                        value={currentPreferenceIntensity.criterion !== null ? currentPreferenceIntensity.criterion : 0}
                                        onChange={(event) => handleChangeCriterion(parseInt(event.target.value))}
                                    >
                                        <option value={0}>General</option>
                                        {criteria.map(criterion => (
                                            <option value={criterion.id} key={criterion.id}>{criterion.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            }

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup pt={"1rem"}>
                            <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                            <Button onClick={onClose}>Back</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )

}

export default IntensitiesTabMobile;