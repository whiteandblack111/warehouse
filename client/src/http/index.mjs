import axios from "axios";

export const LOCAL_URL = 'localhost:7000'
export const DEPLOY_URL = '87.228.81.138'

// export const API_URL = `${process.env.API_URL}/api`

// ==========================================

export let API_URL;
if (typeof window !== 'undefined') {
    // console.log("typeof window:::", typeof window);
    // console.log(" window:::", window);

    let currentUrl = window.location.href.split(':')[1];
    currentUrl = currentUrl.split('//')[1];
    currentUrl = currentUrl.split('/')[0];

    if (currentUrl === "localhost") {
        API_URL = `http://${LOCAL_URL}/api`
        // console.log("LOCAL_URL:::", API_URL);
    }

    if (currentUrl !== "localhost" ||
        currentUrl === "skynetbot.ru"

    ) {
        API_URL = `https://${currentUrl}/api`
        // console.log("DEPLOY_URL:::", API_URL);
    }
    // console.log(currentUrl)

}

// ==========================================

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