import { useState } from "react"
import { getDatabase, ref, set } from "firebase/database"
// import { useAppContext } from "../../global/state"

export default function addFoodDb(userId, date, meal, foodName, qty, unit, calories) {
    // const appContext = useAppContext()

    // const [userId, setUserId] = useState(appContext.sharedState.uid)
    // const [date, setDate] = useState(appContext.sharedState.day + "/" + appContext.sharedState.month + "/" + appContext.sharedState.year)
    
    const db = getDatabase()
    console.log("addFoodDb")

    set(ref(db, (userId + "/" + date + "/" + meal + "/" + foodName)), {
        qty: qty,
        unit: unit,
        calories: calories,
    })
}