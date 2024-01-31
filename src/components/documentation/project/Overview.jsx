import {
    Box,
    Divider,
    List,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import DocumentationHeading from "../DocumentationHeading.jsx";
import ListPoint from "../start/ListPoint.jsx";

const Overview = () => {
    return (
        <Box>

            <Text my={3}>
                This section of the documentation presents an example problem and how to solve it using the UTA-GMS
                system.
            </Text>

            <Text>
                The data used for the problem, shown below, comes from the official website of the
                National Basketball Association and represents a list of 10 basketball players along
                with their statistics. The players selected are among the best in terms of points scored per game.
                Players who did not play at least ten games were excluded from the list. The data is from the 17th of
                December 2023. The criteria used to rank the players are:</Text>
            <List spacing={2} my={2}>
                <ListPoint>
                    Points (PTS),
                </ListPoint>
                <ListPoint>
                    Rebounds (REB),
                </ListPoint>
                <ListPoint>
                    Assists (AST),
                </ListPoint>
                <ListPoint>
                    Turnovers (TOV),
                </ListPoint>
                <ListPoint>
                    Plus-Minus (+/-), which is the difference in points scored and points lost by the
                    player's team when the player is on the court.
                </ListPoint>
            </List>
            <Text mb={5}>
                Each statistic is divided by the number of games the player has played, so the values are averages per
                game.
            </Text>

            <DocumentationHeading id={'performance-table'} as={'h5'} size={'md'}>
                Performance Table
            </DocumentationHeading>
            <Divider my={2}/>

            <TableContainer my={4} mx={5}>
                <Table variant={'striped'} size={'sm'}>
                    <TableCaption>Basketball dataset</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Player</Th>
                            <Th isNumeric>PTS</Th>
                            <Th isNumeric>REB</Th>
                            <Th isNumeric>AST</Th>
                            <Th isNumeric>TOV</Th>
                            <Th isNumeric>+/-</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Joel Embiid</Td>
                            <Td isNumeric>34.2</Td>
                            <Td isNumeric>11.7</Td>
                            <Td isNumeric>6.0</Td>
                            <Td isNumeric>3.8</Td>
                            <Td isNumeric>11.0</Td>
                        </Tr>
                        <Tr>
                            <Td>Luka Doncic</Td>
                            <Td isNumeric>32.7</Td>
                            <Td isNumeric>8.3</Td>
                            <Td isNumeric>9.1</Td>
                            <Td isNumeric>4.0</Td>
                            <Td isNumeric>2.3</Td>
                        </Tr>
                        <Tr>
                            <Td>Giannis Antetokounmpo</Td>
                            <Td isNumeric>31.6</Td>
                            <Td isNumeric>10.7</Td>
                            <Td isNumeric>5.0</Td>
                            <Td isNumeric>3.8</Td>
                            <Td isNumeric>5.6</Td>
                        </Tr>
                        <Tr>
                            <Td>Shai Gilgeous-Alexander</Td>
                            <Td isNumeric>30.7</Td>
                            <Td isNumeric>5.5</Td>
                            <Td isNumeric>6.4</Td>
                            <Td isNumeric>2.0</Td>
                            <Td isNumeric>9.1</Td>
                        </Tr>
                        <Tr>
                            <Td>Kevin Durant</Td>
                            <Td isNumeric>30.7</Td>
                            <Td isNumeric>6.3</Td>
                            <Td isNumeric>5.6</Td>
                            <Td isNumeric>3.4</Td>
                            <Td isNumeric>3.7</Td>
                        </Tr>
                        <Tr>
                            <Td>Stephen Curry</Td>
                            <Td isNumeric>29.0</Td>
                            <Td isNumeric>4.9</Td>
                            <Td isNumeric>4.2</Td>
                            <Td isNumeric>3.3</Td>
                            <Td isNumeric>-1.0</Td>
                        </Tr>
                        <Tr>
                            <Td>Jayson Tatum</Td>
                            <Td isNumeric>27.5</Td>
                            <Td isNumeric>8.8</Td>
                            <Td isNumeric>4.2</Td>
                            <Td isNumeric>3.2</Td>
                            <Td isNumeric>7.9</Td>
                        </Tr>
                        <Tr>
                            <Td>Nikola Jokic</Td>
                            <Td isNumeric>27.0</Td>
                            <Td isNumeric>12.4</Td>
                            <Td isNumeric>9.5</Td>
                            <Td isNumeric>2.7</Td>
                            <Td isNumeric>7.2</Td>
                        </Tr>
                        <Tr>
                            <Td>Tyrese Maxey</Td>
                            <Td isNumeric>25.6</Td>
                            <Td isNumeric>3.9</Td>
                            <Td isNumeric>6.7</Td>
                            <Td isNumeric>1.3</Td>
                            <Td isNumeric>10.8</Td>
                        </Tr>
                        <Tr>
                            <Td>LeBron James</Td>
                            <Td isNumeric>25.2</Td>
                            <Td isNumeric>7.5</Td>
                            <Td isNumeric>7.0</Td>
                            <Td isNumeric>3.4</Td>
                            <Td isNumeric>4.1</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>

            <DocumentationHeading id={'categories'} as={'h5'} size={'md'}>
                Categories
            </DocumentationHeading>
            <Divider my={2}/>

            <Text mb={5}>The criteria can be broken down into two categories. The first category, <b>Individual</b>,
                consists
                of PTS, REB, and TOV. The other category, <b>Team</b>, is made up of the remaining criteria, which
                reward players who make a positive impact on the team they play for. By dividing the problem into parts,
                the results are calculated for all criteria in general and for each category.</Text>

            <DocumentationHeading id={'categories'} as={'h5'} size={'md'}>
                Preferences
            </DocumentationHeading>
            <Divider my={2}/>

            <Text my={4}>Preferences defined for the problem are pairwise comparisons, intensities, and best and worst
                positions a player can take.</Text>
            <List spacing={2}>
                <ListPoint>
                    Pairwise comparisons
                    <List spacing={1} my={1}>
                        <ListPoint>
                            U<sub>General</sub>(Joel Embiid) &gt; U<sub>General</sub>(Stephen Curry)
                        </ListPoint>
                        <ListPoint>
                            U<sub>General</sub>(Nikola Jokic) &gt; U<sub>General</sub>(Tyrese Maxey)
                        </ListPoint>
                        <ListPoint>
                            U<sub>General</sub>(Nikola Jokic) &ge; U<sub>General</sub>(Stephen Curry)
                        </ListPoint>
                        <ListPoint>
                            U<sub>General</sub>(Nikola Jokic) &gt; U<sub>General</sub>(Jayson Tatum)
                        </ListPoint>
                        <ListPoint>
                            U<sub>General</sub>(Tyrese Maxey) &ge; U<sub>General</sub>(Jayson Tatum)
                        </ListPoint>
                        <ListPoint>
                            U<sub>General</sub>(Nikola Jokic) &ge; U<sub>General</sub>(Joel Embiid)
                        </ListPoint>
                        <ListPoint>
                            U<sub>General</sub>(Joel Embiid) &gt; U<sub>General</sub>(Tyrese Maxey)
                        </ListPoint>
                        <ListPoint>
                            U<sub>Individual</sub>(Joel Embiid) &gt; U<sub>Individual</sub>(Tyrese Maxey)
                        </ListPoint>
                        <ListPoint>
                            U<sub>Individual</sub>(Nikola Jokic) &ge; U<sub>Individual</sub>(Joel Embiid)
                        </ListPoint>
                        <ListPoint>
                            U<sub>Team</sub>(Tyrese Maxey) &gt; U<sub>Team</sub>(Joel Embiid)
                        </ListPoint>
                        <ListPoint>
                            U<sub>Team</sub>(Stephen Curry) &gt; U<sub>Team</sub>(Jayson Tatum)
                        </ListPoint>
                    </List>
                </ListPoint>
                <ListPoint>
                    Intensities
                    <List spacing={1} my={1}>
                        <ListPoint>
                            U<sub>General</sub>(Joel Embiid) - U<sub>General</sub>(Stephen
                            Curry) &gt; U<sub>General</sub>(Jayson Tatum) - U<sub>General</sub>(Stephen Curry)
                        </ListPoint>
                        <ListPoint>
                            U<sub>General</sub>(Nikola Jokic) - U<sub>General</sub>(Tyrese
                            Maxey) &gt; U<sub>General</sub>(Jayson Tatum) - U<sub>General</sub>(Stephen Curry)
                        </ListPoint>
                        <ListPoint>
                            U<sub>Individual</sub>(Nikola Jokic) - U <sub>Individual</sub>(Joel
                            Embiid) &gt; U<sub>Individual</sub>(Jayson Tatum) - U<sub>Individual</sub>(Tyrese Maxey)
                        </ListPoint>
                        <ListPoint>
                            U<sub>Individual</sub>(Nikola Jokic) - U<sub>Individual</sub>(Joel
                            Embiid) &gt; U<sub>Individual</sub>(Tyrese Maxey) - U<sub>Individual</sub>(Stephen Curry)
                        </ListPoint>
                        <ListPoint>
                            U<sub>Team</sub>(Jayson Tatum) - U<sub>Team</sub>(Stephen Curry) &gt; U<sub>Team</sub>(Tyrese
                            Maxey) - U<sub>Team</sub>(Joel Embiid)
                        </ListPoint>
                        <ListPoint>
                            U<sub>Team</sub>(Jayson Tatum) - U<sub>Team</sub>(Stephen Curry) &gt; U<sub>Team</sub>(Nikola
                            Jokic) - U<sub>Team</sub>(Jason Tatum)
                        </ListPoint>
                        <ListPoint>
                            u<sub>REB</sub>(Nikola Jokic) - u<sub>REB</sub>(Joel Embiid) &gt; u<sub>REB</sub>(Jayson
                            Tatum) - u<sub>REB</sub>(Stephen Curry)
                        </ListPoint>
                    </List>
                </ListPoint>
                <ListPoint>
                    Best-Worst
                    <List spacing={1} my={1}>
                        <ListPoint>
                            P<sup>*</sup><sub>General</sub>(Stephen Curry) = 8
                        </ListPoint>
                        <ListPoint>
                            P<sub>*,</sub><sub>General</sub>(Nikola Jokic) = 3
                        </ListPoint>
                        <ListPoint>
                            P<sub>*,</sub><sub>Individual</sub>(Nikola Jokic) = 1
                        </ListPoint>
                        <ListPoint>
                            P<sub>*,</sub><sub>Team</sub>(Nikola Jokic) = 3
                        </ListPoint>
                        <ListPoint>
                            P<sub>*,</sub><sub>Team</sub>(Tyrese Maxey) = 3
                        </ListPoint>
                    </List>
                </ListPoint>
            </List>
        </Box>
    )
}

export default Overview;