const express = require('express');
const app = express()
const cors = require('cors')
const routes = require('./routes');
const bodyParser = require('body-parser');
const pages = require(`./routes/pages`);
const port = 5001;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cors())

app.use(express.static(__dirname + '/public'));

app.use('/api', routes);

app.use(pages);

app.set('view engine', 'ejs');

app.use(routes);

app.listen(port, () => {
    console.log(`Server listen: ${port} port`)
})

app.get('/', async (req, res) => {
    res.send('ok');
})
