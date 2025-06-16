import {useState} from "react";


export default function DarkModeHooks(darkMode, updateDarkMode) {
    const [darkModeEnabled, setDarkModeEnabled] = useState(darkMode)

    const toggleDarkMode = (value) => {
        setDarkModeEnabled((oldState) => !oldState);
        updateDarkMode && updateDarkMode(!darkModeEnabled);
    };


    // When using hooks use {} to retun
    return {
        darkModeEnabled,
        toggleDarkMode
    }
}
