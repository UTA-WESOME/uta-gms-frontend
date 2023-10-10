import {
    Box,
    Button,
    HStack,
    Icon,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    List,
    ListIcon,
    ListItem,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Progress,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
    Heading,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { BiCheckCircle, BiSolidFileImport, BiTrash } from "react-icons/bi";
import { useCallback, useState } from 'react';


const Dropzone = ({ className }) => {

    const [files, setFiles] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles])
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
        },
        maxSize: 1024 * 1000,
        maxFiles: 1
    })

    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    return (
        <form>
            <Box
                borderWidth={'2px'}
                borderRadius={'md'}
                borderColor={'teal'}
                padding={'4'}
                _hover={{ bg: 'teal.500', color: 'white', cursor: 'pointer' }}

            >
                <div {...getRootProps({
                    className: className
                })}>
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
                ? <Box>
                    <Heading size={'md'}>
                        Accepted Files
                    </Heading>
                    <List spacing={3}>
                        {files.map(file => (
                            <ListItem key={file.name}>
                                <ListIcon as={BiCheckCircle} color='green.500' />
                                <>

                                    <Text>{file.name}</Text>
                                    <IconButton
                                        aria-label='Delete'
                                        padding={'2'}
                                        background={'transparent'}
                                        borderRadius={'full'}
                                        icon={<Icon as={BiTrash} minH={'7'} minW={'7'}
                                            color={useColorModeValue('red.500', 'red.200')} />}
                                        onClick={() => removeFile(file.name)}
                                    />
                                </>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                : <span>&nbsp;&nbsp;</span>}
        </form>
    )
};
export default Dropzone;
