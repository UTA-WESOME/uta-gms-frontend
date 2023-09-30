import {
    Button,
    HStack,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Progress,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { BiSolidFileImport } from "react-icons/bi";
import { useState } from 'react';


const ImportModal = (props) => {

    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const [msg, setMsg] = useState(null);

    function handleUpload() {
        if (!file) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setMsg("Uploading...");
        setProgress(prevState => {
            return { ...prevState, started: true }
        })
        fetch(`http://localhost:8080/api/upload`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setMsg("Upload succesful");
                console.log('File uploaded successfully:', data);
            })
            .catch((error) => {
                setMsg("Upload failed");
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    return (
        <>
            {props.full
                ? <Button
                    mt={props.margTop}
                    mb={props.margBottom}
                    ml={props.margLeft}
                    mr={props.margRight}
                    colorScheme={'teal'}
                    leftIcon={<BiSolidFileImport />}
                    onClick={onOpenInfo} >
                    Import from file
                </Button>
                : <IconButton
                    ml={1}
                    mr={1}
                    colorScheme={'teal'}
                    icon={<BiSolidFileImport />}
                    onClick={onOpenInfo} >
                </IconButton>}



            <Modal isOpen={isOpenInfo} onClose={onCloseInfo}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Elo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack
                            justify={'center'}
                            spacing={'1rem'}
                            width={'50'} >
                            <HStack
                                height={'20'}
                                width={'full'}
                                justify={'center'}
                                spacing={'1rem'}>
                                <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                                    <Text
                                        textAlign={'center'}
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        borderWidth={'2px'}
                                        borderRadius={'md'}
                                        borderColor={'teal'}
                                        padding={'4'}
                                        _hover={{ bg: 'teal.500', color: 'white' }}
                                    >
                                        Choose file
                                    </Text>
                                </label>
                                <Input
                                    id="file-input"
                                    type="file"
                                    accept=".csv"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const selectedFile = e.target.files[0];
                                        setFile(selectedFile);
                                        const fileNameDisplay = document.getElementById('file-name-display');
                                        if (fileNameDisplay && selectedFile) {
                                            fileNameDisplay.innerText = selectedFile.name;
                                        } else if (fileNameDisplay) {
                                            fileNameDisplay.innerText = '';
                                        }
                                    }}
                                />

                                <Text
                                    height={'full'}
                                    textAlign={'center'}
                                    display={'flex'}
                                    id="file-name-display"
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    borderWidth={'2px'}
                                    borderRadius={'md'}
                                    borderColor={'teal'}
                                    padding={'4'}
                                ></Text>
                            </HStack>
                            <Button
                                height={'8'}
                                width={'full'}
                                alignSelf={'end'}
                                size='md'
                                onClick={handleUpload}>
                                Upload
                            </Button>
                            {progress.started ? <Progress
                                height='2'
                                width='full'
                                colorScheme={'teal'}
                                borderRadius={6}
                                max={'100'}
                                value={progress.pc} />
                                : <Progress
                                    height='2'
                                    width='full'
                                    colorScheme={'teal'}
                                    borderRadius={6}
                                    max={'100'}
                                    value={0} />}
                            {msg ? <Text fontSize={'18px'} textAlign="center" lineHeight={'50%'}> {msg} </Text>
                                : <Text fontSize={'18px'} textAlign="center" lineHeight={'50%'}> Choose a file to upload </Text>}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme={useColorModeValue('white.500', 'black.800')}
                            bg={useColorModeValue('teal.500', 'teal.200')}
                            _hover={{ bg: useColorModeValue('teal.200', 'teal.500') }}
                            mr={3}
                            onClick={onCloseInfo}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default ImportModal;
