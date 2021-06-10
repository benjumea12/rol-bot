const { Client, MessageEmbed } = require('discord.js')
const client = new Client()

const PORCENTAJE = parseInt(process.env.PORCENTAJE) || 70
const TOKEN = process.env.TOKEN

client.on('ready', async () => { console.log(`Bot is ready as ${client.user.tag}!`) })

client.on('message', async msg => {
  const variabilidad = (max, min, author) => {
    let value
    const mitad = Math.round(max / 2)
    const option = Math.floor(Math.random() * (100 - 1 + 1)) + 1

    if (author !== 'Dante') {
      if (PORCENTAJE >= option) {
        value = Math.floor(Math.random() * (max - mitad + 1)) + mitad
      } else {
        value = Math.floor(Math.random() * ((mitad - 1) - min + 1)) + min
      }
    } else {
      value = Math.floor(Math.random() * (max - min + 1)) + min
    }

    return value
  }

  if (msg.content.includes('.turno', 0)) {
    let min, max, color
    const array = msg.content.split(' ')

    if (array.length == 1 || array[1] == '10') {
      min = 0
      max = 9
      color = '#0099ff'
    } else {
      min = 1
      max = parseInt(array[1])
      color = '#ff0000'
    }

    const turno = variabilidad(max, min, msg.author.username)
    const embed = new MessageEmbed().setColor(color).setTitle(`🎲     ${turno}`)

    msg.reply('Lanzando dado...')
    setTimeout(() => msg.channel.send(embed), 3000)
  }

  if (msg.content === '.limpiar') {
    const feched = await msg.channel.messages.fetch()
    const embed = new MessageEmbed().setColor('#c100ff').setTitle("¡Estoy listo para una nueva partida!")

    msg.channel.bulkDelete(feched)
    msg.channel.send(embed)
  }
})

client.login(TOKEN)
