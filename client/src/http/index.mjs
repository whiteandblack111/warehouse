import axios from "axios";


export let API_URL;
if (typeof window !== 'undefined') {
    console.log("typeof window:::",typeof window);
    console.log(" window:::", window);
    console.log(" process.env.API_URL:::", process.env.API_URL);
    console.log(" process.env.API_URL_DEPLOY:::", process.env.API_URL_DEPLOY);
    let currentUrl = window.location.href.split(':')[1] ;
    currentUrl = currentUrl.split('//')[1] ;
    
    if(currentUrl === "localhost"){
        API_URL = process.env.API_URL
    }
    
    if(currentUrl === "87.228.82.237"){
        API_URL = process.env.API_URL_DEPLOY
    }
    console.log(currentUrl)
}




const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }
    throw error;
})

export default $api;