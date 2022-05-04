import { createContext, useContext } from "react"

const AppContext = createContext()

export function AppWrapper({ children }) {
    const current = new Date()
    const sharedState = {
        day: `${current.getDate()}`,
        month: `${current.getMonth() + 1}`,
        year: `${current.getFullYear()}`
    }

    const changeDayContext = (day) => {
        sharedState.day = day
    }

    const changeMonthContext = (month) => {
        sharedState.month = month
    }

    const changeYearContext = (year) => {
        sharedState.year = year
    }

    return (
        <AppContext.Provider value={{ sharedState, changeDayContext, changeMonthContext, changeYearContext }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}