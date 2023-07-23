import {Box, Button, Container, Flex, Heading, Icon, Stack, Text, useColorModeValue,} from '@chakra-ui/react';
import {BsFillLightningChargeFill} from "react-icons/bs";
import {BiExport, BiSolidSave, BiSolidShareAlt} from "react-icons/bi";
import {MdFeedback} from "react-icons/md";


const Card = ({heading, description, icon, href}) => {
    return (
        <Box
            maxW={{base: 'full', md: '275px'}}
            w={'full'}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}>
            <Stack align={'start'} spacing={2}>
                <Flex
                    w={16}
                    h={16}
                    align={'center'}
                    justify={'center'}
                    color={useColorModeValue('gray.600', 'white.100')}
                    rounded={'full'}
                    bg={useColorModeValue('gray.100', 'gray.700')}>
                    {icon}
                </Flex>
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={'sm'}>
                        {description}
                    </Text>
                </Box>
                <Button variant={'link'} colorScheme={'teal'} size={'sm'}>
                    Learn more
                </Button>
            </Stack>
        </Box>
    );
};

export default function Features() {
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={{base: '2xl', sm: '4xl'}} fontWeight={'bold'}>
                    UTA-GMS features
                </Heading>
                <Text color={'gray.500'} fontSize={{base: 'sm', sm: 'lg'}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
                    obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
                </Text>
            </Stack>

            <Container maxW={'5xl'} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    <Card
                        heading={'Make decisions quick'}
                        icon={<Icon as={BsFillLightningChargeFill} w={8} h={8}/>}
                        description={
                            'Blazingly fast results with UTA-GMS method'
                        }
                        href={'/signup'}
                    />
                    <Card
                        heading={'Get feedback'}
                        icon={<Icon as={MdFeedback} w={8} h={8}/>}
                        description={
                            'UTA-GMS app gives feedback on dealing with inconsistency'
                        }
                        href={'#'}
                    />
                    <Card
                        heading={'Export to XMCDA'}
                        icon={<Icon as={BiExport} w={8} h={8}/>}
                        description={
                            'UTA-GMS allows to download results in XMCDA format'
                        }
                        href={'#'}
                    />
                    <Card
                        heading={'Save your projects'}
                        icon={<Icon as={BiSolidSave} w={8} h={8}/>}
                        description={
                            'Save your projects in the cloud'
                        }
                        href={'#'}
                    />
                    <Card
                        heading={'Share results'}
                        icon={<Icon as={BiSolidShareAlt} w={8} h={8}/>}
                        description={
                            'Share results with your colleagues'
                        }
                        href={'#'}
                    />
                </Flex>
            </Container>
        </Box>
    );
}