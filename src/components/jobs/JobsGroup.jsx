import {
    Box,
    Icon,
    Spinner,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

const JobsGroup = ({ groupNumber, jobs }) => {
    return (
        <Box
            borderWidth={useColorModeValue('3px', '3px')}
            borderRadius={'lg'}
            mx={{ base: 0, sm: 2, md: 4, lg: 10, xl: 20, '2xl': '10%' }}
            my={5}
        >
            <Text fontSize={'xl'} mx={4} my={2}>Calculations number {groupNumber}</Text>
            <hr/>

            <TableContainer p={2}>
                <Table>
                    <TableCaption>Status of calculations for each category</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Category</Th>
                            <Th>ready</Th>
                            <Th>created at</Th>
                            <Th>finished at</Th>
                            <Th>actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {jobs.map((job, index) => (
                            <Tr key={index}>
                                <Td>{job.name}</Td>
                                <Td>
                                    {job.ready ?
                                        <Icon as={FaCheck} color={'teal'} ml={3}/>
                                        :
                                        <Spinner ml={3} color={'orange'} size={'sm'}/>
                                    }
                                </Td>
                                <Td>{job.created_at.replace('T', ' ').split('.')[0]}</Td>
                                <Td>
                                    {job.ready ?
                                        job.finished_at.replace('T', ' ').split('.')[0]
                                        :
                                        'Not ready yet!'
                                    }
                                </Td>
                                <Td>actions</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default JobsGroup;