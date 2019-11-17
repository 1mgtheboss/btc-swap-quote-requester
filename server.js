// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

var redshiftJs = require("@radar/redshift.js");

app.post("/request-quote", async function(req, res) {
  try {
    const client = new redshiftJs.WebSocketClient();

    await client.connect();

    const quote = await client.requestQuote({
      market: redshiftJs.Market.BTC_LBTC, // bitcoin <-> lightning bitcoin
      invoice: req.body["invoice"],

      refundAddress: req.body["refund-address"]
    });

    
    res.send(quote);
  } catch (error) {
    
    res.send(error);
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
