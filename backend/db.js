const mongoose= require('mongoose');
// const mongoURI= "mongodb://127.0.0.1:27017/cloud-notepad";
const mongoURI= "mongodb+srv://uselessemailaryan:oJ5iL5QJkeyUSqyz@cloud-notepad.le9rqva.mongodb.net/?retryWrites=true&w=majority&appName=Cloud-notepad";

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
}

module.exports= connectToMongo;