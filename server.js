const express = require('express')
const app = express();

app.use(express.static('website'))

const port = 5000;

app.listen(port, () => {
    console.log(`running on port ${port}`)
})

app.get('/', (req, res) => {
    res.sendFile('website/index.html')
})