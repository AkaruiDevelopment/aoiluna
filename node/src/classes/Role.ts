import Client from "../client/index.js";
import { RawRoleData, RawRoleTagsData } from "../typings/interface.js";
import { Camelize } from "../typings/types.js";
import { ConvertHexToBigInt, convertToCamelCase } from "../utils/helpers.js";

export default class Role {
  #client: Client;
  color: number;
  hoist: boolean;
  icon: bigint | undefined;
  id: string;
  managed: boolean;
  mentionable: boolean;
  name: string;
  permissions: string;
  position: number;
  tags: Camelize<RawRoleTagsData | undefined>[];
  unicodeEmoji: string | undefined;
  constructor(data: RawRoleData, client: Client) {
    this.#client = client;
    this.color = data.color;
    this.hoist = data.hoist;
    this.icon = data.icon ? ConvertHexToBigInt(data.icon) : undefined;
    this.id = data.id;
    this.managed = data.managed;
    this.mentionable = data.mentionable;
    this.name = data.name;
    this.permissions = data.permissions;
    this.position = data.position;
    this.tags = <Camelize<RawRoleTagsData>[]>convertToCamelCase(data.tags);
    this.unicodeEmoji = data.unicode_emoji;
    this.#clean();
  }
  #clean() {
    for (const key in this) if (this[key] === undefined) delete this[key];
  }
  get [Symbol.toStringTag]() {
    return this.id;
  }
  [Symbol.for('nodejs.util.inspect.custom')](
    depth: any,
    _options: any,
    inspect: any,
  ) {
    // @ts-ignore
    if (depth < 0) return `${this.__proto__.constructor.name} < ${this.id} >`;
    // @ts-ignore
    return `${this.__proto__.constructor.name} < ${this.id} > {
  ${Object.entries(this)
    .map(
      ([key, value]) =>
        `${key}: ${
          typeof value === 'object'
            ? ''
            : (typeof value)[0].toUpperCase() + (typeof value).slice(1)
        } ${
          typeof value === 'object'
            ? inspect(value, { depth: -1 })
            : `< ${value} >`
        }`,
    )
    .join(',\n  ')}
}`;
  }
}