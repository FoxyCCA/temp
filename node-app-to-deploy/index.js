const express = require('express');
const axios = require('axios')
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get("/", async function (req, res) {
    let page = 0;
    let size = 12;

    if (req.query.page) {
        page = req.query.page
    }

    if (req.query.size) {
        size = req.query.size
    }

    const api = await queryPage(page, size)
    res.render("index", { data: api.data })
})

async function queryPage(page = 0, size = 12) {
    return await axios.get(`https://flight.pequla.com/api/flight?page=${page}&size=${size}&sort=scheduledAt,asc`)
}

app.get("/about", async function (req, res) {
    res.render("about")
})

app.listen(3000)