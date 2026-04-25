import axios from 'axios'


const apiInstance = axios.create({
    baseURL : 'http://localhost:4000/api/auth',
    withCredentials : true
});

export const registerUser = async ({username, email, password}) => {
    try {
        const response = await apiInstance.post('/register', {
            username, email, password
        });

        return response.data
    }
    catch (error) {
        return error
    }
}

export const loginUser = async ( {email, password} ) => {
    try {
        const response = await apiInstance.post('/login', {
            email, password
        });

        return response.data
    }
    catch (error) {
        return error
        // return response.data
    }
} 

export const logoutUser = async () => {
    try {
        const response = await apiInstance.get('/logout');

        return response.data
    }
    catch (error) {
        return error
    }
}

export const getMe = async () => {
    try {
        const response = await axios.get('/get-me');

        return response.data
    }
    catch (error) {
        return error   
   }
}