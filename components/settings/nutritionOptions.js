export default function NutritionOptions() {
    return (
        <div className="w-full flex flex-col justify-center border-b-[1px] border-slate-300 py-4">
            <h4 className="font-extrabold text-slate-600 mb-4">Nutrition Goals</h4>
            <div className="flex w-full justify-between items-center my-1">
                <h4 className="font-semibold text-slate-600">Daily Calories</h4>
                <div className="flex items-center">
                    <p className="w-full text-center mr-4 text-sm font-medium text-red-500">Less than 1000 is not recommended.</p>
                    <input
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
                    <p className="w-full text-center mr-4 text-sm font-medium text-red-500">Enter a positive value.</p>
                    <input
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
                    <p className="w-full text-center mr-4 text-sm font-medium text-red-500">Enter a positive value.</p>
                    <input
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
                    <p className="w-full text-center mr-4 text-sm font-medium text-red-500">Enter a positive value.</p>
                    <input
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