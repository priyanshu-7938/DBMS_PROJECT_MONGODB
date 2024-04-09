import { createContext, useContext, useState } from "react";
const thisContext = createContext();
//coockeies managemnet
function setCookDataEmail(email) {
    document.cookie = `userEmail=${encodeURIComponent(email)}; path=/; secure`;
}
function setCookDataToken(token) {
    document.cookie = `accessToken=${encodeURIComponent(token)}; path=/; secure`;
}
function getCookData() {
    const cookies = document.cookie.split('; ');
    let userData = {};
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'userEmail' || name === 'accessToken') {
            userData[name] = decodeURIComponent(value);
        }
    }
    return Object.keys(userData).length ? userData : undefined;
}
function clearCookData() {
    document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure';
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure';
}
//

export default function ContextProvierAllOver({ children }) {
    const [ userData, setUserData ] = useState();
    const [ token, setTokenInState ] = useState();
    const [ userEmail, setUserEmailInState ]= useState();

    const setToken=(token)=>{
        setTokenInState(token);
        setCookDataToken(token);
    }
    const setUserEmail=(email)=>{
        setUserEmailInState(email);
        setCookDataEmail(email);
    }
    const LogOut = ()=>{
        clearCookData();
        setTokenInState(undefined);
        setUserEmailInState(undefined);

    }
    return (
        <thisContext.Provider
            value={{
            userData, setUserData,
            token, setToken,
            userEmail, setUserEmail,
            LogOut,

        }}
        >
            {children}
        </thisContext.Provider>
    );
}

export const useTheContext = () => {
    return useContext(thisContext);
};
