import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import {useEmails} from "../../EmailContext";
import CategorizedMail from "../../types/CategorizedMail";
import {COLORS, legendProps, legendStyle, pieStyleProps} from "./styles";


const transformEmailsToChartData = (emails: CategorizedMail[]) => {
    const categoryCounts: Record<string, number> = {};

    emails.forEach(email => {
        email.categories.forEach(category => {
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
    });

    return Object.entries(categoryCounts).map(([name, value]) => ({name, value}));
};

const EmailCategoryChart: React.FC = () => {
    const {emails} = useEmails();
    const chartData = transformEmailsToChartData(emails);

    return (
        <div style={{textAlign: 'center'}}>
            <h2>Email Categories</h2>

            <PieChart width={600} height={600}>  {/* Increased size for better visibility */}
                <Pie
                    data={chartData}
                    {...pieStyleProps}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Tooltip formatter={(value) => value}/>
                <Legend
                    {...legendProps}
                    {...legendStyle}
                />
            </PieChart>
        </div>
    );
};

export default EmailCategoryChart;
