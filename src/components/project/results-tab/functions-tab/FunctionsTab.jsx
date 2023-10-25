import { useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import FunctionTooltip from "./FunctionTooltip.jsx";

const FunctionsTab = () => {

    const [functions, setFunctions] = useState([
        {
            criterion: 1,
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
            criterion_function_points: [
                {
                    id: 4,
                    ordinate: 0.26081671162306563,
                    abscissa: 0.9461070258987758
                },
                {
                    id: 1,
                    ordinate: 0.48515608234457785,
                    abscissa: 0.6143055814489755
                },
                {
                    id: 3,
                    ordinate: 0.6300385783716631,
                    abscissa: 0.9294542728060953
                },
                {
                    id: 2,
                    ordinate: 0.682096365104786,
                    abscissa: 0.1428234094681774
                },
                {
                    id: 5,
                    ordinate: 0.7852847521782992,
                    abscissa: 0.09763315780949378
                },
            ]
        },
        {
            criterion: 3,
            criterion_function_points: [
                {
                    id: 1,
                    ordinate: 0.1407256750287582,
                    abscissa: 0.6143055814489755
                },
                {
                    id: 4,
                    ordinate: 0.26081671162306563,
                    abscissa: 0.9461070258987758
                },
                {
                    id: 3,
                    ordinate: 0.6300385783716631,
                    abscissa: 0.9294542728060953
                },
                {
                    id: 2,
                    ordinate: 0.682096365104786,
                    abscissa: 0.1428234094681774
                },
                {
                    id: 5,
                    ordinate: 0.7852847521782992,
                    abscissa: 0.09763315780949378
                },
            ]
        }
    ])

    return (
        <>
            <LineChart
                width={500}
                height={300}
                data={functions[0].criterion_function_points}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray={'3 3'}/>
                <XAxis
                    dataKey={'abscissa'}
                    domain={[
                        Math.min(...functions[0].criterion_function_points.map(point => point.abscissa)),
                        Math.max(...functions[0].criterion_function_points.map(point => point.abscissa))
                    ]}
                    type={'number'}
                    ticks={[...new Set(functions[0].criterion_function_points.map(point => point.abscissa))]}
                />
                <YAxis/>
                <Tooltip content={<FunctionTooltip/>}/>
                <Line type={'linear'} dataKey={'ordinate'} stroke={'#4FD1C5'} activeDot={{ r: 8 }} strokeWidth={'2px'}/>
            </LineChart>
        </>
    )

}

export default FunctionsTab;