import { useState, createContext } from "react";

export const FavoriteFontsContext = createContext();

export const FavoriteFontsProvider = ({ children }) => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorite")) || {
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
    };

    const [favorite, setFavorite] = useState(savedFavorites);

    return (
        <FavoriteFontsContext.Provider value={[favorite, setFavorite]}>
            {children}
        </FavoriteFontsContext.Provider>
    );
};
