import React, {
    createContext,
    useReducer,
} from 'react'
import { globalReducer, globalState } from './reducer'

export const GlobalContext = createContext()

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, globalState)
    return (
      <GlobalContext.Provider
        value={{
            state,
            dispatch,
        }}
      >
        {children}
      </GlobalContext.Provider>
    )
}
