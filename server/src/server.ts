import express from "express";
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.get('/games', (request, response) => {
  const games = prisma.game.findMany()

  return response.json([]);
})

app.post('/ads', (request, response) => {
  return response.status(201).json([]);
})

app.get('/games/:id/ads', (request, response) => {

  //const gameId = request.params.id;

  return response.json([
    { id : 1, name: '1' },
    { id : 2, name: '2' },
    { id : 3, name: '3' },
    { id : 4, name: '4' },
    { id : 5, name: '5' },
  ])
})

app.get('/games/:id/discord', (request, response) => {

  //const adId = request.params.id;

  return response.json([])
})

app.listen(3333)

