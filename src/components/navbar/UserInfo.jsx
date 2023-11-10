import {
    Button,
    Icon,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { BiSolidUser, BiSolidUserCircle, BiUser, } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage.jsx";


const UserInfo = (props) => {

    const navigate = useNavigate();
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');

    const logout = () => {
        fetch(`http://localhost:8080/api/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        setAuth(false);
        props.toggleRefresh(false)
    }


    return (
        <Popover placement='bottom-start' arrowSize={'20'} offset={[0, 16]} >
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        <IconButton
                            fontSize={'sm'}
                            fontWeight={400}
                            icon={<Icon as={isOpen ? BiSolidUser : BiUser} minH={'7'} minW={'7'}
                                color={useColorModeValue('teal.500', 'teal.200')} />} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow borderRadius={'4px'} />
                        <PopoverBody>
                            <VStack
                                justify={'center'}
                                spacing={'1rem'}>
                                <Text fontSize={'24px'} textAlign="center" marginTop={'20px'} lineHeight={'80%'}>
                                    {props.userName} {props.userSurname}
                                </Text>

                                <Icon as={BiSolidUserCircle} minH={32} minW={32}
                                    color={useColorModeValue('teal.500', 'teal.200')} />

                                <Text fontSize={'24px'}textAlign="center" lineHeight={'50%'}>
                                    {props.userEmail}
                                </Text>

                                <Button
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    marginBottom={'10px'}
                                    size={'md'}
                                    onClick={() => {
                                        logout();
                                        navigate("/");
                                    }} >
                                    Logout
                                </Button>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )
            }
        </Popover >
    )
};
export default UserInfo;
