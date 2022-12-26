const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
  const event = req.body

  try {
    const p1 = axios.post('http://localhost:4000/events', event) // posts service
    const p2 = axios.post('http://localhost:4001/events', event) // comments service
    const p3 = axios.post('http://localhost:4002/events', event) // query service
    const p4 = axios.post('http://localhost:4003/events', event) // moderation service
    await Promise.all([p1, p2, p3, p4])
    res.send({ status: 'OK' })
  } catch (err) {
    console.error(err)
  }
})

app.listen(4005, () => {
  console.log('event bus listening on port 4005!')
})
