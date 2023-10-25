import { useState } from "react";
import Function from "./Function.jsx";
import { Heading, VStack } from "@chakra-ui/react";

const FunctionsTab = () => {

    const [criteria, setFunctions] = useState([
        {
            criterion: 1,
            name: 'Criterion 1',
            criterion_function_points: [
                {
                    id: 4,
                    ordinate: 0.08005954022652784,
                    abscissa: 1
                },
                {
                    id: 3,
                    ordinate: 0.09279759609052274,
                    abscissa: 3
                },
                {
                    id: 2,
                    ordinate: 0.10730285342574486,
                    abscissa: 5
                },
                {
                    id: 5,
                    ordinate: 0.6013904523117659,
                    abscissa: 8
                },
                {
                    id: 1,
                    ordinate: 0.9065572886990513,
                    abscissa: 9
                },
            ]
        },
        {
            criterion: 2,
            name: 'Criterion 2',
            criterion_function_points: [
                {
                    id: 4,
                    ordinate: 0.26081671162306563,
                    abscissa: 5
                },
                {
                    id: 1,
                    ordinate: 0.48515608234457785,
                    abscissa: 20
                },
                {
                    id: 3,
                    ordinate: 0.6300385783716631,
                    abscissa: 23
                },
                {
                    id: 2,
                    ordinate: 0.682096365104786,
                    abscissa: 24
                },
                {
                    id: 5,
                    ordinate: 0.7852847521782992,
                    abscissa: 45
                },
            ]
        },
        {
            criterion: 3,
            name: 'Criterion 3',
            criterion_function_points: [
                {
                    id: 1,
                    ordinate: 0.1407256750287582,
                    abscissa: 3
                },
                {
                    id: 4,
                    ordinate: 0.26081671162306563,
                    abscissa: 8
                },
                {
                    id: 3,
                    ordinate: 0.6300385783716631,
                    abscissa: 50
                },
                {
                    id: 2,
                    ordinate: 0.682096365104786,
                    abscissa: 56
                },
                {
                    id: 5,
                    ordinate: 0.7852847521782992,
                    abscissa: 58
                },
            ]
        }
    ])

    return (
        <VStack
            spacing={5}
        >
            <>
                {criteria.map(c => (
                    <>
                        <Heading size={'lg'}>{c.name}</Heading>
                        <Function key={c.id} criterion={c}/>
                    </>
                ))}
            </>
        </VStack>
    )

}

export default FunctionsTab;