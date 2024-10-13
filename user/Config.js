 const localCookieConfig = {
    httpOnly: true

}
 const productionCookieConfig = {

    httpOnly: true,
   // Ensures cookies are sent over HTTPS
    sameSite: 'None', 
}


const corsConfigProduction = {
    origin: 'https://studioflowie.vercel.app',
    credentials: true,
}

const corsConfigLocal = {
    origin: 'http://localhost:3000',
    credentials: true,
}

module.exports = {localCookieConfig, productionCookieConfig,corsConfigProduction,corsConfigLocal}