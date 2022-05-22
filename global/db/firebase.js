import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAlHr5QMIVV6ZxCnehFyXVV81-whR8GiXk",
  authDomain: "food-df653.firebaseapp.com",
  databaseURL: "https://food-df653-default-rtdb.firebaseio.com",
  projectId: "food-df653",
  storageBucket: "food-df653.appspot.com",
  messagingSenderId: "819480006764",
  appId: "1:819480006764:web:d40ba985668144f0290849",
  measurementId: "G-H4V4QW4NCQ"
}

export const app = initializeApp(firebaseConfig)
const database = getDatabase(app)