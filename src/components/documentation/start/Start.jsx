import { Box, Divider, Heading, List, ListItem, Text } from "@chakra-ui/react";
import DocumentationHeading from "../DocumentationHeading.jsx";
import ListPoint from "./ListPoint.jsx";

const Start = () => {
    return (
        <Box>
            <Heading>Welcome to the official documentation 🧾</Heading>
            <Divider my={2}/>
            <Text my={5} textAlign={'justify'}>
                This is the official documentation for the UTA-GMS application. The application was written as part
                of <Text as={'b'}>DECISION SUPPORT SYSTEM BASED ON ROBUSTNESS
                ANALYSIS METHODS FOR PREFERENCE DISAGGREGATION</Text> bachelor thesis at the Poznań University of
                Technology in 2024 by Jakub Beisert, Filip Marciniak,
                Szymon Pasternak, Jakub Żytliński. The supervisor of the work was Miłosz Kadziński.
                The application allows users to model problems from the UTA family and then solve them using the UTA-GMS
                method.
            </Text>

            <DocumentationHeading id={'main-features'} as={'h3'} size={'lg'}>Main features of the UTA-GMS
                application</DocumentationHeading>
            <Divider my={2}/>
            <List spacing={3} my={5}>
                <ListPoint>
                    The use of a preference model in the form of an additive value function,
                </ListPoint>
                <ListPoint>
                    The user can enter a predefined number of linear sections for each criterion or use a general
                    function,
                </ListPoint>
                <ListItem>
                    <ListPoint>
                        As part of the information preference, the user can provide:
                    </ListPoint>
                    <List spacing={3} ml={5} my={2}>
                        <ListPoint>
                            pairwise comparisons or reference ranking,
                        </ListPoint>
                        <ListPoint>
                            preference intensities,
                        </ListPoint>
                        <ListPoint>
                            requirements regarding the places of given alternatives in the final ranking.
                        </ListPoint>
                    </List>
                </ListItem>
                <ListPoint>
                    As part of the robustness analysis, the system presents information about possible and necessary
                    relations between alternatives in the form of a matrix and Hasse graph,
                </ListPoint>
                <ListPoint>
                    The system informs the user about detected inconsistencies within the entered information
                    preference. It eliminates a minimum subset of inconsistent preferential information and
                    present all possible subsets of inconsistencies to the user,
                </ListPoint>
                <ListPoint>
                    Presentation of results for a representative value function in the form of a ranking and function
                    graphs,
                </ListPoint>
                <ListPoint>
                    Possibility to define a hierarchy of criteria in the form of a category tree,
                </ListPoint>
                <ListPoint>
                    Possibility to import and export of data to CSV and XMCDA version 4.0,
                </ListPoint>
                <ListPoint>
                    As part of stochastic ordinal regression analysis, the system analyzes a set of functions
                    consistent with the decision-maker's preferences and present acceptability indices and pairwise
                    winning acceptability indices.
                </ListPoint>
            </List>
        </Box>
    )
}
export default Start;