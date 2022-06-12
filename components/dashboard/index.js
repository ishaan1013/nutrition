import { useState } from "react"

import Weight from "./top/weight"
import Consumed from "./top/consumed"
import Calendar from "../calendar"

import FoodList from "./bottom/foodList"

export default function Dashboard() {
    const [updateFoods, setUpdateFoods] = useState(false)

    return (
        <main className="w-screen h-screen p-10">
            <div className="flex min-w-[1536px] xl:ml-6 ml-3 mb-16">
                <Calendar setUpdateFoods={setUpdateFoods}/> 
                <Consumed />
                <Weight />
            </div>
            {/* Line */}
            {/* <div className="w-full h-[0.15rem] bg-slate-200 my-12"/> */}
            <div className="flex min-w-[1536px] xl:ml-6 ml-3">
                <FoodList mealName="Breakfast" updateFoods={updateFoods} setUpdateFoods={setUpdateFoods} />
                <FoodList mealName="Lunch" updateFoods={updateFoods} setUpdateFoods={setUpdateFoods} />
                <FoodList mealName="Dinner" updateFoods={updateFoods} setUpdateFoods={setUpdateFoods} />
                <FoodList mealName="Other" updateFoods={updateFoods} setUpdateFoods={setUpdateFoods} />
            </div>
        </main>
    )
}