import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthStringFormat } from '../../../helper/homeHelper';

export default function ExpensesChart({data}) {

    // let data = [
    //     {
    //         "Month": "2023-01-01T00:00:00.000Z",
    //         "Grocery": 14,
    //         "Food": 1384,
    //         "Utilities": 25
    //     },
    //     {
    //         "Month": "2022-12-01T00:00:00.000Z",
    //         "Housing": 1000
    //     },
    //     {
    //         "Month": "2023-02-01T00:00:00.000Z",
    //         "Entertainment": 31
    //     }
    // ];

    // data = data.map((obj) => {
    //     obj.Month = monthStringFormat(obj.Month);
    //     return obj;
    // });

    const labelFormatter = (value) => {
        return "$" + value ;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" /> 
                <YAxis tickFormatter={(value)=> "$"+value} />
                <Tooltip formatter={(value, name, props) => "$" + value}/>
                <Legend />
                <Bar dataKey="Grocery" stackId="a" fill="#7bdff2" />
                <Bar dataKey="Food" stackId="a" fill="#f1c0e8" />
                <Bar dataKey="Housing" stackId="a" fill="#E78EA9" />
                <Bar dataKey="Utilities" stackId="a" fill="#fbc4ab" />
                <Bar dataKey="Entertainment" stackId="a" fill="#CDB699" />
                <Bar dataKey="Transportation" stackId="a" fill="#ccd5ae" />
                <Bar dataKey="Insurance" stackId="a" fill="#a1c5e7" />
                <Bar dataKey="Others" stackId="a" fill="#bcb6f6" />
            </BarChart>
        </ResponsiveContainer>
    )
}
