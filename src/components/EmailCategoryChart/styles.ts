import {LayoutType} from "recharts/types/util/types";
import {HorizontalAlignmentType, VerticalAlignmentType} from "recharts/types/component/DefaultLegendContent";

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#FF6492', '#FFD700'];
export const pieStyleProps = {
    cx: "50%",  // Center horizontally
    cy: "50%",  // Center vertically
    outerRadius: 180,  // Adjust the radius to fit within the chart
    fill: "#8884d8",
    dataKey: "value",
    paddingAngle: 0
}
export const legendStyle = {
    wrapperStyle: {
        fontSize: '14px',
        lineHeight: '24px',
        paddingLeft: '20px',
    }
}
export const legendProps: {
    layout: LayoutType,
    align: HorizontalAlignmentType,
    verticalAlign: VerticalAlignmentType
} = {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle"
}