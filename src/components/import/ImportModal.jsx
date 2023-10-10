import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    List,
    ListIcon,
    ListItem,
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
    useToast,
    VStack,
} from '@chakra-ui/react';
import { BiCheckCircle, BiSolidFileImport, BiTrash } from "react-icons/bi";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CustomTooltip from '../CustomTooltip';
import { InfoIcon } from '@chakra-ui/icons';



const ImportModal = (props) => {

    const maxFiles = 1;
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const [msg, setMsg] = useState(null);
    const [files, setFiles] = useState([]);
    const toast = useToast();
    const toastId = "toast-import";

    const onDrop = useCallback(newFiles => {
        if (newFiles?.length) {
            // Check if a file provided was already uploaded
            for (let i = 0; i < newFiles.length; i++) {
                if (files.some((file) => file.name === newFiles[i].name)) {
                    if (!toast.isActive(toastId)) {
                        toast({
                            id: toastId,
                            title: 'Error!',
                            description: `File was already uploaded.`,
                            status: 'error',
                            duration: 7000,
                            isClosable: true,
                        });
                    }
                    return;
                }
            }

            // Check if the number of files is not too big
            if (files.length + newFiles.length > maxFiles) {
                if (!toast.isActive(toastId)) {
                    toast({
                        id: toastId,
                        title: 'Error!',
                        description: `You can only upload up to ${maxFiles} files.`,
                        status: 'error',
                        duration: 7000,
                        isClosable: true,
                    });
                }
                return;
            }

            setFiles(previousFiles => [
                ...previousFiles,
                ...newFiles])
        }
    }, [files])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
        },
        maxSize: 1024 * 1000
    })

    const removeFile = name => {
        console.log(`${name} is being removed`);
        setFiles(files => files.filter(file => file.name !== name))
    }

    function handleUpload() {
        for (let i = 0; i < files.length; i++) {
            console.log(files[i].name);
            uploadFile(files[i]);
        }
    }

    function uploadFile(fileToUpload) {
        if (!fileToUpload) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);
        console.log(props.projectId);

        setMsg("Uploading...");
        setProgress(prevState => {
            return { ...prevState, started: true }
        })
        fetch(`http://localhost:8080/api/${props.projectId}/upload/`, {
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
                onCloseInfo();
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
                    <ModalHeader>
                        <>
                            Upload files
                            <CustomTooltip
                                label={"You can upload a .csv file or a group of .xmcda files. [Optionally there should be info about the format of the files contents]"}
                                openDelay={200} >
                                <InfoIcon minH={'4'} minW={'4'} ml={2} mb={1} />
                            </CustomTooltip>
                        </>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <form>
                            <Box
                                borderWidth={'2px'}
                                borderRadius={'md'}
                                borderColor={'teal'}
                                padding={'4'}
                                _hover={{ bg: 'teal.500', color: 'white', cursor: 'pointer' }} >
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <Text
                                                textAlign={'center'}
                                                padding={'4'}
                                            > Drop files here </Text> :
                                            <Text
                                                textAlign={'center'}
                                                padding={'4'}
                                            > Choose files to import </Text>
                                    }
                                </div>
                            </Box>


                            {files.length != 0
                                ? <Box mt={10}>
                                    <Heading size={'md'}>
                                        Accepted files:
                                    </Heading>
                                    <List spacing={1}>
                                        {files.map(file => (
                                            <ListItem key={file.name}>
                                                <HStack>
                                                    <ListIcon as={BiCheckCircle} color='green.500' />
                                                    <Text>{file.name}</Text>
                                                    <IconButton
                                                        aria-label='Delete'
                                                        padding={'2'}
                                                        background={'transparent'}
                                                        borderRadius={'full'}
                                                        icon={<Icon as={BiTrash} minH={'4'} minW={'4'}
                                                            color={useColorModeValue('red.500', 'red.200')} />}
                                                        onClick={() => removeFile(file.name)}
                                                    />
                                                </HStack>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                                : <span>&nbsp;&nbsp;</span>}
                        </form>
                        <Button
                            height={'8'}
                            width={'full'}
                            alignSelf={'end'}
                            size={'md'}
                            mt={10}
                            onClick={handleUpload}>
                            Upload
                        </Button>
                        {progress.started ? <Progress
                            height='2'
                            width='full'
                            colorScheme={'teal'}
                            borderRadius={6}
                            max={'100'}
                            mt={5}
                            value={progress.pc} />
                            : <span>&nbsp;&nbsp;</span>}

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
