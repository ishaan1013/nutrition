import {useState} from "react"
import {MdSearch} from "react-icons/md"

export default function Search() {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [nutritionResults, setNutritionResults] = useState()

    const onChangeSearch = (event) => {
        setSearch(event.target.value)
    }  
    const handlePress = (e) => {
        if (e.key === "Enter") {
            foodSearch()
        }
    }
    const handleSearch = (newVal) => {
        setSearchResults(newVal)
    }
    const handleNutrition = (newVal) => {
        setNutritionResults(newVal)
    }

    const foodSearch = () => {
        console.log("searching...")
        console.log("search: " + search)
        if (search !== "") {
            fetchSearch()
        }
        setSearchResults([])
        setNutritionResults("")
    }

    const fetchSearch = async () => {
        const response = await fetch(
            `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,
            {
                headers: {
                    "x-app-id": "eaff6795",
                    "x-app-key": "4c3f736fe3e4cdb9af5b84bde1bd0089",
                },
            }
        )
        const data = await response.json()
        data = data.common
        const dataList = []
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                dataList.push(data[key])
            }
        }
        setSearchResults([dataList[0], dataList[1].food_name, dataList[2].food_name, dataList[3].food_name])
        console.log(searchResults[0])
        fetchNutrition(dataList[0].food_name)
    }

    const fetchNutrition = async (foodName) => {
        var h = new Headers();
        h.append("accept", "application/json");
        h.append("x-app-id", "eaff6795");
        h.append("x-app-key", "4c3f736fe3e4cdb9af5b84bde1bd0089");
        h.append("x-remote-user-id", "1");
        h.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: h,
            body: JSON.stringify({ "query": foodName }),
            redirect: 'follow'
        }

        await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", requestOptions)
            .then(response => response.text())
            .then(result => {setNutritionResults(JSON.parse(result))})
            .catch(error => console.log('error', error))

        // console.log(nutritionResults)
        // console.log(JSON.parse(nutritionResults))
    }

    console.log(searchResults)
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-1/3 py-12 bg-white rounded-[3rem] shadow-2xl shadow-indigo-300/50 flex flex-col items-center justify-center">
                <div className="flex relative items-center w-4/5 ">
                    <input
                    id="search"
                    placeholder="Search"
                    value={search}
                    onChange={onChangeSearch}
                    onKeyPress={handlePress}
                    className="w-full rounded-lg p-2 pr-10 focus:outline-none bg-transparent focus:border-slate-400 border-slate-300 border-2 text-slate-600"
                    />
                    <MdSearch
                    className="w-8 h-8 p-1 rounded-full cursor-pointer text-slate-600 hover:bg-slate-100/60 absolute right-2"
                    onClick={() => {foodSearch()}}
                    />
                </div>
                <div className="flex items-center mt-2 mb-8 select-none">
                    <p className="font-medium text-xs text-slate-700">also search with &nbsp;</p>
                    <div className="font-bold font-mono text-xs border-[1.5px] border-slate-500 bg-slate-100 text-slate-700 px-1 py-[0.12rem] rounded-md">enter</div>
                </div>

                {/* <p>{searchResults[0]}</p> */}
                <div className="flex justify-between w-4/5 bg-transparent border-2 border-slate-300 rounded-lg p-4">
                    <div className="flex flex-col">
                        <h1>{searchResults.length !== 0 ? searchResults[0].food_name : ""}</h1>
                        <h4>{searchResults.length !== 0 ? searchResults[0].serving_qty + " " + searchResults[0].serving_unit : ""}</h4>
                    </div>
                </div>
                {/* <p>{JSON.stringify(nutritionResults)}</p> */}
                {/* <p>{nutritionResults.foods[0].nf_calories} calories</p>
                <p>{nutritionResults.foods[0].serving_qty} {nutritionResults.foods[0].serving_unit}</p>
                <p>{nutritionResults.foods[0].serving_weight_grams} grams</p> */}
            </div>
        </div>
    )
}