
import { Intents } from "../typings/enums.js";
const DiscordApi = 'https://discord.com/api/v10';
const pack = {
  name: 'uzumi',
  version: '0.0.1',
  description: 'A library to interact with discord api easily ',
  main: './dist/cjs/index.js',
  exports: { import: './dist/esm/index.js', require: './dist/cjs/index.js' },
  scripts: {
    test: 'node tests',
    start: 'node index.js',
    build: 'npm run addpkg && tsc -p tsconfig.esm.json && tsc -p tsconfig.cjs.json && npm run createpack',
    createpack: 'node packers/pack.js',
    addpkg: 'node packers/addpkgjson.js',
    bundleTsFiles: 'node packers/bundle.js',
    lint: 'eslint . --ext .ts --fix --ext .js'
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/akaruidevelopment/dapi.git'
  },
  keywords: [ 'discord-api', 'discord', 'api', 'nodejs', 'deno', 'discordbot' ],
  author: 'Akarui Development',
  license: 'Apache-2.0',
  bugs: { url: 'https://github.com/akaruidevelopment/dapi/issues' },
  homepage: 'https://github.com/akaruidevelopment/dapi#readme',
  devDependencies: {
    '@types/node': '^18.11.18',
    '@types/ws': '^8.5.4',
    typescript: '^4.9.4'
  },
  dependencies: { 'file-type': '^18.2.0', ws: '^8.12.0' }
} as const;

const userAgent =
  `DiscordBot (${pack.homepage}, ${pack.version})` as const;

const Intentslist = <number[]> Object.values( Intents ).filter( x => typeof x === 'number' );

const IntentAll = Intentslist.reduce( ( a, b ) => a | b, 0 );

export { DiscordApi, userAgent,IntentAll };
