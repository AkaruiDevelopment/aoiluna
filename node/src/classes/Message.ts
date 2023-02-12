import Client from '../client/index.js';
import {
  RawApplicationData,
  RawAttachmentData,
  RawChannelData,
  RawChannelMentionData,
  RawEmbedData,
  RawMessageActivityData,
  RawMessageComponentData,
  RawMessageData,
  RawMessageInteractionData,
  RawMessageReferenceData,
  RawReactionData,
  RawRoleData,
  RawRoleSubscriptionData,
  RawStickerData,
  RawStickerItemData,
  RawUserData,
} from '../typings/interface.js';
import { convertToCamelCase } from '../utils/helpers.js';
import User from './User.js';
import { Camelize, Snowflake } from '../typings/types.js';

export default class Message {
  #client!: Client;
  activity:
    | Camelize<RawMessageActivityData | undefined>
    | Camelize<RawMessageActivityData | undefined>[];

  application:
    | Camelize<RawApplicationData | undefined>
    | Camelize<RawApplicationData | undefined>[];

  application_id?: bigint | undefined;
  attachments: Camelize<RawAttachmentData[]> | Camelize<RawAttachmentData[]>[];

  author: User;
  channelId: bigint;
  components:
    | Camelize<RawMessageComponentData[] | undefined>
    | Camelize<RawMessageComponentData[] | undefined>[];

  content: string;
  editedTimestamp: any;
  embeds: Camelize<RawEmbedData[]> | Camelize<RawEmbedData[]>[];
  flags: number | undefined;
  id: bigint;
  interaction:
    | Camelize<RawMessageInteractionData | undefined>
    | Camelize<RawMessageInteractionData | undefined>[];

  messageReference:
    | Camelize<RawMessageReferenceData | undefined>
    | Camelize<RawMessageReferenceData | undefined>[];

  nonce: string | bigint | undefined;
  pinned: boolean;
  reactions:
    | Camelize<RawReactionData[] | undefined>
    | Camelize<RawReactionData[] | undefined>[];

  referencedMessage: Message | undefined;
  stickers:
    | Camelize<RawStickerData[] | undefined>
    | Camelize<RawStickerData[] | undefined>[];

  stickerItems:
    | Camelize<RawStickerItemData[] | undefined>
    | Camelize<RawStickerItemData[] | undefined>[];

  timestamp: string;
  tts: boolean;
  type: number;
  roleSubscriptionData:
    | Camelize<RawRoleSubscriptionData | undefined>
    | Camelize<RawRoleSubscriptionData | undefined>[];

  webhookId?: bigint | undefined;
  thread:
    | Camelize<RawChannelData | undefined>
    | Camelize<RawChannelData | undefined>[];
  mentions: {
    everyone: boolean;
    roles?: Snowflake[];
    users: Camelize<RawUserData>[];
    channels?: Camelize<RawChannelMentionData>[];
  };

  constructor(data: RawMessageData, client: Client) {
    this.#client = client;
    this.activity = convertToCamelCase(data.activity);
    this.application = <Camelize<RawApplicationData>>(
      convertToCamelCase(data.application)
    );
    this.application_id = data.application_id
      ? BigInt(data.application_id)
      : undefined;
    this.attachments = convertToCamelCase(data.attachments);
    this.author = new User(data.author, client);
    this.channelId = BigInt(data.channel_id);
    this.components = convertToCamelCase(data.components);
    this.content = data.content;
    this.editedTimestamp = data.edited_timestamp;
    this.embeds = convertToCamelCase(data.embeds);
    this.flags = data.flags;
    this.id = BigInt(data.id);
    this.interaction = convertToCamelCase(data.interaction);
    this.mentions = {
      everyone: data.mention_everyone ?? false,
      roles: data.mention_roles.map((x) => BigInt(x)) ?? [],
      users: <Camelize<RawUserData>[]>convertToCamelCase(data.mentions) ?? [],
      channels:
        <Camelize<RawChannelMentionData>[] | undefined>(
          convertToCamelCase(data.mention_channels)
        ) ?? [],
    };
    this.messageReference = <Camelize<RawMessageReferenceData>>(
      convertToCamelCase(data.message_reference)
    );
    this.nonce = data.nonce
      ? !isNaN(Number(data.nonce))
        ? BigInt(data.nonce)
        : <string>data.nonce
      : undefined;
    this.pinned = data.pinned;
    this.reactions = convertToCamelCase(data.reactions);
    this.referencedMessage = data.referenced_message
      ? new Message(data.referenced_message, client)
      : undefined;
    this.stickers = convertToCamelCase(data.stickers);
    this.stickerItems = convertToCamelCase(data.sticker_items);
    this.timestamp = data.timestamp;
    this.tts = data.tts;
    this.type = data.type;
    this.roleSubscriptionData = <Camelize<RawRoleSubscriptionData>>(
      convertToCamelCase(data.role_subscription_data)
    );
    this.webhookId = data.webhook_id ? BigInt(data.webhook_id) : undefined;
    this.thread = convertToCamelCase(data.thread);
    this.#clean();
  }

  #clean() {
    for (const key in this) if (this[key] === undefined) delete this[key];
  }

  delete() {
    return this.#client.deleteMessage(this.channelId, this.id);
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
    return `User < ${this.id} > {
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
