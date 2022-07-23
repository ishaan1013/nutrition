import { useEffect, useState } from "react"

export default function NutritionOptions() {

    const [caloriesInput, setCaloriesInput] = useState(2000)
    const onChangeCalories = (event) => {
        setCaloriesInput(event.target.value)
    }  
    const [proteinInput, setProteinInput] = useState(210)
    const onChangeProtein = (event) => {
        setProteinInput(event.target.value)
    }  
    const [carbsInput, setCarbsInput] = useState(140)
    const onChangeCarbs = (event) => {
        setCarbsInput(event.target.value)
    }  
    const [fatsInput, setFatsInput] = useState(70)
    const onChangeFats = (event) => {
        setFatsInput(event.target.value)
    }  
    //todo write goals to database when account is created, intialize state with those values

    const [caloriesWarning, setCaloriesWarning] = useState("")
    const [proteinWarning, setProteinWarning] = useState("")
    const [carbsWarning, setCarbsWarning] = useState("")
    const [fatsWarning, setFatsWarning] = useState("")

    useEffect(() => {
        if (caloriesInput < 1000) {
            setCaloriesWarning("Less than 1000 is not recommended.")
        }
        else {
            setCaloriesWarning("")
        }
    }, [caloriesInput])
    useEffect(() => {
        if (proteinInput < 0) {
            setProteinWarning("Enter a positive value.")
        }
        else if (!proteinInput) {
            setProteinWarning("Enter a value.")
        }
        else {
            setProteinWarning("")
        }
    }, [proteinInput])
    useEffect(() => {
        if (carbsInput < 0) {
            setCarbsWarning("Enter a positive value.")
        }
        else if (!carbsInput) {
            setCarbsWarning("Enter a value.")
        }
        else {
            setCarbsWarning("")
        }
    }, [carbsInput])
    useEffect(() => {
        if (fatsInput < 0) {
            setFatsWarning("Enter a positive value.")
        }
        else if (!fatsInput) {
            setFatsWarning("Enter a value.")
        }
        else {
            setFatsWarning("")
        }
    }, [fatsInput])

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
            <div className="flex w-full justify-end items-center my-1">
                <button 
                className="py-2 w-44 bg-blue-500/90 hover:bg-blue-500 rounded-lg font-semibold text-sm text-white flex items-center justify-center"
                >
                    Save
                </button>
            </div>
        </div>
    )
}