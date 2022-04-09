import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Chart from "react-apexcharts";

const AreaChart = ({ country }) => {

    const [daily, setDaily] = useState([]);

    useEffect(() => {
        axios.get(`https://api.covid19api.com/dayone/country/${country}`)
            .then(res => setDaily(res.data))
    }, [country]);

    console.log(daily);

    return <div id="chart">
        <Chart
            options={{
                chart: {
                    height: 250,
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: daily.map(item => item.Date)
                },
            }}
            series={[{
                name: 'Number of cases',
                data: daily.map(item => item.Confirmed)
            }, {
                name: 'Number of Healed',
                data: daily.map(item => item.Recovered)
            }, {
                name: 'Number of Deaths',
                data: daily.map(item => item.Deaths)
            }]}

            style={{
                marginTop: 150
            }}
            height={350}
        />
    </div>;
};

export default AreaChart;
