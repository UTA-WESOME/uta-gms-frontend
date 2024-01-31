import { Box, Card, CardBody,  CardHeader, Heading, Link as ChakraLink, Text, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const XMCDA = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Text my={5}>
                <b>XMCDA</b> is a data standard used to represent MCDA data elements such as lists of alternatives or criteria.
                Each element is described in a separate <b>XML</b> file. The latest version of the standard, <i>version 4.0.0</i>, is
                used in the application to import and export data.
            </Text>

            <Text my={5}>
                The minimum number of files a user can upload is two: a file containing the list of alternatives and a file
                containing the list of criteria. The performance table will then be filled with zeros and the criteria will
                be of type gain by default. If a user wants to upload the performance table information, they can use a performance
                table file that fills in the values of the alternatives on the criteria. Each alternative and criterion has an ID
                that must be the same in all uploaded files. If any of the IDs don't match, the import will stop. Other files that
                can be uploaded are criteria values and criteria scales files. The first is used to define the number of linear
                segments of criteria utility functions. The second determines the direction of preference for each criterion. If
                the direction is max, then the type of criterion is <i>gain</i>. If it is min, then the type is <i>cost</i>. File that allows
                the user to pass preference data is alternatives values file. The file contains information about the preference
                ranking of the selected alternatives.
            </Text>

            <Text my={5}>
                All of the above can also be exported. Another file that is exported is the criteria functions file. It contains
                the utility functions for each criterion. If categories are defined, a separate file is created for each category.
            </Text>

            <Text my={5}>
                Below are sample files that could be used for a problem similar to the one defined in the <b>CSV</b> section.
            </Text>

            <Card my={5}>
                <CardHeader mb={-5}>
                    <Heading size='sm'>Alternatives</Heading>
                </CardHeader>
                <CardBody>
                    <Text noOfLines={1} ml={0}>{'<xmcda xmlns="http://www.decision-deck.org/2021/XMCDA-4.0.0">'}</Text>
                    <Text noOfLines={1} ml={8}>{'<alternatives>'}</Text>
                    <Text noOfLines={1} ml={16}>{'<alternative id="194" name="Joel Embiid">'}</Text>
                    <Text noOfLines={1} ml={24}>{'<type>real</type>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<active>true</active>'}</Text>
                    <Text noOfLines={1} ml={16}>{'</alternative>'}</Text>
                    <Text noOfLines={1} ml={16}>{'...'}</Text>
                    <Text noOfLines={1} ml={8}>{'</alternatives>'}</Text>
                    <Text noOfLines={1} ml={0}>{'</xmcda>'}</Text>
                </CardBody>
            </Card>

            <Text my={5}>
                The list of alternatives is stored in an <b>alternatives</b> tag. Each alternative has its own name and id,
                which must be unique for a set of files describing a project. Additional information that can be included in
                an alternative tag is the type and whether the alternative is active. Type can be real or fictive. For the
                problems considered in the app, the type should be real and the alternative should be active.
            </Text>

            <Card my={5}>
                <CardHeader mb={-5}>
                    <Heading size='sm'>Criteria</Heading>
                </CardHeader>
                <CardBody>
                    <Text noOfLines={1} ml={0}>{'<xmcda xmlns="http://www.decision-deck.org/2021/XMCDA-4.0.0">'}</Text>
                    <Text noOfLines={1} ml={8}>{'<criteria>'}</Text>
                    <Text noOfLines={1} ml={16}>{'<criterion id="168" name="PTS">'}</Text>
                    <Text noOfLines={1} ml={24}>{'<active>true</active>'}</Text>
                    <Text noOfLines={1} ml={16}>{'</criterion>'}</Text>
                    <Text noOfLines={1} ml={16}>{'...'}</Text>
                    <Text noOfLines={1} ml={8}>{'</criteria>'}</Text>
                    <Text noOfLines={1} ml={0}>{'</xmcda>'}</Text>
                </CardBody>
            </Card>

            <Text my={5}>
                The <b>criteria</b> tag stores a list of all the criteria used in the problem. Similar to alternatives,
                each criterion is described by a unique id and name. The additional tag <b>active</b> is responsible for
                taking the criterion into account when importing the file.
            </Text>

            <Card my={5}>
                <CardHeader mb={-5}>
                    <Heading size='sm'>Criteria scales</Heading>
                </CardHeader>
                <CardBody>
                    <Text noOfLines={1} ml={0}>{'<xmcda xmlns="http://www.decision-deck.org/2021/XMCDA-4.0.0">'}</Text>
                    <Text noOfLines={1} ml={8}>{'<criteriaScales>'}</Text>
                    <Text noOfLines={1} ml={16}>{'<criterionScales>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<criterionID>168</criterionID>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<scales>'}</Text>
                    <Text noOfLines={1} ml={32}>{'<scale>'}</Text>
                    <Text noOfLines={1} ml={40}>{'<quantitative>'}</Text>
                    <Text noOfLines={1} ml={48}>{'<preferenceDirection>max</preferenceDirection>'}</Text>
                    <Text noOfLines={1} ml={40}>{'</quantitative>'}</Text>
                    <Text noOfLines={1} ml={32}>{'</scale>'}</Text>
                    <Text noOfLines={1} ml={24}>{'</scales>'}</Text>
                    <Text noOfLines={1} ml={16}>{'</criterionScales>'}</Text>
                    <Text noOfLines={1} ml={16}>{'...'}</Text>
                    <Text noOfLines={1} ml={8}>{'</criteriaScales>'}</Text>
                    <Text noOfLines={1} ml={0}>{'</xmcda>'}</Text>
                </CardBody>
            </Card>

            <Text my={5}>
                Criteria scales are used to determine the direction of preference. In UTA-GMS, each criterion must be of
                the type either gain or cost. The value max in the <b>preferenceDirection</b> tag means that the criterion
                is of type gain. On the other hand, value min means that the criterion is of type cost.
            </Text>

            <Card my={5}>
                <CardHeader mb={-5}>
                    <Heading size='sm'>Criteria segments</Heading>
                </CardHeader>
                <CardBody>
                    <Text noOfLines={1} ml={0}>{'<xmcda xmlns="http://www.decision-deck.org/2021/XMCDA-4.0.0">'}</Text>
                    <Text noOfLines={1} ml={8}>{'<criteriaValues>'}</Text>
                    <Text noOfLines={1} ml={16}>{'<criterionValues>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<criterionID>168</criterionID>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<values>'}</Text>
                    <Text noOfLines={1} ml={32}>{'<value>'}</Text>
                    <Text noOfLines={1} ml={40}>{'<integer>3</integer>'}</Text>
                    <Text noOfLines={1} ml={32}>{'</value>'}</Text>
                    <Text noOfLines={1} ml={24}>{'</values>'}</Text>
                    <Text noOfLines={1} ml={16}>{'</criterionValues>'}</Text>
                    <Text noOfLines={1} ml={16}>{'...'}</Text>
                    <Text noOfLines={1} ml={8}>{'</criteriaValues>'}</Text>
                    <Text noOfLines={1} ml={0}>{'</xmcda>'}</Text>
                </CardBody>
            </Card>

            <Text my={5}>
                Tag <b>criteriaValues</b> can be used for a variety of purposes. In the app, it is used to define the
                number of linear segments in utility functions for each criterion. If the value is equal to 0, then
                the general function is used for the criterion.
            </Text>

            <Card my={5}>
                <CardHeader mb={-5}>
                    <Heading size='sm'>Performance table</Heading>
                </CardHeader>
                <CardBody>
                    <Text noOfLines={1} ml={0}>{'<xmcda xmlns="http://www.decision-deck.org/2021/XMCDA-4.0.0">'}</Text>
                    <Text noOfLines={1} ml={8}>{'<performanceTable mcdaConcept="REAL">'}</Text>
                    <Text noOfLines={1} ml={16}>{'<alternativePerformances>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<alternativeID>194</alternativeID>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<performance>'}</Text>
                    <Text noOfLines={1} ml={32}>{'<criterionID>168</criterionID>'}</Text>
                    <Text noOfLines={1} ml={32}>{'<values>'}</Text>
                    <Text noOfLines={1} ml={40}>{'<value>'}</Text>
                    <Text noOfLines={1} ml={48}>{'<real>34.2</real>'}</Text>
                    <Text noOfLines={1} ml={40}>{'</value>'}</Text>
                    <Text noOfLines={1} ml={32}>{'</values>'}</Text>
                    <Text noOfLines={1} ml={24}>{'</performance>'}</Text>
                    <Text noOfLines={1} ml={24}>{'...'}</Text>
                    <Text noOfLines={1} ml={16}>{'</alternativePerformances>'}</Text>
                    <Text noOfLines={1} ml={16}>{'...'}</Text>
                    <Text noOfLines={1} ml={8}>{'</performanceTable>'}</Text>
                    <Text noOfLines={1} ml={0}>{'</xmcda>'}</Text>
                </CardBody>
            </Card>

            <Text my={5}>
                Performance table is stored in the <b>performanceTable</b> tag. It consists of a list of
                <b>alternativePerformances</b> tags containing the alternative's id and a list of values for
                each criterion. The given example shows that the value of alternative 194 on criterion 168
                is 34.2. A similar scheme is repeated for each criterion and each alternative, so the file is
                usually larger than the previous ones.
            </Text>

            <Card my={5}>
                <CardHeader mb={-5}>
                    <Heading size='sm'>Reference ranking</Heading>
                </CardHeader>
                <CardBody>
                    <Text noOfLines={1} ml={0}>{'<xmcda xmlns="http://www.decision-deck.org/2021/XMCDA-4.0.0">'}</Text>
                    <Text noOfLines={1} ml={8}>{'<alternativesValues>'}</Text>
                    <Text noOfLines={1} ml={16}>{'<alternativeValues>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<alternativeID>194</alternativeID>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<values>'}</Text>
                    <Text noOfLines={1} ml={32}>{'<value>'}</Text>
                    <Text noOfLines={1} ml={40}>{'<integer>1</integer>'}</Text>
                    <Text noOfLines={1} ml={32}>{'</value>'}</Text>
                    <Text noOfLines={1} ml={24}>{'</values>'}</Text>
                    <Text noOfLines={1} ml={16}>{'</alternativeValues>'}</Text>
                    <Text noOfLines={1} ml={16}>{'...'}</Text>
                    <Text noOfLines={1} ml={8}>{'</alternativesValues>'}</Text>
                    <Text noOfLines={1} ml={0}>{'</xmcda>'}</Text>
                </CardBody>
            </Card>

            <Text my={5}>
                <b>AlternativesValues</b> tag can be used for many different purposes. In the app, it is used to
                store information about preference ranking created by the user. Values assigned to alternatives
                represent their positions in the ranking.
            </Text>

            <Card my={5}>
                <CardHeader mb={-5}>
                    <Heading size='sm'>Utility functions</Heading>
                </CardHeader>
                <CardBody>
                    <Text noOfLines={1} ml={0}>{'<xmcda xmlns="http://www.decision-deck.org/2021/XMCDA-4.0.0">'}</Text>
                    <Text noOfLines={1} ml={8}>{'<criteriaFunctions>'}</Text>
                    <Text noOfLines={1} ml={16}>{'<criterionFunctions>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<criterionID>168</criterionID>'}</Text>
                    <Text noOfLines={1} ml={24}>{'<functions>'}</Text>
                    <Text noOfLines={1} ml={32}>{'<function>'}</Text>
                    <Text noOfLines={1} ml={40}>{'<piecewiseLinear>'}</Text>
                    <Text noOfLines={1} ml={48}>{'<segment>'}</Text>
                    <Text noOfLines={1} ml={56}>{'<head>'}</Text>
                    <Text noOfLines={1} ml={64}>{'<abscissa>'}</Text>
                    <Text noOfLines={1} ml={72}>{'<real>25.2</real>'}</Text>
                    <Text noOfLines={1} ml={64}>{'</abscissa>'}</Text>
                    <Text noOfLines={1} ml={64}>{'<ordinate>'}</Text>
                    <Text noOfLines={1} ml={72}>{'<real>0.0</real>'}</Text>
                    <Text noOfLines={1} ml={64}>{'</ordinate>'}</Text>
                    <Text noOfLines={1} ml={56}>{'</head>'}</Text>
                    <Text noOfLines={1} ml={56}>{'<tail>'}</Text>
                    <Text noOfLines={1} ml={64}>{'<abscissa>'}</Text>
                    <Text noOfLines={1} ml={72}>{'<real>28.2</real>'}</Text>
                    <Text noOfLines={1} ml={64}>{'</abscissa>'}</Text>
                    <Text noOfLines={1} ml={64}>{'<ordinate>'}</Text>
                    <Text noOfLines={1} ml={72}>{'<real>0.5</real>'}</Text>
                    <Text noOfLines={1} ml={64}>{'</ordinate>'}</Text>
                    <Text noOfLines={1} ml={56}>{'</tail>'}</Text>
                    <Text noOfLines={1} ml={48}>{'</segment>'}</Text>
                    <Text noOfLines={1} ml={48}>{'...'}</Text>
                    <Text noOfLines={1} ml={40}>{'</piecewiseLinear>'}</Text>
                    <Text noOfLines={1} ml={32}>{'</function>'}</Text>
                    <Text noOfLines={1} ml={24}>{'</functions>'}</Text>
                    <Text noOfLines={1} ml={16}>{'</criterionFunctions>'}</Text>
                    <Text noOfLines={1} ml={16}>{'...'}</Text>
                    <Text noOfLines={1} ml={8}>{'</criteriaFunctions>'}</Text>
                    <Text noOfLines={1} ml={0}>{'</xmcda>'}</Text>
                </CardBody>
            </Card>

            <Text my={5}>
                Utility function is represented as a list of linear segments. Each segment is defined by a head
                and a tail. Head is a point where the segment begins and tail is a point where the segment ends.
                Each point has an abscissa and an ordinate, which in the method are the value of a criterion and
                the utility of that value. The file stores the information about each utility function of each
                criterion. When the data is exported from the application, one of these files is created for each category.
            </Text>

            <Text my={5}>
                For more information, be sure to visit {" "}
                <ChakraLink
                    href="https://www.decision-deck.org/xmcda/"
                    color="teal.500"
                    isExternal
                >
                    <b>the official XMCDA website.</b>
                </ChakraLink>
            </Text>

        </Box>
    )
}

export default XMCDA;