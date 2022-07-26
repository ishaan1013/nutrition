import { app } from "./firebase"
import firebase from "firebase/app"
import { getDatabase, ref, set } from "firebase/database"

export default function addTotalsDb(userId, date, calories, protein, carbs, fat) {

    const db = getDatabase()

    set(ref(db, (userId + "/" + date+"/totals")), {
        totalCals: calories,
        totalP: protein,
        totalC: carbs,
        totalF: fat
    })
}