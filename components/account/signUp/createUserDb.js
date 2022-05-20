import { getDatabase, ref, set } from "firebase/database"

export default function createUserDb(userId) {
    console.log("createUserDb")
    const db = getDatabase();
    set(ref(db, userId), {
        prefs: {
            kg: true
        }

    })
}