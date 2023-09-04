import {
    Box,
    Button,
    Icon,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    useColorModeValue,
} from '@chakra-ui/react';
import { BiSolidUser, BiUser, } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./utils/useLocalStorage.jsx";


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
        <Popover placement='bottom'>
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
                            <PopoverHeader>{props.userName} {props.userSurname}</PopoverHeader>
                            <PopoverBody>
                                <Box>
                                    {props.userEmail}
                                </Box>
                                <Button
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}
                                >
                                    Logout
                                </Button>
                            </PopoverBody>
                            <PopoverFooter>This is the footer</PopoverFooter>
                        </PopoverContent>
                    </>
                )
                }
            </Popover >
    )
};
export default UserInfo;
