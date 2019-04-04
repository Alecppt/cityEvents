import { createContext } from 'react'

const Context = createContext({
    curretUser: null,
    isAuth: false
})

export default Context