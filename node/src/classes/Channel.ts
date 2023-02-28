import Client from '../client/index.js';
import { ChannelTypes } from '../typings/enums.js';
import {
  RawChannelData,
  RawDefaultReactionData,
  RawOverwriteData,
  RawTagData,
  RawThreadMemberData,
  RawThreadMetadataData,
  RawUserData,
} from '../typings/interface.js';
import { Camelize, snowflake } from '../typings/types.js';
import { ConvertHexToBigInt, convertToCamelCase } from '../utils/helpers.js';

export default class Channel {
  videoQualityMode: number | undefined;
  applicationId: snowflake | undefined;
  appliedTags: string[] | undefined;
  availableTags: RawTagData[] | undefined;
  #client: Client;
  bitrate: number | undefined;
  defaultAutoArchiveDuration: number | undefined;
  defaultForumLayout: number | undefined;
  defaultReactionEmoji: RawDefaultReactionData[] | undefined;
  defaultSortOrder: number | undefined;
  defaultThreadRateLimitPerUser: number | undefined;
  flags: number | undefined;
  guildId: string | undefined;
  icon?: bigint;
  id: string;
  lastMessageId: string | undefined;
  lastPinTimestamp: string | undefined;
  member: RawThreadMemberData | undefined;
  memberCount: number | undefined;
  messageCount: number | undefined;
  name: string | undefined;
  nsfw: boolean | undefined;
  ownerId: string | undefined;
  parentId: string | undefined;
  permissionOverwrites:
    | RawOverwriteData[]
    | Camelize<RawOverwriteData[] | undefined>
    | Camelize<RawOverwriteData[] | undefined>[];
  permissions: string | undefined;
  position: number | undefined;
  rateLimitPerUser: number | undefined;
  recipients: RawUserData[] | undefined;
  rtcRegion: string | undefined;
  threadMetadata:
    | RawThreadMetadataData
    | Camelize<RawThreadMetadataData | undefined>
    | Camelize<RawThreadMetadataData | undefined>[];
  topic: string | null | undefined;
  totalMessageSent: number | undefined;
  type: ChannelTypes;
  userLimit: number | undefined;
  constructor(data: RawChannelData, client: Client) {
    this.#client = client;
    this.applicationId = data.application_id;
    this.appliedTags = data.applied_tags;
    this.availableTags = data.available_tags;
    this.bitrate = data.bitrate;
    this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    this.defaultForumLayout = data.default_forum_layout;
    this.defaultReactionEmoji = data.default_reaction_emoji;
    this.defaultSortOrder = data.default_sort_order;
    this.defaultThreadRateLimitPerUser =
      data.default_thread_rate_limit_per_user;
    this.flags = data.flags;
    this.guildId = data.guild_id;
    this.icon = data.icon ? ConvertHexToBigInt(data.icon) : undefined;
    this.id = data.id;
    this.lastMessageId = data.last_message_id;
    this.lastPinTimestamp = data.last_pin_timestamp;
    this.member = data.member;
    this.memberCount = data.member_count;
    this.messageCount = data.message_count;
    this.name = data.name;
    this.nsfw = data.nsfw;
    this.ownerId = data.owner_id;
    this.parentId = data.parent_id;
    this.permissionOverwrites = convertToCamelCase(data.permission_overwrites);
    this.permissions = data.permissions;
    this.position = data.position;
    this.rateLimitPerUser = data.rate_limit_per_user;
    this.recipients = data.recipients;
    this.rtcRegion = data.rtc_region;
    this.threadMetadata = convertToCamelCase(data.thread_metadata);
    this.topic = data.topic;
    this.totalMessageSent = data.total_message_sent;
    this.type = data.type;
    this.userLimit = data.user_limit;
    this.videoQualityMode = data.video_quality_mode;
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
