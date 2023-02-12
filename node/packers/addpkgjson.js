const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const { inspect } = require('util');
fs.writeFileSync(
  path.join(__dirname, '../src/utils/libconstants.ts'),
  `
import { Intents } from "../typings/enums.js";
const DiscordApi = 'https://discord.com/api/v10';
const pack = ${inspect(pkg, { depth: Infinity })} as const;

const userAgent =
  \`DiscordBot (\${pack.homepage}, \${pack.version})\` as const;

const Intentslist = <number[]> Object.values( Intents ).filter( x => typeof x === 'number' );

const IntentAll = Intentslist.reduce( ( a, b ) => a | b, 0 );

export { DiscordApi, userAgent,IntentAll };
`,
);
