import {
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    IconButton,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Switch,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { BiCheckCircle, BiSolidFileImport, BiTrash } from "react-icons/bi";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CustomTooltip from '../CustomTooltip';
import { InfoIcon } from '@chakra-ui/icons';



const ImportModal = (props) => {

    const maxFiles = 3;
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const [uploading, setUploading] = useState(false);
    const [csvFiles, setCsvFiles] = useState([]);
    const [xmlFiles, setXmlFiles] = useState([]);
    const toast = useToast();
    const toastId = "toast-import";
    const [uploadXml, setUploadXml] = useState(true);

    const handleCsvDrop = useCallback(newFiles => {
        if (newFiles?.length) {
            // Check if a file provided was already uploaded
            for (let i = 0; i < newFiles.length; i++) {
                if (csvFiles.some((file) => file.name === newFiles[i].name)) {
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
            if (csvFiles.length + newFiles.length > 1) {
                if (!toast.isActive(toastId)) {
                    toast({
                        id: toastId,
                        title: 'Error!',
                        description: `You can only upload one csv file.`,
                        status: 'error',
                        duration: 7000,
                        isClosable: true,
                    });
                }
                return;
            }

            setCsvFiles(previousFiles => [
                ...previousFiles,
                ...newFiles])
        }
    }, [csvFiles])

    const handleXmlDrop = useCallback(newFiles => {
        if (newFiles?.length) {
            // Check if a file provided was already uploaded
            for (let i = 0; i < newFiles.length; i++) {
                if (xmlFiles.some((file) => file.name === newFiles[i].name)) {
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
            if (xmlFiles.length + newFiles.length > maxFiles) {
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

            setXmlFiles(previousFiles => [
                ...previousFiles,
                ...newFiles])
        }
    }, [xmlFiles])

    const {
        getRootProps: getCsvRootProps,
        getInputProps: getCsvInputProps,
        isDragActive: isCsvDragActive,
    } = useDropzone({
        onDrop: (newFiles) => handleCsvDrop(newFiles),
        accept: {
            'text/csv': ['.csv'],
        },
        maxSize: 1024 * 1000,
    });

    const {
        getRootProps: getXmlRootProps,
        getInputProps: getXmlInputProps,
        isDragActive: isXmlDragActive,
    } = useDropzone({
        onDrop: (newFiles) => handleXmlDrop(newFiles),
        accept: {
            'text/xml': ['.xml'],
        },
        maxSize: 1024 * 1000,
    });

    const removeFile = (name, isCsv) => {
        if (isCsv) {
            setCsvFiles((csvFiles) => csvFiles.filter((file) => file.name !== name));
        } else {
            setXmlFiles((xmlFiles) => xmlFiles.filter((file) => file.name !== name));
        }
    };

    function handleUpload() {
        if (!uploadXml) {
            uploadFiles(xmlFiles)
        }
        else {
            uploadFiles(csvFiles);
        }
    }

    function uploadFiles(filesToUpload) {
        if (!filesToUpload.length) {
            return;
        }

        const formData = new FormData();
        filesToUpload.forEach((file, index) => {
            formData.append(`file`, file);
        });

        setUploading(true);
        fetch(`http://localhost:8080/api/projects/${props.projectId}/upload/`, {
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
                setUploading(false);
                onCloseInfo();
                window.location.reload();
            })
            .catch((error) => {
                if (!toast.isActive(toastId)) {
                    toast({
                        id: toastId,
                        title: 'Error!',
                        description: `Error while uploading files: ${error}`,
                        status: 'error',
                        duration: 7000,
                        isClosable: true,
                    });
                }
                setUploading(false);
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
                    leftIcon={<BiSolidFileImport />}
                    onClick={onOpenInfo} >
                    Import from file
                </Button>
                : <IconButton
                    colorScheme={'teal'}
                    icon={<BiSolidFileImport />}
                    onClick={onOpenInfo} >
                </IconButton>}


            <Modal isOpen={isOpenInfo} onClose={onCloseInfo}>
                <ModalOverlay />
                <ModalContent margin={10}>
                    <ModalHeader>
                        <>
                            Upload files
                            <CustomTooltip
                                label={"You can upload a .csv file or a group of .xmcda files. [TODO: Optionally there should be info about the format of the files contents]"}
                                openDelay={200} >
                                <InfoIcon minH={'4'} minW={'4'} ml={2} mb={1} />
                            </CustomTooltip>
                        </>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <HStack mb={'8'}>
                            <Text color={uploadXml ? 'gray' : 'teal.300'}>
                                XMCDA
                            </Text>
                            <Switch
                                colorschemechecked={'teal'}
                                colorschemeunchecked={'teal'}
                                defaultChecked={uploadXml}
                                onChange={() => setUploadXml(!uploadXml)}
                            />
                            <Text color={uploadXml ? 'teal.300' : 'gray'}>
                                CSV
                            </Text>
                        </HStack>

                        {uploadXml ?
                            // Upload csv
                            <form>
                                <Box
                                    borderWidth={'2px'}
                                    borderRadius={'md'}
                                    borderColor={'teal'}
                                    padding={'4'}
                                    mb={6}
                                    _hover={{ bg: 'teal.500', color: 'white', cursor: 'pointer' }} >
                                    <div {...getCsvRootProps()}>
                                        <input {...getCsvInputProps()} />
                                        {
                                            isCsvDragActive ?
                                                <Text
                                                    textAlign={'center'}
                                                    padding={'4'}
                                                > Drop files here </Text> :
                                                <Text
                                                    textAlign={'center'}
                                                    padding={'4'}
                                                > Choose file to import </Text>
                                        }
                                    </div>
                                </Box>


                                {csvFiles.length != 0
                                    ? <Box mb={6}>
                                        <Heading size={'md'}>
                                            Accepted files:
                                        </Heading>
                                        <List spacing={1}>
                                            {csvFiles.map(file => (
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
                                                            onClick={() => removeFile(file.name, true)}
                                                        />
                                                    </HStack>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    : <span>&nbsp;&nbsp;</span>}
                            </form>
                            :
                            // Upload xml
                            <form>
                                <Box
                                    borderWidth={'2px'}
                                    borderRadius={'md'}
                                    borderColor={'teal'}
                                    padding={'4'}
                                    mb={6}
                                    _hover={{ bg: 'teal.500', color: 'white', cursor: 'pointer' }} >
                                    <div {...getXmlRootProps()}>
                                        <input {...getXmlInputProps()} />
                                        {
                                            isXmlDragActive ?
                                                <Text
                                                    textAlign={'center'}
                                                    padding={'4'}
                                                > Drop files here </Text> :
                                                <Text
                                                    textAlign={'center'}
                                                    padding={'4'}
                                                >Choose files to import</Text>
                                        }
                                    </div>
                                </Box>

                                {xmlFiles.length != 0
                                    ? <Box mb={6}>
                                        <Heading size={'md'}>
                                            Accepted files:
                                        </Heading>
                                        <List spacing={1}>
                                            {xmlFiles.map(file => (
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
                                                            onClick={() => removeFile(file.name, false)}
                                                        />
                                                    </HStack>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    : <span>&nbsp;&nbsp;</span>}
                            </form>
                        }

                        <Button
                            height={'12'}
                            width={'full'}
                            alignSelf={'end'}
                            size={'md'}
                            mb={6}
                            onClick={handleUpload}
                            disabled={uploading} >
                            {uploading ? (
                                <>
                                    Uploading...
                                    <Spinner
                                        color={'teal'}
                                        ml={2}
                                    />
                                </>
                            ) : (
                                'Upload Files'
                            )}
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};
export default ImportModal;
