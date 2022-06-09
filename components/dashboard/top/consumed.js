import { useState } from "react"
import { useAppContext } from "../../../global/state"
import { FaChevronRight } from "react-icons/fa"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  } from "chart.js"
  import { Line } from "react-chartjs-2"

export default function Consumed() {
    
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                suggestedMin: 130,
                suggestedMax: 150,
            }
        }
    }
      
    const labels = ["", "", "", "", ""]
    const data = {
        labels: labels,
        datasets: [{
            data: [150, 145, 148, 140, 155],
            borderColor: "#60a5fa",
            tension: 0.3,
            borderWidth: 4,
            pointBackgroundColor: "rgba(0, 0, 0, 0)",
            pointRadius: 0,
            fill: {
                target: "origin",
                above: "#dce7f2",
            }
        }]
    }

    return (
        <>
            <section className="h-[19rem] w-80 bg-white rounded-3xl shadow-xl shadow-gray-200/10 px-10 py-7 mr-8 xl:mr-16 relative overflow-hidden">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-slate-600 text-5xl mb-2 font-black">50%</h1>
                        <p className="text-slate-500/90 font-medium">consumed</p>
                    </div>
                    <FaChevronRight
                    className="text-slate-600 cursor-pointer hover:bg-slate-100/60 p-[0.3rem] h-[1.8rem] w-[1.8rem] rounded-full"
                    />
                </div>
                <Line className="!w-[102%] !h-[56%] absolute bottom-[-4px] left-[-3px]" options={options} data={data} />
            </section>
        </>
    )
}