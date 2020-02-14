const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const request = require('request')
const NAVER_CLIENT_ID = '4NPKg_5FrZVxNx959TKz'
const NAVER_CLIENT_SECRET = 'HwQwSnn63q'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const option = {
query: '어벤져스',
display: 4,
start: 1,
}
request.get({
    uri: 'https://openapi.naver.com/v1/search/movie.json',
    qs: option,
    headers: {
        'X-Naver-Client-Id':NAVER_CLIENT_ID,
        'X-Naver-Client-Secret':NAVER_CLIENT_SECRET
    }
}, function(err, res, body) {
    let json = JSON.parse(body)
    console.log(json)
    app.get('/api/movies', (req, res) => {
        res.send(json)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));


