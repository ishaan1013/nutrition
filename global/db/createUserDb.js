import { getDatabase, ref, set } from "firebase/database"

export default function createUserDb(userId) {
    console.log("createUserDb")
    const db = getDatabase();
    set(ref(db, userId), {
        prefs: {
            kg: true,
            goals: {
                calories: 2500,
                protein: 160,
                carbs: 230,
                fats: 90
            }
        }
    })
}