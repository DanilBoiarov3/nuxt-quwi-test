export default function ({ store, app: { $axios, $toast }, redirect }) {
    $axios.onRequest((config) => {
        if (store.state.auth.token) {
            config.headers.Authorization = 'Bearer ' + store.state.auth.token
        }

        return config
    })

    $axios.onError((error) => {
        return new Promise(async (resolve, reject) => {
            const statusCode = error.response ? error.response.status : -1

            const {
                statusText = 'Error',
                data: {
                    first_errors
                } = {
                    first_errors: []
                }
            } = error.response || {}

            switch (statusCode) {
                case 401:

                    $toast.error(statusText, {duration: 1500})
                    break;
                case 422:
                case 417:

                    $toast.error(statusText, {duration: 1500})
                    break;
                case 403:

                    $toast.error(statusText, {duration: 1500})
                    break;
                case 404:

                    $toast.error(statusText, {duration: 1500})
                    break;
                case 500:

                    $toast.error(statusText, {duration: 1500})
                    break;
                default:

            }

            return reject(error)
        })
    })
}
