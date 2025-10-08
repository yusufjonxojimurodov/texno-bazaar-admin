import {useRoute, useRouter} from 'vue-router'

export function useQueryParams() {
    const route = useRoute()
    const router = useRouter()

    const getQueries = (prop) => {
        const queries = {...route?.query}
        queries.page = route.query?.page ? +route.query?.page - 1 : 0
        queries.size = route.query?.size ? +route.query?.size : 10

        return prop ? queries[prop] : queries
    }
    const setQueries = async ({...props}, clear = false) => {
        await router.push({
            query: clear || Object.assign({...route?.query}, props)
        })
    }
    return {
        getQueries,
        setQueries
    }
}
