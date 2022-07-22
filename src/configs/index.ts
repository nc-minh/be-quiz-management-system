
let port = process.env.PORT || 3333
let connectDB = process.env.CLOUD || 'No database uri'
export default {
    port,
    connectDB: connectDB
}