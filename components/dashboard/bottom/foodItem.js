import { app } from "../../../global/db/firebase"
import firebase from "firebase/app"
import { getDatabase, ref, get, child, onValue} from "firebase/database"
import { useState, useEffect } from "react"

export default function FoodItem(props) {
    const [foods, setFoods] = useState()
    const db = getDatabase()

    // const mealRef = ref(db, (props.userId + "/" + props.date + "/" + props.meal))
    // onValue(mealRef, (snapshot) => {
    //     const data = snapshot.val()
    //     console.log(data)  
    //     setFoods(data)
    // })

    useEffect(() => {
        console.log("getFoods")
        const dbRef = ref(getDatabase())
        
        get(child(dbRef, (props.userId + "/" + props.date + "/" + props.meal))).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val())
                setFoods(snapshot.val())
            } else {
                console.log("No data available")
            }
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    // function getFoods() {
    //     console.log("getFoods")
    //     const dbRef = ref(getDatabase())
        
    //     get(child(dbRef, (props.userId + "/" + props.date + "/" + props.meal))).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             console.log(snapshot.val())
    //             // setFoods(snapshot.val())
    //         } else {
    //             console.log("No data available")
    //         }
    //     }).catch((error) => {
    //         console.error(error)
    //     })
    // }

    function RenderFoodItems() {
        if (foods !== null && foods !== undefined) {
            const foodList = []
            Object.entries(foods).forEach(([key, val]) => {
                foodList.push(val)
            });

            const results = foodList.map((result, index) => 
                <div 
                className="flex justify-between items-center bg-transparent border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 duration-300 ease-in-out cursor-pointer rounded-lg p-4 my-4 select-none"
                key={index}
                >
                    <div className="flex flex-col">
                        <h1 className="text-slate-600">{result.foodName}</h1>
                        <h4 className="text-slate-600 text-sm">{result.qty} {result.foodName}</h4>
                    </div>
                    <div className="flex flex-col items-end">
                        <h1 className="mb-[-0.3rem] text-slate-600">
                            {Math.round(result.calories)}
                        </h1>
                        <h4 className="text-slate-600 text-sm">cals</h4>
                    </div>
                </div>
            )

            return (<>{results}</>)
        }
        return null
    }

    return (
        // <div className="flex justify-between items-center bg-transparent border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 duration-300 ease-in-out cursor-pointer rounded-lg p-4 my-4 select-none">
        //     <div className="flex flex-col">
        //         <h1 className="text-slate-600">Food Name</h1>
        //         <h4 className="text-slate-600 text-sm">1 unit</h4>
        //     </div>
        //     <div className="flex flex-col items-end">
        //         <h1 className="mb-[-0.3rem] text-slate-600">
        //             660
        //         </h1>
        //         <h4 className="text-slate-600 text-sm">{JSON.stringify(foods)}</h4>
        //     </div>
        // </div>
        <RenderFoodItems />
    )
}