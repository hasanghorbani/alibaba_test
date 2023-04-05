import {watch} from 'vue'
import {defineStore} from 'pinia'
import {useApi} from "@/stores/api";

export const country = defineStore('country', () => {
    const fetchAll = () => {
        return new Promise((resolve, reject) => {
            const {loading, data, error, get} = useApi('v3.1/all')
            const payload = {
                fields: 'name,flags,population,region,capital',
            }
            get(payload)
            watch([loading], () => {
                if (error.value) reject(error.value)

                if (data.value) resolve(data.value)
            })
        })
    }

    return {fetchAll}
});