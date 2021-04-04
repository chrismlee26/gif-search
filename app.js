// Require Libraries
const express = require('express'); // initialize
const Tenor = require("tenorjs").client({
  // Replace with your own key
  "Key": "FFW82BDQX8XO", // https://tenor.com/developer/keyregistration
  "Filter": "high", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});

// App Setup
const app = express(); // define 

// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Routes
// app.get('/', (req, res) => {
//   const gifUrl = 'https://media1.tenor.com/images/561c988433b8d71d378c9ccb4b719b6c/tenor.gif?itemid=10058245'
//   res.render('hello-gif', { gifUrl });
// });

app.get('/', (req, res) => { //request, response.  req: get forms .params: routes .res: responses
  console.log(req.query) // callback fn

  term = ""
  if (req.query.term) {
    term = req.query.term
  }
  Tenor.Search.Query(term, "10")
    .then(response => {
      const gifs = response;
      res.render('home', { gifs })
    }).catch(console.error);
})

app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
})


// Start Server

app.listen(3000, () => { // tells the server to start listening
  console.log('Gif Search listening on port localhost:3000!');
});