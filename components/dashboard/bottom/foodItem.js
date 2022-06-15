import { app } from "../../../global/db/firebase"
import firebase from "firebase/app"
import { getDatabase, ref, get, child, onValue, remove} from "firebase/database"
import { useState, useEffect } from "react"

import { IoMdTrash } from "react-icons/io"

export default function FoodItem(props) {
    const [foods, setFoods] = useState()
    const db = getDatabase()

    useEffect(() => {
        const mealRef = ref(db, (props.userId + "/" + props.date + "/" + props.meal))
        onValue(mealRef, (snapshot) => {
            const data = snapshot.val()
            console.log(data)  
            setFoods(data)
        })
    }, [props.date])

    // useEffect(() => {
    //     console.log("getFoods")
    //     const dbRef = ref(getDatabase())
        
    //     get(child(dbRef, (props.userId + "/" + props.date + "/" + props.meal))).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             // console.log(snapshot.val())
    //             setFoods(snapshot.val())
    //         } else {
    //             console.log("No data available")
    //         }
    //     }).catch((error) => {
    //         console.error(error)
    //     })
    // }, [])

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
            const cals = []
            const p = []
            const c = []
            const f = []
            var index = 0
            Object.entries(foods).forEach(([key, val]) => {
                foodList.push(val)
                cals[index] = val.calories
                p[index] = val.protein
                c[index] = val.carbs
                f[index] = val.fat
                index += 1
            })

            props.setTotalCal(cals.reduce((partialSum, a) => partialSum + a, 0))
            props.setTotalProtein(p.reduce((partialSum, a) => partialSum + a, 0))
            props.setTotalCarbs(c.reduce((partialSum, a) => partialSum + a, 0))
            props.setTotalFats(f.reduce((partialSum, a) => partialSum + a, 0))

            const results = foodList.map((result, index) => 
                <div 
                className="group flex justify-between items-center bg-transparent border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 duration-300 ease-in-out cursor-pointer rounded-lg p-4 my-4 select-none"
                key={index}
                >
                    <div className="flex flex-col">
                        <h1 className="text-slate-600">{result.foodName}</h1>
                        <h4 className="text-slate-600 text-sm">{result.qty} {result.unit}</h4>
                    </div>
                    <div className="flex flex-col items-end group-hover:hidden">
                        <h1 className="mb-[-0.3rem] text-slate-600">
                            {result.calories}
                        </h1>
                        <h4 className="text-slate-600 text-sm">cals</h4>
                    </div>
                    <IoMdTrash 
                    onClick={() => {
                        remove(ref(db, (props.userId + "/" + props.date + "/" + props.meal + "/" + result.foodName)))
                        props.setTotalCal(props.totalCal - result.calories)
                        props.setTotalProtein(props.totalProtein - result.protein)
                        props.setTotalCarbs(props.totalCarbs - result.carbs)
                        props.setTotalFats(props.totalFats - result.fat)
                    }}
                    className="w-8 h-8 p-1 text-red-500/90 hover:text-red-500 cursor-pointer rounded-full hover:bg-red-200/90 border-[1px] border-slate-400 hover:border-red-500 hidden group-hover:block"
                    />
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