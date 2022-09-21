import { createContext, useContext, useState } from "react";

const themeContext = createContext({} as any)

export default function CurrentThemeProvider({ children }: { children: any }) {
    const [theme, setTheme] = useState(String)

    function changeTheme() {
        if (theme === "light") {
            setTheme("dark")
            localStorage.setItem('theme', JSON.stringify("dark"))
        }
        else {
            setTheme("light")
            localStorage.setItem('theme', JSON.stringify("light"))
        }
    }

    function getThemeFromStorage() {
        const themeLoad = localStorage.getItem("theme") || ""
        console.log(themeLoad);

        if (themeLoad === "")
            return false
        const theme = JSON.parse(themeLoad)
        if (theme === undefined || theme === null) {
            return false
        }
        else {
            return theme
        }
    }

    function getTheme() {
        if (theme === undefined || theme === null || Object.keys(theme).length == 0) {
            const themeLoad = getThemeFromStorage()
            setTheme(themeLoad)
            if (themeLoad == "\"light\"") {
                return {
                    '--theme': 'ini light',
                    '--primary': '#ffffff',
                    '--secondary': '#f3f2ee',
                    '--normal_accent': '#0b65c3',
                    '--hover_accent': '#e2f0fd',
                    '--text_accent': '#000000',
                    '--border_accent': '#d3d3d3',
                    '--search_accent': '#eef3f7',
                    '--logo_accent': '#666666',
                }
            }
            else if (themeLoad == "\"dark\"") {
                return {
                    '--theme': 'ini dark',
                    '--primary': '#1d2226',
                    '--secondary': '#000000',
                    '--normal_accent': '#639bd2',
                    '--hover_accent': '#2e3f51',
                    '--text_accent': '#ffffff',
                    '--border_accent': '#3d3d3d',
                    '--search_accent': '#39424f',
                    '--logo_accent': '#bcbdbf',
                }
            }
        }
        return theme == "dark" ? {
            '--theme': 'dark',
            '--primary': '#1d2226',
            '--secondary': '#000000',
            '--normal_accent': '#639bd2',
            '--hover_accent': '#2e3f51',
            '--text_accent': '#ffffff',
            '--border_accent': '#3d3d3d',
            '--search_accent': '#39424f',
            '--logo_accent': '#bcbdbf',
        } : {
            '--theme': 'light',
            '--primary': '#ffffff',
            '--secondary': '#f3f2ee',
            '--normal_accent': '#0b65c3',
            '--hover_accent': '#e2f0fd',
            '--text_accent': '#000000',
            '--border_accent': '#d3d3d3',
            '--search_accent': '#eef3f7',
            '--logo_accent': '#666666',
        }
    }

    const value = { changeTheme, getTheme, theme }

    return <themeContext.Provider value={value}>
        {children}
    </themeContext.Provider>
}

export function UseCurrentTheme() {
    return useContext(themeContext)
}