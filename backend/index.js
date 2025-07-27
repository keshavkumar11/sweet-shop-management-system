const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = 5000

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("DB Connected");
    app.listen(port,()=>{
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch((err)=>{
    console.error("DB connection failed: ",err.message);
})

