require('dotenv').config();
const app = require('./app');
const dbcon = require('./model/DbConnection');
dbcon.connect();

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3001;

app.listen(port, hostname, function () {
    console.log(`Server running on ${hostname}:${port}`);
});
