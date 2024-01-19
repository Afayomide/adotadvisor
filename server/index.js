const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User =require("./models/user")
var bodyParser = require('body-parser');
const Instruments = require("./models/intruments")
const jwt = require('jsonwebtoken');





const dburl = "mongodb+srv://daraseyi086:daraseyi086@customer.ovxpbot.mongodb.net/?retryWrites=true&w=majority"
// const dburl ="mongodb+srv://daraseyi086:Vestord33@cluster0.l5besuy.mongodb.net/?retryWrites=true&w=majority"
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},console.log("connected")
);

app.use(bodyParser());

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());

app.get("/", (req,res)=>{
  res.send("hello")
})
const secretKey = "9ffbceda69ff903370209d5029c4416b4890df44f9c19962430765595735a57d"
const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ authenticated: false, message: 'No token provided' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    // Decode the JWT token to get user information
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;  // Attach the decoded user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ authenticated: false, message: 'Invalid token' });
  }
};


function generateToken(user) {
  return jwt.sign({ sub: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
}


app.get("/", (req,res)=>{
  res.send("hello")
})

app.post("/api/login", async (req,res) =>{
 
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    req.app.set("name", username) 
    if (user) {
      const token = generateToken(user);
      res.cookie('token', token, { httpOnly: true });
      res.json({ success: true, token});
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } 
  catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

})

app.get('/api/instruments', async (req, res) => {
  try {
    const instruments = await Instruments.find();
    res.json(instruments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post("/api/signup", async(req,res)=>{
 
  const {fullname,username,email,password} = req.body
  const user = new User({
    fullname,
    username,
    email,
    password
  }) 
  if (!username || !password || !fullname || !email) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }
  else{
    res.json({ success: true});
  }

  // Check if the username is already taken
  // if (user.some((user) => user.username === username)) {
  //   return res.status(409).json({ success: false, message: 'Username is already taken' });
  // }
  await user.save()
  // req.flash("success", "signup success, you can now login")
})
app.get('/api/user', (req, res) => {
  let name = res.app.get("name")
  res.json({ success: true, message: 'User route is protected', name});
});

app.post('/api/search', async (req, res) => {
  const { level } = req.body;

  try {
    // Query MongoDB based on user input
    const result = await Instruments.find({ RiskScore: level });

    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

app.get('/api/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user});
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
