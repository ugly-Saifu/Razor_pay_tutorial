const express = require('express');
const cors = require('cors');
const router = require('./routes/payments.routes');
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use('/api',router)

app.get('/', (req, res) => {
    res.send("Hello Folks");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})