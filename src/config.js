const development = process.env.WEBPACK;

export default {
    API_URL: development ? "http://localhost:8000" : "/api",
    WS_URL: development ? "ws://localhost:8001/listen" : "/api/ws/listen",
    CLIENT_SECRET: "sMXrq4RV2muu07ERhrllW1uCfH12U4ZNeqyM0L8bmaF9P59prjkIe5mhJJAt47Kod14yhRdg96gEf1m183sblRzyC175eLd7NzsyWS9w6QTyVPdczvTmeHiGBJJPjhGf"
}
