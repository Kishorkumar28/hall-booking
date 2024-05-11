const mongoose = require("mongoose")
const db_URL = "mongodb://localhost:27017"
mongoose.connect(db_URL).then(
    function(response) {
        console.log("connected to db")
    }
).catch((err)=>{
    console.log(err)
})