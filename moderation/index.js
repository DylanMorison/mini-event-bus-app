const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  try {
    if (type === 'CommentCreated') {
      const status = data.content.includes('orange') ? 'rejected' : 'approved'

      await axios.post('http://localhost:4005/events', {
        type: 'CommentModeration',
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })

      res.send({})
    }
  } catch (err) {
    console.error(err)
  }
})

app.listen(4003, () => {
  console.log('Moderation service listening on port 4003')
})
