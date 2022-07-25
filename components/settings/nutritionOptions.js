import { useEffect, useState } from "react"

import { getAuth, onAuthStateChanged } from "firebase/auth"

import { app } from "../../global/db/firebase"
import firebase from "firebase/app"
import { getDatabase, ref, child, get } from "firebase/database"

export default function NutritionOptions() {

    const auth = getAuth()
    // const user = auth.currentUser
    const dbRef = ref(getDatabase())

    onAuthStateChanged(auth, (user) => {
        if (user) {
            get(child(dbRef, (user.uid + "/prefs"))).then((snapshot) => {
                if (snapshot.exists()) {
                    const prefsData = snapshot.val()
                    setCaloriesInput(prefsData.goals.calories)
                    setProteinInput(prefsData.goals.protein)
                    setCarbsInput(prefsData.goals.carbs)
                    setFatsInput(prefsData.goals.fats)
                } else {
                    console.log("No prefs")
                }
                console.log(user.uid)
            }).catch((error) => {
                console.error(error)
            })
        }
    })

    const roundInput = (value) => {
        if (isNaN(value)) {
            return value
        }
        else {
            return parseInt(value)
        }
    }

    const [caloriesInput, setCaloriesInput] = useState(2500)
    const onChangeCalories = (event) => {
        setCaloriesInput(roundInput(event.target.value))
    }  
    const [proteinInput, setProteinInput] = useState(160)
    const onChangeProtein = (event) => {
        setProteinInput(roundInput(event.target.value))
    }  
    const [carbsInput, setCarbsInput] = useState(230)
    const onChangeCarbs = (event) => {
        setCarbsInput(roundInput(event.target.value))
    }  
    const [fatsInput, setFatsInput] = useState(90)
    const onChangeFats = (event) => {
        setFatsInput(roundInput(event.target.value))
    }  
    //todo write goals to database when account is created, intialize state with those values

    const [caloriesWarning, setCaloriesWarning] = useState("")
    const [proteinWarning, setProteinWarning] = useState("")
    const [carbsWarning, setCarbsWarning] = useState("")
    const [fatsWarning, setFatsWarning] = useState("")

    function macrosWarning(value, setWarning) {
        if (isNaN(value)) {
            setWarning("Enter a value.")
        }
        else {
            setWarning("")
        }
    }

    useEffect(() => {
        if (caloriesInput < 1000) {
            setCaloriesWarning("Less than 1000 is not recommended.")
        }
        else {
            setCaloriesWarning("")
        }
    }, [caloriesInput])
    useEffect(() => {
        macrosWarning(proteinInput, setProteinWarning)
    }, [proteinInput])
    useEffect(() => {
        macrosWarning(carbsInput, setCarbsWarning)
    }, [carbsInput])
    useEffect(() => {
        macrosWarning(fatsInput, setFatsWarning)
    }, [fatsInput])

    function submitGoals(event) {
        if (caloriesWarning || proteinWarning || carbsWarning || fatsWarning) {
            console.log("no")
        }
        event.preventDefault()
        console.log(caloriesInput)
        console.log(proteinInput)
        console.log(carbsInput)
        console.log(fatsInput)
    }

    function RenderButton() {
        if (caloriesWarning || proteinWarning || carbsWarning || fatsWarning) {
            return (
                <button 
                className="cursor-not-allowed py-2 w-44 bg-blue-500/50 rounded-lg font-semibold text-sm text-white flex items-center justify-center"
                >
                    Save
                </button>
            )
        }
        else {
            return (
                <button 
                onClick={(e) => submitGoals(e)}
                className="py-2 w-44 bg-blue-500/90 hover:bg-blue-500 rounded-lg font-semibold text-sm text-white flex items-center justify-center"
                >
                    Save
                </button>
            )
        }
    }

    return (
        <div className="w-full flex flex-col justify-center border-b-[1px] border-slate-300 py-4">
            <h4 className="font-extrabold text-slate-600 mb-4">Nutrition Goals</h4>
            <div className="flex w-full justify-between items-center my-1">
                <h4 className="font-semibold text-slate-600">Daily Calories</h4>
                <div className="flex items-center">
                    <p className="w-full text-center mr-4 text-sm font-medium text-red-500">{caloriesWarning}</p>
                    <input
                    value={caloriesInput}
                    onChange={onChangeCalories}
                    id="caloriesInput"
                    pattern="\d*"
                    type="number"
                    placeholder="Calories (g)"
                    className="w-44 p-2 rounded-lg focus:outline-none focus:border-slate-400 border-slate-300 border-[1px] placeholder:text-slate-300 placeholder:font-normal text-slate-600 font-medium text-sm"
                    />
                </div>
            </div>
            <div className="flex w-full justify-between items-center my-1">
                <h4 className="font-semibold text-slate-600">Protein</h4>
                <div className="flex items-center">
                    <p className="w-full text-center mr-4 text-sm font-medium text-red-500">{proteinWarning}</p>
                    <input
                    value={proteinInput}
                    onChange={onChangeProtein}
                    id="proteinInput"
                    type="number"
                    placeholder="Protein (g)"
                    className="w-44 p-2 rounded-lg focus:outline-none focus:border-slate-400 border-slate-300 border-[1px] placeholder:text-slate-300 placeholder:font-normal text-slate-600 font-medium text-sm"
                    />
                </div>
            </div>
            <div className="flex w-full justify-between items-center my-1">
                <h4 className="font-semibold text-slate-600">Carbohydrates</h4>
                <div className="flex items-center">
                    <p className="w-full text-center mr-4 text-sm font-medium text-red-500">{carbsWarning}</p>
                    <input
                    value={carbsInput}
                    onChange={onChangeCarbs}
                    id="carbsInput"
                    type="number"
                    placeholder="Carbohydrates (g)"
                    className="w-44 p-2 rounded-lg focus:outline-none focus:border-slate-400 border-slate-300 border-[1px] placeholder:text-slate-300 placeholder:font-normal text-slate-600 font-medium text-sm"
                    />
                </div>
            </div>
            <div className="flex w-full justify-between items-center my-1">
                <h4 className="font-semibold text-slate-600">Fats</h4>
                <div className="flex items-center">
                    <p className="w-full text-center mr-4 text-sm font-medium text-red-500">{fatsWarning}</p>
                    <input
                    value={fatsInput}
                    onChange={onChangeFats}
                    id="fatsInput"
                    type="number"
                    placeholder="Fats (g)"
                    className="w-44 p-2 rounded-lg focus:outline-none focus:border-slate-400 border-slate-300 border-[1px] placeholder:text-slate-300 placeholder:font-normal text-slate-600 font-medium text-sm"
                    />
                </div>
            </div>
            <div className="flex w-full justify-end items-center my-2">
                <RenderButton />
            </div>
        </div>
    )
}