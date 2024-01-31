import { Heading, Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const DocumentationHeading = ({ id, as, size, children, my = 0, p = 0 }) => {

    const [hovering, setHovering] = useState(false);

    return (
        <Heading
            id={id}
            as={as}
            size={size}
            my={my}
            p={p}
            onMouseOver={() => setHovering(true)}
            onMouseOut={() => setHovering(false)}
        >
            {children}
            <ChakraLink
                as={ReactRouterLink}
                to={`#${id}`}
                color={useColorModeValue('teal.200', 'teal.700')}
                opacity={hovering ? 1 : 0}
                style={{ textDecoration: 'none' }}
            > #</ChakraLink>
        </Heading>
    )
}

export default DocumentationHeading;