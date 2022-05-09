import {useState} from "react"
import {MdSearch} from "react-icons/md"

export default function Search() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

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
        setResults(data)
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
            <p>{JSON.stringify(results)}</p>
        </>
    )
}