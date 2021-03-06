import {useState, useEffect} from "react"
import addFoodDb from "../../global/db/addFoodDb"
import {useAppContext} from "../../global/state"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

import {MdSearch} from "react-icons/md"

function mod(n, m) {
    return ((n % m) + m) % m
}

export default function Search(props) {
    const appContext = useAppContext()
    const date = "" + appContext.sharedState.year + appContext.sharedState.month + appContext.sharedState.day

    const [qtyInput, setQtyInput] = useState("")
    const onChangeQty = (event) => {
        setQtyInput(event.target.value)
    }  
    const [search, setSearch] = useState("")
    const [inputError, setInputError] = useState(false)
    const [searchError, setSearchError] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [nutritionResults, setNutritionResults] = useState([])

    const [foodSelected, setFoodSelected] = useState(false)
    const [foodIndex, setFoodIndex] = useState(-1)
    const [foodMeasures, setFoodMeasures] = useState([])
    const [measureIndex, setMeasureIndex] = useState(0)
    const [mealIndex, setMealIndex] = useState(0)
    const meals = ["Breakfast", "Lunch", "Dinner", "Other"]
    const [pProtein, setPProtein] = useState(0)
    const [pCarbs, setPCarbs] = useState(0)
    const [pFats, setPFats] = useState(0)

    const onChangeSearch = (event) => {
        setSearch(event.target.value)
    }  
    const handlePress = (e) => {
        if (e.key === "Enter") {
            foodSearch()
        }
    }

    const foodSearch = () => {
        setSearchResults([])
        setNutritionResults([])
        if (search !== "") {
            fetchSearch()
        } else {
            setInputError(true)
        }
    }

    const fetchSearch = async () => {
        var myHeaders = new Headers()
        myHeaders.append("x-app-id", "eaff6795")
        myHeaders.append("x-app-key", "4c3f736fe3e4cdb9af5b84bde1bd0089")
        
        var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
        }
        
        const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${search}`, requestOptions)
        const result = await response.text()
        await handleSearch(JSON.parse(result).common)
    }

    const handleSearch = async (data) => {
        const dataList=[]
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                dataList.push(data[key])
            }
        }
        if (dataList[0] !== undefined) {
            setSearchResults([dataList[0], dataList[1], dataList[2], dataList[3]])
            await fetchNutrition(dataList[0].food_name)
                .then(() => {return fetchNutrition(dataList[1].food_name)})
                .then(() => {return fetchNutrition(dataList[2].food_name)})
                .then(() => {return fetchNutrition(dataList[3].food_name)})
        } else {
            setSearchError(true)
        }
    }

    useEffect (() => {
        setTimeout(() => {
            setSearchError(false)
        }, 5000)
    }, [searchError])

    useEffect (() => {
        setTimeout(() => {
            setInputError(false)
        }, 3000)
    }, [inputError])

    const fetchNutrition = async (foodName) => {
        var h = new Headers()
        h.append("accept", "application/json")
        h.append("x-app-id", "eaff6795")
        h.append("x-app-key", "4c3f736fe3e4cdb9af5b84bde1bd0089")
        h.append("x-remote-user-id", "1")
        h.append("Content-Type", "application/json")

        var requestOptions = {
            method: "POST",
            headers: h,
            body: JSON.stringify({ "query": foodName }),
            redirect: "follow"
        }

        await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", requestOptions)
            .then(response => response.text())
            .then(result => {setNutritionResults(nutritionResults => [...nutritionResults, JSON.parse(result)])})
            .catch(error => console.log("error", error))

        // console.log(nutritionResults)
        // console.log(JSON.parse(nutritionResults))
    }

    function RenderSearchResults() {
        if (searchResults.length > 0) {
            console.log("search results: " + JSON.stringify(searchResults[0]))

            // const date = "" + appContext.sharedState.year + appContext.sharedState.month + appContext.sharedState.day

            const results = searchResults.map((result, index) => 
                <div 
                key={index} 
                onClick={() => {
                    // addFoodDb(
                    //     appContext.sharedState.globalUid, 
                    //     date, 
                    //     "breakfast", 
                    //     result.food_name, 
                    //     result.serving_qty, 
                    //     result.serving_unit,
                    //     nutritionResults[index].foods[0].nf_calories
                    // )
                    
                    setFoodSelected(true)
                    setFoodIndex(index)
                    setFoodMeasures([
                        {
                            "serving_weight": nutritionResults[index].foods[0].serving_weight_grams,
                            "measure": nutritionResults[index].foods[0].serving_unit,
                            "qty": nutritionResults[index].foods[0].serving_qty
                        }, 
                        ...nutritionResults[index].foods[0].alt_measures
                    ])

                    setQtyInput(nutritionResults[index].foods[0].serving_qty)

                    setPProtein(Math.round(nutritionResults[index].foods[0].nf_protein / nutritionResults[index].foods[0].serving_weight_grams * 100))
                    setPCarbs(Math.round(nutritionResults[index].foods[0].nf_total_carbohydrate / nutritionResults[index].foods[0].serving_weight_grams * 100))
                    setPFats(Math.round(nutritionResults[index].foods[0].nf_total_fat / nutritionResults[index].foods[0].serving_weight_grams * 100))
                    setMeasureIndex(0)

                    // console.log("nutritionResults[index].foods[0].alt_measures: "+nutritionResults[index].foods[0].alt_measures)
                    // console.log("setFoodMeasures:")
                    // console.log(foodMeasures)
                }}
                className="flex justify-between items-center bg-transparent border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 duration-300 ease-in-out cursor-pointer rounded-lg p-4 my-4 select-none"
                >
                    <div className="flex flex-col">
                        <h1 className="text-slate-600">{result.food_name}</h1>
                        <h4 className="text-slate-600 text-sm">{result.serving_qty} {result.serving_unit}</h4>
                    </div>
                    <div className="flex flex-col items-end">
                        <h1 className="mb-[-0.3rem] text-slate-600">
                            {nutritionResults[index] === undefined ? null :
                            Math.round(nutritionResults[index].foods[0].nf_calories)
                            }
                        </h1>
                        <h4 className="text-slate-600 text-sm">cals</h4>
                    </div>
                </div>
            )

            return (<div className="w-4/5 mt-8">{results}</div>)
        }
        return null
    }

    function RenderContent() {
        if (!foodSelected) {
            return (
                <>
                    <div className="flex relative items-center w-4/5 ">
                        <input
                        id="search"
                        placeholder="Search"
                        autoFocus
                        value={search}
                        onChange={onChangeSearch}
                        onKeyPress={handlePress}
                        className="w-full rounded-lg p-2 pr-10 focus:outline-none bg-transparent focus:border-slate-400 border-slate-300 border-2 text-slate-600 placeholder:text-slate-300 font-medium"
                        />
                        <MdSearch
                        className="w-8 h-8 p-1 rounded-full cursor-pointer text-slate-600 hover:bg-slate-100/80 absolute right-2"
                        onClick={() => {foodSearch()}}
                        />
                    </div>
                    {searchError &&
                    <div className="absolute mt-2 pt-1 pb-[0.4rem] px-5 bg-red-600/60 backdrop-blur-[3px] rounded-lg select-none">
                        <p className="text-white font-medium">No results found.</p>
                    </div>
                    }
                    {inputError &&
                    <div className="absolute mt-2 pt-1 pb-[0.4rem] px-5 bg-red-600/60 backdrop-blur-[3px] rounded-lg select-none">
                        <p className="text-white font-medium">Type something to search!</p>
                    </div>
                    }
                    <div className="flex items-center mt-2 select-none">
                        <p className="font-medium text-xs text-slate-400">also search with &nbsp;</p>
                        <div className="font-bold font-mono text-xs border-[1.5px] border-slate-500 bg-slate-100 text-slate-500 px-1 py-[0.12rem] rounded-md">enter</div>
                    </div>
                    <RenderSearchResults />
                </>
            )
        }
        else {
            return (
                <div className="w-full h-full px-12">
                    <div className="w-full relative flex justify-center mb-10">
                        <div className="absolute top-2">
                            <h1 className="text-slate-600 text-2xl mb-[-0.4rem] font-black capitalize">
                                {
                                searchResults[foodIndex].food_name.replace(/^"(.+(?="$))"$/, "$1")
                                }
                            </h1>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <FaChevronLeft
                            onClick={() => {
                                setFoodSelected(false)
                            }}
                            className="text-slate-600 cursor-pointer hover:bg-slate-600/10 p-[0.45rem] h-[2.2rem] w-[2.2rem] rounded-full"
                            />
                            <div className="flex flex-col items-end">
                                <h1 className="text-slate-600 text-2xl mb-[-0.4rem] font-black">
                                    {
                                    Math.round(
                                        // ! below: calories per gram
                                        nutritionResults[foodIndex].foods[0].nf_calories / nutritionResults[foodIndex].foods[0].serving_weight_grams
                                        // ! below: multiplying by total weight of current measurement
                                        * ( foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput )
                                    )

                                    // JSON.stringify(nutritionResults[foodIndex].foods[0]) 
                                    // ! use above for full json

                                    }
                                </h1>
                                {/* <p className="text-slate-500/90 font-medium">cals</p> */}
                                <p className="text-slate-500/90 font-medium">cals</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <input
                        id="qtyInput"
                        placeholder="e.g. 120"
                        value={qtyInput}
                        onChange={onChangeQty}
                        autoFocus
                        type="number"
                        className="w-1/5 rounded-lg p-2 focus:outline-none focus:border-slate-400 border-slate-300 border-2 placeholder:text-slate-300 text-slate-600 font-medium"
                        />
                        <div
                        className="ml-4 rounded-lg select-none px-3 py-2 border-slate-300 border-2 text-slate-600 font-medium flex items-center justify-center"
                        >
                            <FaChevronLeft
                            className="text-slate-600 cursor-pointer hover:bg-slate-600/10 p-[0.25rem] h-[1.4rem] w-[1.4rem] mr-4 rounded-full"
                            onClick={() => setMeasureIndex(measureIndex-1)}
                            />
                            <div className="flex flex-col items-center justify-center">
                                <p className="font-bold">{foodMeasures[mod(measureIndex, foodMeasures.length)] === undefined ? null : foodMeasures[mod(measureIndex, foodMeasures.length)].measure}</p>
                                <p className="mt-[-0.1rem] text-xs">{Math.round(foodMeasures[mod(measureIndex, foodMeasures.length)] === undefined ? null : foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * 100) / 100} g</p>
                            </div>
                            <FaChevronRight
                            className="text-slate-600 cursor-pointer hover:bg-slate-600/10 p-[0.25rem] h-[1.4rem] w-[1.4rem] ml-4 rounded-full"
                            onClick={() => setMeasureIndex(measureIndex+1)}
                            />
                        </div>
                    </div>

                    <div className="w-full border-slate-500 border-t-2 mt-6" />

                    <div className="mt-20 flex justify-center w-full">
                        <p className="absolute translate-x-[0.1rem] -translate-y-14 text-blue-500/[0.85] font-extrabold">
                            Total Weight: {Math.round(foodMeasures[mod(measureIndex, foodMeasures.length)] === undefined ? null : foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput * 100) / 100} g
                        </p>
                    </div>

                    <div className="w-full flex justify-evenly mt-4">
                        <div className="relative my-1 w-[68px] h-[68px] flex items-center justify-center">
                            <p className="absolute translate-x-[0.1rem] -translate-y-14 text-slate-600 font-semibold">Protein</p>
                            <p className="translate-x-[0.1rem] text-[0.8rem] text-slate-600 font-semibold text-center">{pProtein}%</p>
                            <p className="absolute translate-x-[0.1rem] translate-y-14 text-slate-600 font-semibold">
                                {
                                Math.round(
                                    // ! below: nutrient per gram
                                    nutritionResults[foodIndex].foods[0].nf_protein / nutritionResults[foodIndex].foods[0].serving_weight_grams
                                    // ! below: multiplying by total weight of current measurement
                                    * ( foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput ) * 100
                                ) / 100
                                } g
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="z-10 absolute rotate-[270deg] w-[68px] h-[68px]">
                                <circle
                                cx="34"
                                cy="34"
                                r="28"
                                strokeLinecap="round"
                                className="stroke-blue-500/[0.85] stroke-[12] fill-transparent"
                                strokeDasharray="175"
                                strokeDashoffset={(1 - pProtein / 100) * 175}
                                />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute rotate-[270deg] w-[68px] h-[68px]">
                                <circle
                                cx="34"
                                cy="34"
                                r="28"
                                strokeLinecap="round"
                                className="stroke-slate-300 stroke-[12] fill-transparent"
                                strokeDasharray="175"
                                strokeDashoffset="0"
                                />
                            </svg>
                        </div>
                        <div className="relative my-1 w-[68px] h-[68px] flex items-center justify-center">
                            <p className="absolute translate-x-[0.1rem] -translate-y-14 text-slate-600 font-semibold">Carbs</p>
                            <p className="translate-x-[0.1rem] text-[0.8rem] text-slate-600 font-semibold text-center">{pCarbs}%</p>
                            <p className="absolute translate-x-[0.1rem] translate-y-14 text-slate-600 font-semibold">
                                {
                                Math.round(
                                    // ! below: nutrient per gram
                                    nutritionResults[foodIndex].foods[0].nf_total_carbohydrate / nutritionResults[foodIndex].foods[0].serving_weight_grams
                                    // ! below: multiplying by total weight of current measurement
                                    * ( foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput ) * 100
                                ) / 100
                                } g
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="z-10 absolute rotate-[270deg] w-[68px] h-[68px]">
                                <circle
                                cx="34"
                                cy="34"
                                r="28"
                                strokeLinecap="round"
                                className="stroke-blue-500/[0.85] stroke-[12] fill-transparent"
                                strokeDasharray="175"
                                strokeDashoffset={(1 - pCarbs / 100) * 175}
                                />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute rotate-[270deg] w-[68px] h-[68px]">
                                <circle
                                cx="34"
                                cy="34"
                                r="28"
                                strokeLinecap="round"
                                className="stroke-slate-300 stroke-[12] fill-transparent"
                                strokeDasharray="175"
                                strokeDashoffset="0"
                                />
                            </svg>
                        </div>
                        <div className="relative my-1 w-[68px] h-[68px] flex items-center justify-center">
                            <p className="absolute translate-x-[0.1rem] -translate-y-14 text-slate-600 font-semibold">Fats</p>
                            <p className="translate-x-[0.1rem] text-[0.8rem] text-slate-600 font-semibold text-center">{pFats}%</p>
                            <p className="absolute translate-x-[0.1rem] translate-y-14 text-slate-600 font-semibold">
                                {
                                Math.round(
                                    // ! below: nutrient per gram
                                    nutritionResults[foodIndex].foods[0].nf_total_fat / nutritionResults[foodIndex].foods[0].serving_weight_grams
                                    // ! below: multiplying by total weight of current measurement
                                    * ( foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput ) * 100
                                ) / 100
                                } g
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="z-10 absolute rotate-[270deg] w-[68px] h-[68px]">
                                <circle
                                cx="34"
                                cy="34"
                                r="28"
                                strokeLinecap="round"
                                className="stroke-blue-500/[0.85] stroke-[12] fill-transparent"
                                strokeDasharray="175"
                                strokeDashoffset={(1 - pFats / 100) * 175}
                                />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute rotate-[270deg] w-[68px] h-[68px]">
                                <circle
                                cx="34"
                                cy="34"
                                r="28"
                                strokeLinecap="round"
                                className="stroke-slate-300 stroke-[12] fill-transparent"
                                strokeDasharray="175"
                                strokeDashoffset="0"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="w-full border-slate-500 border-t-2 mt-16" />

                    <div className="flex justify-center mt-8">
                        <div
                        className="rounded-lg select-none px-3 py-2 border-slate-300 border-2 text-slate-600 font-medium flex items-center justify-center"
                        >
                            <FaChevronLeft
                            className="text-slate-600 cursor-pointer hover:bg-slate-600/10 p-[0.25rem] h-[1.4rem] w-[1.4rem] mr-4 rounded-full"
                            onClick={() => setMealIndex(mealIndex-1)}
                            />
                            <div className="flex flex-col items-center justify-center">
                                <p className="mb-[-0.1rem] text-xs">Meal</p>
                                <p className="font-bold">{meals[mod(mealIndex, 4)]}</p>
                            </div>
                            <FaChevronRight
                            className="text-slate-600 cursor-pointer hover:bg-slate-600/10 p-[0.25rem] h-[1.4rem] w-[1.4rem] ml-4 rounded-full"
                            onClick={() => setMealIndex(mealIndex+1)}
                            />
                        </div>
                    </div>

                    <button
                    onClick={() => {
                        addFoodDb(
                            appContext.sharedState.globalUid, 
                            date, 
                            meals[mod(mealIndex, 4)], 
                            searchResults[foodIndex].food_name.replace(/^"(.+(?="$))"$/, "$1"), 
                            qtyInput, 
                            foodMeasures[mod(measureIndex, foodMeasures.length)] === undefined ? null : foodMeasures[mod(measureIndex, foodMeasures.length)].measure,
                            Math.round(
                                nutritionResults[foodIndex].foods[0].nf_calories / nutritionResults[foodIndex].foods[0].serving_weight_grams
                                * ( foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput )
                            ),
                            Math.round(
                                nutritionResults[foodIndex].foods[0].nf_protein / nutritionResults[foodIndex].foods[0].serving_weight_grams
                                * ( foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput ) * 100
                            ) / 100,
                            Math.round(
                                nutritionResults[foodIndex].foods[0].nf_total_carbohydrate / nutritionResults[foodIndex].foods[0].serving_weight_grams
                                * ( foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput ) * 100
                            ) / 100,
                            Math.round(
                                nutritionResults[foodIndex].foods[0].nf_total_fat / nutritionResults[foodIndex].foods[0].serving_weight_grams
                                * ( foodMeasures[mod(measureIndex, foodMeasures.length)].serving_weight * qtyInput ) * 100
                            ) / 100
                        )
                        props.setIsSearching(false)
                    }}
                    className="w-full text-center rounded-lg bg-blue-500/[0.85] hover:bg-blue-500 text-white p-2 mt-6 ease-in-out duration-100 font-medium"
                    >Add Food</button>
                </div>
            )
        }
    }

    return (
        <div className="w-screen h-screen md:px-0 sm:px-16 px-2 flex items-center justify-center">
            <div className="relative 2xl:w-1/3 xl:w-2/5 lg:w-1/2 md:w-3/5 w-full search-zoom py-12 md:z-0 z-50 bg-white rounded-[2rem] shadow-2xl shadow-indigo-300/50 flex flex-col items-center justify-center">
                <RenderContent />
            </div>
        </div>
    )
}