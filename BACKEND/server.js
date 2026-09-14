require('dotenv').config();

const app= require('./src/app');
const connectDB= require('./src/config/database');
const dns = require("dns");
const generateinterviewReport = require('./src/services/ai.service');
const { resume, selfDescription, jobDescription }=require("./src/services/temp")


dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

connectDB();

generateinterviewReport(resume,selfDescription,jobDescription);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
