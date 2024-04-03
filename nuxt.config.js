const BASE_URL = process.env.BASE_URL || "http://dphe.test/";
const API_BASE_URL = process.env.API_BASE_URL || "http://dphe.test/api/";
const SERVER_STORAGE_URL = process.env.SERVER_STORAGE_URL || "http://localhost:8010/storage/";
const BACKEND_URL = process.env.BACKEND_URL || "http://dphe.test/";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000/";

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            baseUrl: BASE_URL,
            apiBaseUrl: API_BASE_URL,
            serverStorageUrl: SERVER_STORAGE_URL,
            backendUrl: BACKEND_URL,
            frontendUrl: FRONTEND_URL,
        },
    },
    ssr: false,
    fetch: {
        baseUrl: API_BASE_URL,
    },
    modules: [
        "nuxt-lodash",
        [
            "@vee-validate/nuxt",
            {
                // disable or enable auto imports
                autoImports: true,

                // Use different names for components
                componentNames: {
                    Form: "VeeForm",
                    Field: "VeeField",
                    FieldArray: "VeeFieldArray",
                    ErrorMessage: "VeeErrorMessage",
                },
            },
        ],
        [
            "@pinia/nuxt",
            {
                autoImports: ["defineStore", "acceptHMRUpdate"],
            },
        ],
    ],
    lodash: {
        prefix: "_",
        prefixSkip: false,
        upperAfterPrefix: false,
        exclude: [],
        alias: [
            ["camelCase", "stringToCamelCase"], // => stringToCamelCase
            ["kebabCase", "stringToKebab"], // => stringToKebab
            ["isDate", "isLodashDate"], // => _isLodashDate
        ],
    },
    app: {
        head: {
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    charset: "utf-8",
                },
            ],
            script: [
                { src: "plugins/jquery/jquery.min.js" },
                { src: "plugins/jquery-ui/jquery-ui.min.js" },
                { src: "scripts.js" },
                { src: "plugins/bootstrap/js/bootstrap.bundle.min.js" },
                { src: "dist/js/adminlte.js" },
            ],

            link: [
                { rel: "icon", type: "image/x-icon", href: "favicon.png" },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback",
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "style.css",
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "plugins/fontawesome-free/css/all.min.css",
                },
                {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "dist/css/adminlte.min.css",
                },
            ],
        },
    },
});