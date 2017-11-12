export default {
    info: {
        msg: 'Hello World!',
    },
    nav: [
    	['Home', '/'],
        ['About', '/about'],
    ],
    API_URL: process.env.WEBPACK ? "http://localhost:8000" : "/api"
}
