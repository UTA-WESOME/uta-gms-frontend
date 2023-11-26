import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InconsistenciesGroup from "./InconsistenciesGroup.jsx";

const InconsistenciesTab = ({ inconsistencies }) => {

    const [groups, setGroups] = useState([...new Set(inconsistencies.map(i => i.group))])

    useEffect(() => {
        setGroups([...new Set(inconsistencies.map(i => i.group))])
    }, [inconsistencies])


    return (
        <Box textAlign={'center'} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={3}>
                Detected inconsistencies
            </Heading>
            <Center>
                <Text>To allow the system to work properly, select one of the groups listed below and then remove the
                    preferences listed in it.</Text>
            </Center>
            <>
                {groups.map((group, index) => (
                    <InconsistenciesGroup
                        key={index}
                        groupNumber={group}
                        inconsistencies={inconsistencies.filter(i => i.group === group)}
                    />
                ))}
            </>
        </Box>
    )
}

export default InconsistenciesTab;