export default {
    head: {
        title: "nuxt-test-quwi",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            {charset: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
            {hid: "description", name: "description", content: ""}
        ],
        link: [{rel: "icon", type: "image/x-icon", href: "/favicon.ico"}]
    },
    css: ["@/assets/css/global.css"],
    router: {
        middleware: [
            'auth'
        ]
    },
    plugins: [
        '~/plugins/local-storage',
        '~/plugins/axios',
        '~/plugins/simple-validator'
    ],
    components: true,
    buildModules: [
        '@nuxtjs/dotenv'
    ],
    publicRuntimeConfig: {
        axios: {
            baseURL: 'https://api.quwi.com/v2'
        }
    },
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/toast"
    ],
    toast: {
        position: 'top-center',
        register: []
    },
    axios: {},
    build: {}
};
