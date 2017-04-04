const express = require('express')
const fs = require('fs')

const app = express()
const port = 80

app.use(express.static(`${__dirname}/dist`))

app.get('/', (req, res) => {
  res.redirect('/')
})

// NOTE: IP SCRUBBER
app.get('/scrubber/*', (req, res) => {
  let connection = req.connection
  let url = req.url
  let urlText = url.slice(10)
  if (urlText !== 'favicon.ico') {
    let ip = connection.remoteAddress
    let parsedIp = parseIp(ip)
    if (!parsedIp.startsWith('104.19')) {
      // if !discord
      // fs create/append /storage/scrubber_logs.txt
      console.log(`${urlText} connected from ip: ${parsedIp}`)
    }
    res.redirect('/')
    // res.send(`Thanks for telling me that your ip address is ${parsedIp} :)`)
  }
})
app.get('/scrublogs', (req, res) => {
  let logs =   // fs readfile /storage/scrubber_logs.txt
  res.send(logs)
})
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

// fuctions
function parseIp (ipString) {
  if (ipString.startsWith('::ffff:')) return ipString.slice(7)
}
