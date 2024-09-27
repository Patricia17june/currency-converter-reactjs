// useDarkMode.js

import { useState, useEffect } from "react";

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return { darkMode, setDarkMode };
};

export default useDarkMode;
