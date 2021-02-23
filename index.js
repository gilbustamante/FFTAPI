if (process.env.NOVE_ENV !== 'production') {
  require('dotenv').config();
}

/////////////////////////////////
/////////////////////////////////
// TODO: Add express obfuscation 
/////////////////////////////////
/////////////////////////////////

const mongoose = require('mongoose');
const session  = require('express-session');
const flash    = require('connect-flash');
const ejsMate  = require('ejs-mate');
const path     = require('path');
const express  = require('express');
const app      = express();

// Requiring routes
const apiRoutes = require('./routes/api');

// Database connection
const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/fft';
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Database connected.')
});

// Setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // Cookie here if need be
}
app.use(session(sessionConfig));
app.use(flash())

// Locals
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Using Routes
app.use('/api', apiRoutes);

// Temporary index
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server listening...');
});