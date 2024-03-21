"use client";
import React from 'react'
import { Line,Doughnut } from 'react-chartjs-2';
import {Chart,CategoryScale,
Tooltip,
Filler,
LinearScale,
PointElement,
LineElement,
ArcElement,
Legend} from 'chart.js'
// import { data } from 'autoprefixer';
import {getLastSevenDays} from '@/lib/features';
import {fileFormate,transformImage} from '@/lib/features';

Chart.register(
    CategoryScale,
Tooltip,
Filler,
LinearScale,
PointElement,
LineElement,
ArcElement,
Legend
);
const labels=getLastSevenDays();
console.log("22",labels);



const lineChartOptions={
   responsive:true,
   plugins:{
    legend:{
      display:false
    }
   },
   title:{
    display:false,
   },
   scales:{
    x:{
      grid:{
        display:false
      }
    },
    y:{
        beginAtZero:true,
      grid:{
        display:false
      }
    }
   } 
}


const LineChart = ({value=[]}) => {
    const data={
    labels,
    datasets: [{
        data:value,
        label:"Messages",
        fill:false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
    },
  

],
    }
  return (
    <div className='bg-white p-4 '>
      <p> Last Messages </p>
<Line data={data} options={lineChartOptions} />
</div>
  )
}


const doughnutChartOptions={
    responsive:true,
    plugins:{
     legend:{
       display:false,
       
     }
    },
    title:{
     display:false,
    },
 cutout:100,
 }

 const DoughnutChart = ({ value = [67,8], options = [] }) => {
  const data = {
      labels: options,
      datasets: [{
          data: value,
          label: "Total Chats vs Group Chats",
          fill: false,
          backgroundColor: ['#8B5CF6', '#F59E0B'],
          borderColor: ['#8B5CF6', '#F59E0B'],
          offset: 40,
      }]
  };

  return (
    <div className=' '>
      <p> Total Chats vs Group Chats </p>
      <Doughnut data={data}
      options={doughnutChartOptions} />
      </div>
  );
}

export {LineChart,DoughnutChart};


