// useDarkMode.js

import { useState, useEffect } from "react";

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
    const storedMode  = localStorage.getItem("darkmode")
    return storedMode === "true"
});
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        localStorage.setItem("darkmode", darkMode);
    }, [darkMode]);

    return { darkMode, setDarkMode };
};

export default useDarkMode;
