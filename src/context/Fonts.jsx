import { useEffect, useState, createContext } from "react";
import { useCookies } from "react-cookie";

export const FontsContext = createContext();

export const FontsProvider = ({ children }) => {
    const defaultFonts = 'bodyMainFonts';

    const [fonts, setFonts] = useState(localStorage.getItem('fonts') || defaultFonts);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-user', 'admin-token']);

    useEffect(() => {
        const availableFonts = [
            'zen-dots',
            'koulen-font',
            'bungee-font',
            'foldit-font',
            'chakra-font',
            'righteous-font',
            'audiowide-font',
            'slackey-font',
            'gruppo-font',
            'novaRound-font',
            'akaya-font',
            'rubikWet-font'
        ];

        let storedFonts = localStorage.getItem('fonts');
        if (!cookies['cookie-user']) {
            setFonts(defaultFonts)
        } else {
            if (!storedFonts || !availableFonts.includes(storedFonts)) {
                localStorage.setItem('fonts', defaultFonts);
                setFonts(defaultFonts);
            } else {
                setFonts(storedFonts);
            }
        }
    }, [defaultFonts]);

    return (
        <FontsContext.Provider value={[fonts, setFonts]}>
            {children}
        </FontsContext.Provider>
    );
}
