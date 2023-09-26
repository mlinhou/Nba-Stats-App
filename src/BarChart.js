import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";


function BarChart({chartData}) {
    
    return <Bar data={chartData}/>
}

export default BarChart;