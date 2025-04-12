import { createContext, useContext, useState } from "react"



const AppContext = createContext()

export const AppContextProvider = ({children}) =>{

    const app = 'aiTripPlanner'

    const [user, setUser] = useState(localStorage.getItem('user') || null)


    return (
        <AppContext.Provider value={{app,user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}

export const AppContextInstance = () => {
   return   useContext(AppContext)}
