export default function ({ store, app: { $axios }, redirect }) {
    $axios.onRequest((config) => {
        if (store.state.auth.token) {
            config.headers.Authorization = 'Bearer ' + store.state.auth.token
        }

        return config
    })

    $axios.onError((error) => {
        return new Promise(async (resolve, reject) => {

            let apiErrors = {messages: [], statusCode: 200}
            const statusCode = error.response ? error.response.status : -1
            const { data } = error.response || {}

            switch (statusCode) {
                case 401:
                    redirect('/login')
                    break;
                case 417:
                    const {first_errors = null} = data;
                    apiErrors = {
                        messages: Object.values(first_errors).join( '<br/>' ),
                        statusCode: 417
                    }
                    break;
                case 403:
                    redirect('/forbidden')
                    break;
                case 404:
                    redirect('/not-found')
                    break;
                case 500:
                    redirect('internal-server-error')
                    break;
            }

            return reject(apiErrors)
        })
    })
}
