export default function ({store, redirect}) {
    if (!store.getters['auth/isAuthenticated'] && process.server) {
        redirect('/login')
    }
}
