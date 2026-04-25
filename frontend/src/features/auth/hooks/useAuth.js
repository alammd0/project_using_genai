import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { loginUser, logoutUser, registerUser } from "../services/auth.api.js";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;
    const navigate = useNavigate();


    const handleRegister = async ({ username, email, password }) => {
        try{
            setLoading(true);
            const data = await registerUser({ username, email, password }); 
            setUser(data.user);
            navigate("/login");
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true)
            const data = await loginUser({ email, password });
            setUser(data.user);
            navigate("/");
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }

        
    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            const data = await logoutUser();
            setUser(null);
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    const getMe = async () => {
        try {
            setLoading(true);
            const data = await getMe();
            setUser(data.user);
            setLoading(false);
        }
        catch(error){
            console.log(error);
            
            setLoading(false);
        }
    }
    
    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        getMe
    }
}