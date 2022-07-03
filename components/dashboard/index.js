import { useState } from "react"

import Weight from "./top/weight"
import Consumed from "./top/consumed"
import Calendar from "../calendar"

import FoodList from "./bottom/foodList"

export default function Dashboard() {
    const [updateFoods, setUpdateFoods] = useState(false)

    const [breakfastCals, setBreakfastCals] = useState(0)
    const [breakfastP, setBreakfastP] = useState(0)
    const [breakfastC, setBreakfastC] = useState(0)
    const [breakfastF, setBreakfastF] = useState(0)

    const [lunchCals, setLunchCals] = useState(0)
    const [lunchP, setLunchP] = useState(0)
    const [lunchC, setLunchC] = useState(0)
    const [lunchF, setLunchF] = useState(0)

    const [dinnerCals, setDinnerCals] = useState(0)
    const [dinnerP, setDinnerP] = useState(0)
    const [dinnerC, setDinnerC] = useState(0)
    const [dinnerF, setDinnerF] = useState(0)

    const [otherCals, setOtherCals] = useState(0)
    const [otherP, setOtherP] = useState(0)
    const [otherC, setOtherC] = useState(0)
    const [otherF, setOtherF] = useState(0)

    return (
        <main className="w-screen h-screen md:p-10 py-8 px-4 main-zoom">
            <div className="flex min-w-[1536px] xl:ml-6 ml-3 mb-16">
                <Calendar setUpdateFoods={setUpdateFoods}/> 
                <Consumed 
                breakfastCals={breakfastCals} 
                breakfastP={breakfastP}
                breakfastC={breakfastC}
                breakfastF={breakfastF}

                lunchCals={lunchCals} 
                lunchP={lunchP}
                lunchC={lunchC}
                lunchF={lunchF}

                dinnerCals={dinnerCals} 
                dinnerP={dinnerP}
                dinnerC={dinnerC}
                dinnerF={dinnerF}

                otherCals={otherCals}
                otherP={otherP}
                otherC={otherC}
                otherF={otherF}
                />
                <Weight />
            </div>
            {/* Line */}
            {/* <div className="w-full h-[0.15rem] bg-slate-200 my-12"/> */}
            <div className="flex min-w-[1536px] xl:ml-6 ml-3">
                <FoodList 
                mealName="Breakfast" 
                updateFoods={updateFoods} 
                setUpdateFoods={setUpdateFoods} 
                setCalSum={setBreakfastCals} 
                setPSum={setBreakfastP} 
                setCSum={setBreakfastC} 
                setFSum={setBreakfastF} 
                />
                <FoodList 
                mealName="Lunch" 
                updateFoods={updateFoods} 
                setUpdateFoods={setUpdateFoods} 
                setCalSum={setLunchCals} 
                setPSum={setLunchP} 
                setCSum={setLunchC} 
                setFSum={setLunchF} 
                />
                <FoodList 
                mealName="Dinner" 
                updateFoods={updateFoods} 
                setUpdateFoods={setUpdateFoods} 
                setCalSum={setDinnerCals} 
                setPSum={setDinnerP} 
                setCSum={setDinnerC} 
                setFSum={setDinnerF} 
                />
                <FoodList 
                mealName="Other" 
                updateFoods={updateFoods} 
                setUpdateFoods={setUpdateFoods} 
                setCalSum={setOtherCals} 
                setPSum={setOtherP} 
                setCSum={setOtherC} 
                setFSum={setOtherF} 
                />
            </div>
        </main>
    )
}