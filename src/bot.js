require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });

const PREFIX = '$';


client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
});

  client.on('message', (message) => {
    if (message.author.bot) return;
    if(message.content === 'hello') {
        message.reply('hello there');
    }
  });


client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (CMD_NAME === 'kick') {
      if (!message.member.permissions.has('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      if (args.length === 0)
        return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => message.channel.send('I cannot kick that user :('));
      } else {
        message.channel.send('That member was not found');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.permissions.has('BAN_MEMBERS'))
        return message.reply("You do not have permissions to use that command");
      if (args.length === 0) return message.reply("Please provide an ID");
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User was banned successfully');
      } catch (err) {
        console.log(err);
        message.channel.send('An error occured. Either I do not have permissions or the user was not found');
      }
    }
  }
})

client.on('messageReactionAdd', (reaction, user) => {
  console.log("yess");
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '954308304643969044') {

    switch (name) {
      case '🍎':
        member.roles.add('951093500659785738');
        break;
      case '🍌':
        member.roles.add('951093447236931614');
        break;
      case '🍇':
        member.roles.add('951093210246184970');
        break;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '954308304643969044') {
    switch (name) {
      case '🍎':
        member.roles.remove('951093500659785738');
        break;
      case '🍌':
        member.roles.remove('951093447236931614');
        break;
      case '🍇':
        member.roles.remove('951093210246184970');
        break;
    }
  }
});


client.login(process.env.DISCORDJS_BOT_TOKEN);