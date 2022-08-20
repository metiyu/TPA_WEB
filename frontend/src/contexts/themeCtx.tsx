import { createContext, useContext, useState } from "react";

const themeContext = createContext({} as any)

export default function CurrentThemeProvider({ children }: { children: any }) {
    const [theme, setTheme] = useState("light")

    function changeTheme() {
        theme === "light" ? setTheme("dark") : setTheme("light")
    }

    function getTheme() {
        return theme === "light" ? {
            '--primary': '#ffffff',
            '--secondary': '#f3f2ee',
            '--normal_accent': '#0b65c3',
            '--hover_accent': '#e2f0fd',
            '--text_accent': '#000000',
            '--border_accent': '#d3d3d3',
            '--search_accent': '#eef3f7',
            '--logo_accent': '#666666',
        } : {
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

    const value = { changeTheme, getTheme, theme }

    return <themeContext.Provider value={value}>
        {children}
    </themeContext.Provider>
}

export function UseCurrentTheme() {
    return useContext(themeContext)
}