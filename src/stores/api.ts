import {ref, watch} from 'vue'
import axios from 'axios';


export const useApi = (endpoint: string, more_header = {}) => {
    let headers = {};

    if (more_header !== undefined) {
        headers = Object.assign(headers, more_header);
    }

    const api = axios.create({
        baseURL: 'https://restcountries.com/', headers: headers
    })

    const data = ref()
    const loading = ref(false)
    const error = ref()

    const post = (payload: any) => {
        loading.value = true
        error.value = undefined

        return api.post(endpoint, payload)
            .then((res: any) => {
                data.value = res.data
                loading.value = false
            })
            .catch((e: any) => {
                error.value = e
                loading.value = false
                throw e
            })
    }

    const get = (query: any, config: object = {}) => {
        loading.value = true
        error.value = undefined

        let queryString = ''

        if (query) {
            let esc = encodeURIComponent;
            queryString = '?' + Object.keys(query)
                .map(k => esc(k) + '=' + esc(query[k]))
                .join('&');
        }

        return api.get(endpoint + queryString, config)
            .then((res: any) => {
                data.value = res.data
                loading.value = false
            })
            .catch((e: any) => {
                error.value = e
                loading.value = false
                throw e
            })
    }


    watch([error], () => {

        if (error.value?.message == 'Network Error') {
            console.error('Network Error')
        } else {
            console.error(error.value)
        }

    })

    return {
        loading, data, error, get, post,
    }
}

// export default api
