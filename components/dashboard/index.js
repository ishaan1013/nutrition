import Weight from "./top/weight"
import Consumed from "./top/consumed"
import Calendar from "../calendar"

import FoodList from "./bottom/foodList"

export default function Dashboard() {

    return (
        <main className="w-screen h-screen p-10">
            <div className="flex min-w-[1536px] xl:ml-6 ml-3 mb-16">
                <Calendar/> 
                <Weight />
                <Consumed />
            </div>
            {/* Line */}
            {/* <div className="w-full h-[0.15rem] bg-slate-200 my-12"/> */}
            <div className="flex min-w-[1536px] xl:ml-6 ml-3">
                <FoodList mealName="Breakfast" />
                <FoodList mealName="Lunch" />
                <FoodList mealName="Dinner" />
                <FoodList mealName="Other" />
            </div>
        </main>
    )
}