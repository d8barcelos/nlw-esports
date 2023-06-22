import express from "express";
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from "./utils/convert-hours-string-to-minutes";

const app = express()

app.use(express.json())

const prisma = new PrismaClient({
  log: ['query']
})

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })

  return response.json([games]);
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  return response.status(201).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {

  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true, 
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    orderBy: {
      createdAt: 'desc',
    },
    where: {gameId,}
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(',')
    }
  }))
})

app.get('/ads/:id/discord', async (request, response) => {

  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId,
    },
    select: {
      discord: true,
    }
  })

  return response.json({
    discord: ad.discord,
  })
})

app.listen(3333)

