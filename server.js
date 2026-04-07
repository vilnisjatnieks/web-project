require('dotenv').config();
const app = require('./app');

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3001;

app.listen(port, hostname, function () {
    console.log(`Server running on ${hostname}:${port}`);
});
