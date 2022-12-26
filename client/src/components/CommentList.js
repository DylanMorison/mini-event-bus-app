import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([])

  const fetchData = async (postIdToGet) => {
    const { data } = await axios.get(`http://localhost:4001/posts/${postIdToGet}/comments`)
    setComments(data)
  }

  useEffect(() => {
    fetchData(postId)
  }, [postId])

  const renderedComments = comments.map((comment) => <li key={comment.id}>{comment.content}</li>)

  return <ul>{renderedComments}</ul>
}

export default CommentList
