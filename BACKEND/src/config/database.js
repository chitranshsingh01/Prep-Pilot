const mongoose= require('mongoose');
const dotenv= require('dotenv');    

async function connectDB(){
    try{await mongoose.connect(process.env.MONGO_URI)
   console.log('Database connected successfully');
} catch (error) {
    console.error('Error connecting to database:', error);
}
}

module.exports= connectDB;