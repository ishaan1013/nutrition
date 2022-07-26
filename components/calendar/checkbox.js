import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank, MdOutlineIndeterminateCheckBox } from "react-icons/md"
import { useAppContext } from "../../global/state"

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "../../global/db/firebase"
import firebase from "firebase/app"
import { getDatabase, ref, child, get, set } from "firebase/database"
import { useEffect, useState } from "react"

export default function Checkbox(props) { 

    const appContext = useAppContext()
    const date = "" + appContext.sharedState.year + appContext.sharedState.month + appContext.sharedState.day

    const [user, setUser] = useState(null)
    const auth = getAuth()
    const dbRef = ref(getDatabase())

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            console.log("CHECKBOX auth state change")
        })
    }, [])


    const [cals, setCals] = useState(0)
    const [protein, setProtein] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [fats, setFats] = useState(0)

    const [calsGoal, setCalsGoal] = useState(false)
    const [macrosGoal, setMacrosGoal] = useState(false)

    useEffect(() => {
        if (user) {
            get(child(dbRef, (user.uid + "/" + date))).then((snapshot) => {
                if (snapshot.exists()) {
                    const totalsData = snapshot.val()
                    setCals(totalsData.totals.totalCals)
                    setProtein(totalsData.totals.totalP)
                    setCarbs(totalsData.totals.totalC)
                    setFats(totalsData.totals.totalF)
                    console.log("CHECKBOX totals found:")
                    console.log(totalsData)
                    console.log(date)
                } else {
                    console.log("CHECKBOX No totals")
                }
            }).catch((error) => {
                console.error(error)
            })
        }
    // }, [])
    }, [user, props.day])

    useEffect(() => {
        if (user) {
            get(child(dbRef, (user.uid + "/prefs/goals"))).then((snapshot) => {
                if (snapshot.exists()) {
                    const goalsData = snapshot.val()
                    
                    if (cals >= goalsData.calories && props.goal === "calories") {
                        console.log("CALORIES GOAL")
                        setCalsGoal(true)
                    }
                    else {
                        setCalsGoal(false)
                    }
                    
                    if (
                        protein >= goalsData.protein && 
                        carbs >= goalsData.carbs && 
                        fats >= goalsData.fats && 
                        props.goal === "macros"
                    ) {
                        console.log("MACROS GOAL")
                        setMacrosGoal(true)
                    }
                    else {
                        setMacrosGoal(false)
                    }
                        
                    console.log("CHECKBOX goals found")
                    console.log("total cals", cals)
                    console.log("goals cals", goalsData.calories)
                    console.log("total protein", protein)
                    console.log("goals protein", goalsData.protein)
                    console.log("total carbs", carbs)
                    console.log("goals carbs", goalsData.carbs)
                    console.log("total fats", fats)
                    console.log("goals fats", goalsData.fats)
                } else {
                    console.log("CHECKBOX No goals")
                }
            }).catch((error) => {
                console.error(error)
            })
        }
    }, [cals, protein, carbs, fats])


    const before = (
        parseInt(appContext.sharedState.year) < props.current.getFullYear() || 
        appContext.sharedState.year == props.current.getFullYear() && parseInt(appContext.sharedState.month) < props.current.getMonth() + 1 ||
        appContext.sharedState.year == props.current.getFullYear() && appContext.sharedState.month == props.current.getMonth() + 1 && appContext.sharedState.day < props.current.getDate()
    )
    
    if (calsGoal || macrosGoal) {
        return <MdOutlineCheckBox className="mr-2" />
    }
    else if (before) {
        return <MdOutlineIndeterminateCheckBox className="mr-2 opacity 50" />
    }
    else {
        return <MdOutlineCheckBoxOutlineBlank className="mr-2 opacity-50" />
    }
}