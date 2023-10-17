import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";


function GroupBarChart({chartData}) {
    
    return <Bar data={chartData}/>
}

export default GroupBarChart;