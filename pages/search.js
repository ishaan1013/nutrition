import {useState} from "react"
import {MdSearch} from "react-icons/md"

export default function Search() {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState()
    const [nutritionResults, setNutritionResults] = useState()

    const onChangeSearch = (event) => {
        setSearch(event.target.value)
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
        setSearchResults([dataList[0].food_name, dataList[1].food_name, dataList[2].food_name, dataList[3].food_name, dataList[4].food_name])
        fetchNutrition(dataList[0].food_name)
    }

    const fetchNutrition = async (foodName) => {
        console.log(foodName)
        // const headers = {
        //     "x-app-id": "eaff6795",
        //     "x-app-key": "4c3f736fe3e4cdb9af5b84bde1bd0089",
        //     'x-remote-user-id': "0",
        //     'content': 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // }
        // const response = await fetch(
        //     `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        //     {
        //         method: "post",
        //         headers,
        //         body: {"query": foodName},
        //     }
        // )
        
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("x-app-id", "eaff6795");
        myHeaders.append("x-app-key", "4c3f736fe3e4cdb9af5b84bde1bd0089");
        myHeaders.append("x-remote-user-id", "1");
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({ "query": "bread" })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }

        const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", requestOptions)
            .then(response => response.text())
            .then(result => setNutritionResults(result))
            .catch(error => console.log('error', error))

    }


    return (
        <>
            <div className="flex w-full justify-center items-center">
                <input
                id="search"
                placeholder="search"
                value={search}
                onChange={onChangeSearch}
                className="w-1/3 rounded-lg p-2 focus:outline-none focus:border-slate-400 border-slate-300 border-2 text-slate-600"
                />
                <MdSearch 
                className="w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-black/[0.05]"
                onClick={() => {fetchSearch()}}
                />
            </div>
            <p>{JSON.stringify(searchResults)}</p>
            <p>{nutritionResults}</p>
        </>
    )
}