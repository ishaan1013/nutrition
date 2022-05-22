import { useState } from "react"
import { getDatabase, ref, set } from "firebase/database"
// import { useAppContext } from "../../global/state"

export default function addFoodDb(meal, foodName, qty, unit) {
    // const appContext = useAppContext()

    // const [userId, setUserId] = useState(appContext.sharedState.uid)
    // const [date, setDate] = useState(appContext.sharedState.day + "/" + appContext.sharedState.month + "/" + appContext.sharedState.year)
    
    const db = getDatabase()
    console.log("addFoodDb")

    set(ref(db, ("xZzRLWPvldUFPlzyXNhXOIjbLAR2" + "/" + "20220521" + "/" + meal + "/" + foodName)), {
        qty: qty,
        unit: unit
    })
}