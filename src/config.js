export default {
    info: {
        msg: 'Hello World!',
    },
    nav: [
    	['Home', '/'],
        ['About', '/about'],
    ],
    API_URL: process.env.WEBPACK ? "http://localhost:8000" : "/api",

    CLIENT_SECRET: "sMXrq4RV2muu07ERhrllW1uCfH12U4ZNeqyM0L8bmaF9P59prjkIe5mhJJAt47Kod14yhRdg96gEf1m183sblRzyC175eLd7NzsyWS9w6QTyVPdczvTmeHiGBJJPjhGf"
}
