import { createContext, useState, useEffect } from "react"

export const AppContext = createContext();

export function AppContextProvider(props) {

      return (

            <AppContext.Provider>

                  {props.children}

            </AppContext.Provider>

      )
}

export default AppContext