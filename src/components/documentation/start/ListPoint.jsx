import { Flex, ListIcon, Text } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const ListPoint = ({children}) => {
    return (
        <Flex direction={'row'}>
            <ListIcon as={MdCheckCircle} mt={1} color={'teal.200'}/>
            <Text>
                {children}
            </Text>
        </Flex>
    )
}

export default ListPoint;