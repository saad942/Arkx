const express = require('express');
const app = express();
const router = require('./routes/postRoutes');

app.use(express.json());
app.use((req, res, next) => { // the log middleware
    console.log(`method: ${req.method}`);
    console.log(`path: ${req.path}`);
    next();
});

app.use('/mvc', router); // corrected line

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send(err);
});

app.listen(3000, () => {
    console.log('server listening on port 3000');
});
