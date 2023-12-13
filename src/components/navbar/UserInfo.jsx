import {
    Box,
    Button,
    Icon,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import Avatar from "boring-avatars";
import { BiSolidUser, BiUser, } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage.jsx";


const UserInfo = (props) => {

    const navigate = useNavigate();
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');

    const logout = () => {
        fetch(`${import.meta.env.VITE_BACKEND}/api/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then(() => {
            setAuth(false);
            props.onLogout();
        });
    }


    return (
        <Popover placement='bottom-start' arrowSize={'20'} offset={[0, 16]}>
            {({ isOpen, _ }) => (
                <>
                    <PopoverTrigger>
                        <IconButton
                            aria-label={'user-icon'}
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
                                spacing={'1rem'}
                                py={4}>

                                <Box
                                    borderWidth={6}
                                    borderRadius={90}
                                    borderColor={'teal.200'}>
                                    <Avatar
                                        size={80}
                                        name={`${props.userEmail}`}
                                        variant={"beam"}
                                        colors={["#FAF089", "#319795", "#FEB2B2", "#E53E3E", "#D69E2E"]} />
                                </Box>


                                <Text fontSize={'24px'} textAlign="center" lineHeight={'80%'}>
                                    {props.userName} {props.userSurname}
                                </Text>

                                <Button
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    mt={2}
                                    size={'md'}
                                    onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}>
                                    Logout
                                </Button>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )
            }
        </Popover>
    )
};
export default UserInfo;
