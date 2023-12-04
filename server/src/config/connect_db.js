const mongoose = require('mongoose');

const connectDb = async function(){
   await mongoose.connect(process.env.MongoDb)      
    .then(() => {
        console.log("success connect MongoDB");
    })
    .catch((error) => {
        console.error("failure connect MongoDB:", error);
    });
}
module.exports = connectDb