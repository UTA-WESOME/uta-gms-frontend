import {
    Button,
    Checkbox,
    CheckboxGroup,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiDownload } from "react-icons/bi";
import { InfoIcon } from '@chakra-ui/icons';
import CustomTooltip from '../CustomTooltip';



const ExportButton = (props) => {
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const [selectedValues, setSelectedValues] = useState(['csv', 'xml']);
    const toast = useToast();
    const toastId = "toast-import";

    const handleCheckboxChange = (values) => {
        console.log(values);
        setSelectedValues(values);
    };

    function handleExport() {
        if (selectedValues.includes('csv')) {
            console.log('csv');
            downloadCsv();
        }
        if (selectedValues.includes('xml')) {
            console.log('xml');
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: 'Error!',
                    description: `not implemented yet!`,
                    status: 'error',
                    duration: 7000,
                    isClosable: true,
                });
            }
        }

    }

    function downloadCsv() {
        fetch(`http://localhost:8080/api/projects/${props.projectId}/export_csv/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);

                link.download = 'data.csv';

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error while downloading CSV:', error);
                if (!toast.isActive(toastId)) {
                    toast({
                        id: toastId,
                        title: 'Error!',
                        description: `${error}`,
                        status: 'error',
                        duration: 7000,
                        isClosable: true,
                    });
                }
            });
    }

    return (
        <>
            {props.desktop
                ? <Button
                    mt={props.margTop}
                    mb={props.margBottom}
                    ml={props.margLeft}
                    mr={props.margRight}
                    colorScheme={'teal'}
                    leftIcon={<BiDownload />}
                    onClick={onOpenInfo} >
                    Export data
                </Button>
                : <IconButton
                    aria-label={'Export to file'}
                    colorScheme={'teal'}
                    icon={<BiDownload />}
                    onClick={onOpenInfo} >
                </IconButton>}

            <Modal isOpen={isOpenInfo} onClose={onCloseInfo}>
                <ModalOverlay />
                <ModalContent margin={10}>
                    <ModalHeader>
                        <>
                            Export data
                            <CustomTooltip
                                label={"Export the project by downloading a .csv file or a group of .xml files in the XMCDA format."}
                                openDelay={200} >
                                <InfoIcon minH={'4'} minW={'4'} ml={2} mb={1} />
                            </CustomTooltip>
                        </>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Text mb={'4'}>
                            Select the type of file you'd like to export.
                        </Text>

                        <CheckboxGroup colorScheme='teal' defaultValue={selectedValues} onChange={handleCheckboxChange}>
                            <Stack spacing={[1, 1]} direction={['row', 'column']} mb={'4'}>
                                <Checkbox value='csv'>CSV</Checkbox>
                                <Checkbox value='xml'>XMCDA</Checkbox>
                            </Stack>
                        </CheckboxGroup>

                        <Button
                            height={'12'}
                            width={'full'}
                            alignSelf={'end'}
                            size={'md'}
                            mb={6}
                            onClick={handleExport}>
                            Download Files
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};
export default ExportButton;
