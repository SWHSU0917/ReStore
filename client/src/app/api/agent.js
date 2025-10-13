import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response) => response.data;
// function responseBodyFn(response) {
//     return response.data;
// }

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error) => {
    // console.log('caught by interceptor');
    const {data, status} = error.response;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            // toast.error(data.title);
            router.navigate('/server-error', {state: {error: data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const request = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => request.get("products"),
    details: (id) => request.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => request.get('buggy/bad-request'),
    get401Error: () => request.get('buggy/unauthorized'),
    get404Error: () => request.get('buggy/not-found'),
    get500Error: () => request.get('buggy/server-error'),
    getValidationError: () => request.get('buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;