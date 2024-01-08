import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon, } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Collapse,
    Flex,
    Icon,
    IconButton,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage.jsx";
import ToggleColorMode from "./ToggleColorMode.jsx";
import UserInfo from './UserInfo.jsx';

export default function Navbar(props) {

    const { isOpen, onToggle } = useDisclosure();
    const [loaded, setLoaded] = useState(false);
    const [getAuth, setAuth, _] = useLocalStorage('auth');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(() => {
        handleUserData();
    }, []);

    const handleLogout = () => {
        setUser([]);
        setLoaded(false);
        props.toggleRefresh(false);
    }

    const handleUserData = () => {
        if (!loaded) {
            fetch(`${import.meta.env.VITE_BACKEND}/api/user`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }).then(response => {
                if (!response.ok) {
                    setAuth(false);
                    throw new Error("response not ok")
                }
                return response.json();
            }).then(data => {
                setUser(data);
                setLoaded(true);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    let buttons;
    if (getAuth() !== true) {
        buttons = (
            <>
                <Button
                    fontSize={'sm'}
                    fontWeight={400}
                    onClick={() => navigate("/signin")}
                >
                    Sign In
                </Button>
                <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    colorScheme={"teal"}
                    onClick={() => navigate("/signup")}
                >
                    Sign Up
                </Button>
            </>
        )
    } else {
        handleUserData();
        buttons = (
            <UserInfo userName={user.name} userSurname={user.surname} userEmail={user.email} onLogout={handleLogout}/>
        )
    }


    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <IconButton
                        aria-label={'UTA-GMS'}
                        variant={'link'}
                        icon={
                            <div>
                                <img src="/logo_text.svg" alt="UTA-GMS"/>
                            </div>
                        }
                        w={'90px'}
                        h={'20px'}
                        mb={2}
                        onClick={() => navigate("/")}>
                    </IconButton>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav/>
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={{ base: 2, lg: 3, xl: 4 }}
                >
                    <ToggleColorMode/>
                    {buttons}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav/>
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const navigate = useNavigate();

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                onClick={() => navigate(navItem.href ?? '#')}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    const navigate = useNavigate();
    return (
        <Box
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('teal.50', 'gray.900'), cursor: 'pointer'}}
            onClick={() => navigate(href)}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'teal.500' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'teal.100'} w={5} h={5} as={ChevronRightIcon}/>
                </Flex>
            </Stack>
        </Box>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                onClick={() => navigate(href ?? '#')}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box onClick={() => navigate(child.href)} key={child.label} py={2}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'My projects',
        href: '/projects',
    },
    {
        label: 'About',
        children: [
            {
                label: 'About UTA-GMS',
                subLabel: 'Learn about the method',
                href: '/documentation/start'
            },
            {
                label: 'Tutorial',
                subLabel: 'Learn how to use the UTA-GMS app',
                href: '/documentation/project'
            },
            {
                label: 'XMCDA v4.0',
                subLabel: 'Learn about XMCDA v4.0 format',
                href: '/documentation/import-and-export',
            },
            {
                label: 'Contact',
                subLabel: 'Contact contributors and view source',
                href: '/documentation/contact',
            }
        ]
    },

];