import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ( {children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const getandSetUser = async () => {
            try {
                const data = await getMe();

                setUser(data.user);
                setLoading(false);
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }
        }
        getandSetUser()
    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )

}