const  express  = require('express')  ; 
const cors  = require('cors')  ;  
const  app  = express() ;  
const port    =  process.env.PORT   || 3000   ; 
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urls');

// Connect to MongoDB
connectDB();

// MIDDLEWARE  
app.use(cors())  ; 
app.use(express.json() )  ; 

// Routes
app.use('/api', urlRoutes);

// ROUTES Placeholder 
app.get('/' ,   (req , res ) => {
    res.send('URL Shortening Service API')  ;   

})

// START  SERVER 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});