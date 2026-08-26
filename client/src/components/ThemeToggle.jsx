import {
    FaMoon,
    FaSun
} from "react-icons/fa";


import { useTheme } from "../context/ThemeContext.jsx";
import "./ThemeToggle.css";



export default function ThemeToggle(){


    const {
        darkMode,
        toggleTheme
    } = useTheme();



    return (

        <button
            className="theme-btn"
            onClick={toggleTheme}
        >

            {
                darkMode
                ?
                <FaSun />
                :
                <FaMoon />
            }


        </button>

    );

}