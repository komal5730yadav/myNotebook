const mongoose =require ('mongoose');

const mongoURI="mongodb://127.0.0.1:27017/myNotebook?directConnection=true"

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to mongo successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
   };
    
module.exports = connectToMongo;

