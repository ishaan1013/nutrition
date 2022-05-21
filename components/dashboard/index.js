import Weight from "./top/weight"
import Consumed from "./top/consumed"
import Calendar from "../calendar"

import FoodList from "./bottom/foodList"

export default function Dashboard() {

    return (
        <main className="w-screen h-screen p-10">
            <div className="min-w-[1300px] 2xl:w-[1400px] flex justify-between xl:ml-6 ml-3">
                <Calendar /> 
                <Weight />
                <Consumed />
            </div>
            <div className="w-full h-[0.15rem] bg-slate-200 my-12"/>
            <div className="min-w-[1300px] 2xl:w-[1400px] flex justify-between xl:ml-6 ml-3">
                <FoodList mealName="Breakfast" />
            </div>
        </main>
    )
}