const mongoose  = require('mongoose');

const connectDB = async ()=>{
    const checkDB = mongoose.connection.readyState;
    if(checkDB===1){
      console.log('mongodb is already connected');
      return 'mongodb is already connected'
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongoDB is connected');
    }
    catch(e){
         console.log(e,'error');
    }
    
};

module.exports = {
    connectDB
}