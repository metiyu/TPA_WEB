import { createContext, useContext, useState } from "react";

const userContext = createContext({} as any)

export default function CurrentUserProvider({ children }: { children: any }) {
    const [user, setUser] = useState(Object)

    function getUserFromStorage() {
        const userLoad = localStorage.getItem('user') || ""
        if (userLoad === "")
            return false
        const user = JSON.parse(userLoad)
        if (user === undefined || user === null) {
            return false
        }
        else {
            return user
        }
    }

    function setUserToStorage(user: Object) {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    function getUser() {
        if (user === undefined || user === null || Object.keys(user).length == 0) {
            const userLoad = getUserFromStorage()
            setUser(userLoad)
            return userLoad
        }
        return user
    }

    const value = { setUserToStorage, user, getUser }

    return <CurrentUserProvider value={value}>
        {children}
    </CurrentUserProvider>
}

export function UseCurrentUser() {
    return useContext(userContext)
}