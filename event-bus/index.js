const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
  const event = req.body

  try {
    const p1 = axios.post('http://localhost:4000/events', event)
    const p2 = axios.post('http://localhost:4001/events', event)
    const p3 = axios.post('http://localhost:4002/events', event)
    await Promise.all([p1, p2, p3])
    res.send({ status: 'OK' })
  } catch (err) {
    console.error(err)
  }
})

app.listen(4005, () => {
  console.log('event bus listening on port 4005!')
})
