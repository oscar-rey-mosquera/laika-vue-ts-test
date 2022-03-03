import { AxiosError, AxiosResponse } from "axios"
import { onMounted, ref } from "vue"

export const useHttpState = <T>(initCallback: () => Promise<AxiosResponse<T>>) => {
    let d= ref<T | null>()
    let error = ref<string | null>(null)
    let loading = ref<boolean>(false)
    let loadingText = ref<string | null>(null);

    onMounted(() => {
        get()
    })


    const get = () => {
        showLoading();
        initCallback().then(({data}) => {
          d.value = data
          hiddenLoading()
        }).catch(e => {
            hiddenLoading()
            error.value = e
        } )
    }

    const showLoading = () => {
        error.value = null;
        loading.value = true
        loadingText.value = 'cargando...'
    }

    const mutation = (callback: (data: any) => Promise<AxiosResponse<any, any>>, data: any) => {
        showLoading();
        callback(data).then(() => {
          hiddenLoading()
          get()
        }).catch((e: AxiosError) => {
            hiddenLoading();
            error.value = e.response?.data.error ?? e.response?.data.message  ?? 'Ha ocurrido un error'
        } )
    }

    const hiddenLoading = () => {
        loading.value = false
        loadingText.value = null
    }


    return {
         data: d,
        error,
        loading,
        loadingText,
        get,
        mutation
    }
}