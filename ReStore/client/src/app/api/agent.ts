import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = 'http://localhost:5000/api/'

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
    async (response) => {
      await sleep();
      return response;
    },
    (error: AxiosError) => {
      const { data, status } = error.response as AxiosResponse;
      switch (status) {
        case 400:
          if (data.errors) {
            const modelStateErrors: string[] = [];
            for (const key in data.errors) {
              if (data.errors[key]) {
                modelStateErrors.push(data.errors[key]);
              }
            }
            throw modelStateErrors.flat();
          }
          toast.error(data.title);
          break;
            case 401: 
                toast.error(data.title);
                break;
             case 404:
                toast.error(data.title);
                break;
            case 500: 
                router.navigate('/server-error', {state: {error:data}})
                break;
            default:
                break;
    }
})

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),

}

const Catalog = {
    list: () => request.get('Products'),
    item: () => request.get('Item'),
    details: (id: number) => request.get(`Products/${id}`)
};
const TestErrors = {
    get400Error: () => request.get('Buggy/bad-request'),
    get401Error: () => request.get('Buggy/unauthorised'),
    get404Error: () => request.get('Buggy/not-found'),
    get500Error: () => request.get('Buggy/error'),
    getValidationError: () => request.get('Buggy/validation-error'),

}
const agent = {
    Catalog,
    TestErrors
}

export default agent;