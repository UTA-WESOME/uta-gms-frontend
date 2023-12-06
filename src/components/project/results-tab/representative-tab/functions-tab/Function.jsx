import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import FunctionTooltip from "./FunctionTooltip.jsx";
import { useMediaQuery } from "@chakra-ui/react";

const Function = ({ function_points }) => {
    const [isLargerThan1030] = useMediaQuery('(min-width: 1030px)');
    const [isLargerThan550] = useMediaQuery('(min-width: 550px)');
    const [isLargerThan420] = useMediaQuery('(min-width: 420px)');
    return (
        <LineChart
            width={isLargerThan1030 ? 800 : isLargerThan550 ? 500 : isLargerThan420 ? 350 : 250}
            height={isLargerThan420 ? 300 : 225}
            data={function_points.sort((x, y) => x.abscissa > y.abscissa ? 1 : x.abscissa < y.abscissa ? -1 : 0)}
            margin={{
                top: 5,
                right: 30,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray={'3 3'}/>
            <XAxis
                dataKey={'abscissa'}
                domain={[
                    Math.min(...function_points.map(point => point.abscissa)),
                    Math.max(...function_points.map(point => point.abscissa))
                ]}
                type={'number'}
                ticks={[...new Set(function_points.map(point => point.abscissa))]}
            />
            <YAxis/>
            <Tooltip content={<FunctionTooltip/>}/>
            <Line type={'linear'} dataKey={'ordinate'} stroke={'#4FD1C5'} activeDot={{ r: 8 }} strokeWidth={'2px'}/>
        </LineChart>
    )
}

export default Function;