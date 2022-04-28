import { createContext, useContext } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const current = new Date();
    const sharedState = {
        day: `${current.getDate()}`,
        month: `${current.getMonth() + 1}`,
        year: `${current.getFullYear()}`
    }

    const changeDay = (day) => {
        sharedState.day = day;
    }

    const changeMonth = (month) => {
        sharedState.month = month;
    }

    const changeYear = (year) => {
        sharedState.year = year;
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}