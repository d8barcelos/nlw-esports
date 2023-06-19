import express from "express";

const app = express()

app.get('/ads', (request, response) => {
  return response.json([
    { id : 1, name: '1' },
    { id : 2, name: '2' },
    { id : 3, name: '3' },
    { id : 4, name: '4' }
  ])
})

app.listen(3333)