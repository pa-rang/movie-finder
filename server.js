const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
// const request = require('request')
const axios = require('axios')

require('dotenv').config();

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/movies', async ({query : q}, res) => {
    const {query, page} = q;
    const response = await axios('https://openapi.naver.com/v1/search/movie.json',
        {
            params: {
                query: '\"'+query+'\"',
                display: 4,
                start: 4*(page-1)+1,
            },
            headers: {
                'X-Naver-Client-Id': NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
            }
        });

    res.send(response.data);
    console.log('query', query);
})

// request.get({
//     uri: 'https://openapi.naver.com/v1/search/movie.json',
//     qs: option,
//     headers: {
//         'X-Naver-Client-Id': NAVER_CLIENT_ID,
//         'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
//     }
// }, function (err, res, body) {
//     let json = JSON.parse(body)
//     console.log(json)
//     app.get('/api/movies', (req, res) => {
//         res.send(json)
//     })
// })

app.listen(port, () => console.log(`Listening on port ${port}`));


