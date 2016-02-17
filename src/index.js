/* eslint-disable no-console, no-process-exit, no-process-env */
const express = require('express')
const keypress = require('keypress')
const SseChannel = require('sse-channel')

const port = process.env.PORT || 9876
const app = express()
const channel = new SseChannel({jsonEncode: true})

app.get('/v1/devices/:deviceId/events', (req, res) => channel.addClient(req, res))

app.listen(port, () => console.log('Listening on http://localhost:%s/', port))

keypress(process.stdin)

process.stdin.on('keypress', (ch, key) => {
  if (key && key.ctrl && key.name == 'c') {
    process.exit(0)
  }

  if (key && key.name === 'r') {
    console.log('red goal sent')
    channel.send(getGoalEvent('red'))
  } else if (key && key.name === 'b') {
    console.log('blue goal sent')
    channel.send(getGoalEvent('blue'))
  }
})

process.stdin.setRawMode(true)
process.stdin.resume()

console.log('Press `r` for red goal, `b` for blue goal, `ctrl`+`c` to exit')

function getGoalEvent(team) {
  return {
    event: 'goal',
    data: {
      data: team,
      ttl: '60',
      published_at: (new Date()).toISOString(), // eslint-disable-line camelcase
      coreid: 'f000ba000c4c343431311011'
    }
  }
}
