const Client = require('./dist/cjs/client/index.js').default;
const { writeFileSync, appendFileSync } = require('fs');
const { Intents, GatewayEventNames } = require('./dist/cjs/typings/enums.js');
const { IntentAll } = require('./dist/cjs/utils/libconstants.js');
const client = new Client({
  token:
    'TOKEN',
  intents: IntentAll,
});

const prefix = `.`;

client.on(GatewayEventNames.MessageCreate, async (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;

  if (command === 'ping') {
    client.createMessage(message.channelId, {
      content: 'Pong! ' + client.ws.data.ping,
    });
  } else if (command === 'eval') {
    const code = args.join(' ');
    if (message.author.id !== BigInt("your id")) {
      client.createMessage(message.channelId, {
        content: 'You are not allowed to use this command!',
      });
      return;
    }
    try {
      const evaled = await eval(code);
      let clean =
        typeof evaled === 'object'
          ? require('util').inspect(evaled, { depth: 0, showHidden: true })
          : evaled.toString();
      clean = clean.replaceAll(client.token, 'TOKEN');
      client.createMessage(message.channelId, {
        content: `\`\`\`js\n${clean}\`\`\``,
      });
    } catch (error) {
      console.error(error);
      client.createMessage(message.channelId, {
        content: `\`\`\`js\n${error}\`\`\``,
      });
    }
  } else if (command === 'ram') {
    const msg = Object.entries(process.memoryUsage())
      .map((x) => {
        return `${x[0]}: ${(x[1] / 1024 / 1024).toFixed(2)} MB`;
      })
      .join('\n');
    client.createMessage(message.channelId, {
      content: `\`\`\`js\n${msg}\`\`\``,
    });
  }
});

client.on(GatewayEventNames.Ready, () => {
  console.log('Ready!');
  console.log(
    `Logged in as ${client.readyData.user.tag} and current ping is: ${client.ws.data.ping}`,
  );
});

client.on(GatewayEventNames.Debug, async (data) => {
  console.log(data);
});
