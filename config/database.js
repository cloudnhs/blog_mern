const mongoose = require('mongoose');




const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}


mongoose
    .connect(process.env.MONGO_URI, options)
    .then(() => console.log("MONGODB connected..."))
    .catch(err => console.log(err.message));
