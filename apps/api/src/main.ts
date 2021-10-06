import express from 'express';
const app = express();

app.get('/', (req, res) => res.send('listening on port 8080'));

app.listen(8080, () => console.log('Server ready'));