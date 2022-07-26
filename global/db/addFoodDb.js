import { app } from "./firebase"
import firebase from "firebase/app"
import { getDatabase, ref, set } from "firebase/database"
// import { useAppContext } from "../../global/state"

export default function addFoodDb(userId, date, meal, foodName, qty, unit, calories, protein, carbs, fat) {

    const db = getDatabase()
    console.log("addFoodDb")

    set(ref(db, (userId + "/" + date + "/" + meal + "/" + foodName)), {
        foodName: foodName,
        qty: qty,
        unit: unit,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat
    })
}