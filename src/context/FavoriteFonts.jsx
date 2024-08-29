import { useState } from "react";
import { createContext } from "react";

export const FavoriteFontsContext = createContext();

export const FavoriteFontsProvider = ({ children }) => {

    const [favorite, setFavorite] = useState({
        "zen-dots": "star",
        "koulen-font": "star",
        "bungee-font": "star",
        "foldit-font": "star",
        "chakra-font": "star",
        "righteous-font": "star",
        "audiowide-font": "star",
        "slackey-font": "star",
        "gruppo-font": "star",
        "novaRound-font": "star",
        "akaya-font": "star",
        "rubikWet-font": "star"
    });

    if (localStorage.getItem("favorite") === null) {
        localStorage.setItem("favorite", "star")
    }

    return (
        <FavoriteFontsContext.Provider value={[favorite, setFavorite]}>
            {children}
        </FavoriteFontsContext.Provider>
    )
}

