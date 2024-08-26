import { useEffect, useState, createContext } from "react";
import { useCookies } from "react-cookie";

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
    const defaultMode = 'bodyBgColor';
    const [mode, setMode] = useState(localStorage.getItem('mode') || defaultMode);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-user', 'admin-token']);

    useEffect(() => {
        const modes = [
            'changeBgColorRed',
            'changeBgColorBlue',
            'changeBgColorOrange',
            'changeBgColorWhite',
            'changeBgColorPurple',
            'changeBgColorBrown',
            'changeBgColorYellow'
        ];

        let storedMode = localStorage.getItem('mode');

        if (!cookies['cookie-user']) {
            setMode(defaultMode)
        } else {
            if (!storedMode) {
                localStorage.setItem('mode', defaultMode);
                setMode(defaultMode);
            } else if (!modes.includes(storedMode)) {
                localStorage.setItem('mode', defaultMode);
                setMode(defaultMode);
            } else {
                setMode(storedMode);
            }
        }
    }, [defaultMode]);

    return (
        <ModeContext.Provider value={[mode, setMode]}>
            {children}
        </ModeContext.Provider>
    );
}
