import User from '../classes/User.js';
import { GatewayEventNames } from '../typings/enums.js';
import {
  ApplicationRoleConnectionMetadata,
  AutoModerationRule,
  ClientOptions,
  MessagePayload,
  RawApplicationData,
  RawChannelData,
  requestOptions,
} from '../typings/interface.js';
import { Camelize, ClientEvents, Snowflake } from '../typings/types.js';
import Websocket from '../websocket/index.js';
import Api from '../utils/api.js';
import QueueManager from '../request/queue.js';
import request from '../request/index.js';
import {
  convertToCamelCase,
  createNullObject,
  returnMessagePayload,
} from '../utils/helpers.js';
import Message from '../classes/Message.js';
export default class Client {
  #options: ClientOptions;
  ws: Websocket;
  #on: Partial<Record<GatewayEventNames, Function[]>> = {};
  api: typeof Api = Api;
  readyData!: {
    user: User;
    guilds: { id: string; unavailable?: boolean | undefined }[];
    resumeGatewayUrl: string;
    shard: [number, number] | undefined;
    sessionId: string;
    application: Camelize<RawApplicationData>;
  };
  queue: QueueManager;

  constructor(options: ClientOptions) {
    this.#options = options;
    this.ws = new Websocket(this);
    this.queue = new QueueManager(this);
  }

  get token() {
    return this.#options.token;
  }

  get intents() {
    return this.#options.intents;
  }

  get options() {
    return this.#options;
  }

  on<T extends GatewayEventNames>(event: T, callback: ClientEvents<T>) {
    if (!this.#on[event]) {
      this.#on[event] = [];
    }
    this.#on[event]?.push(callback);
  }

  get __on__() {
    return this.#on;
  }

  emit(event: GatewayEventNames, ...args: unknown[]) {
    for (const f of this.#on[event] ?? []) {
      f(...args);
    }
  }
  // ApplicationRoleConnectionMetadata
  async getApplicationRoleConnectionMetadataRecords(appId?: Snowflake) {
    const builtApi = this.api()
      .applications(appId ?? this.readyData.user.id, `role-connections`)
      .metadata()
      .get();
    const data: requestOptions = createNullObject();
    data.url = builtApi.api;
    data.route = builtApi.route;
    data.method = builtApi.method;
    const res = await request(data, this);
    return convertToCamelCase(res);
  }
  async updateApplicationRoleConnectionMetadataRecords(
    data: ApplicationRoleConnectionMetadata,
    appId?: Snowflake,
  ) {
    const builtApi = this.api()
      .applications(appId ?? this.readyData.user.id, `role-connections`)
      .metadata()
      .patch();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;
    const res = await request(req, this);
    return convertToCamelCase(res);
  }
  async getGuildAuditLogs(guildId: Snowflake) {
    const builtApi = this.api().guilds(guildId)['audit-logs']().get();
    const data: requestOptions = createNullObject();
    data.url = builtApi.api;
    data.route = builtApi.route;
    data.method = builtApi.method;
    const res = await request(data, this);
    return convertToCamelCase(res);
  }

  async listAutoModerationRules(guildId: Snowflake) {
    const builtApi = this.api()
      .guilds(guildId)
      ['auto-moderation']()
      .rules()
      .get();
    const data: requestOptions = createNullObject();
    data.url = builtApi.api;
    data.route = builtApi.route;
    data.method = builtApi.method;
    const res = await request(data, this);
    return convertToCamelCase(res);
  }
  async getAutoModerationRule(guildId: Snowflake, ruleId: Snowflake) {
    const builtApi = this.api()
      .guilds(guildId)
      ['auto-moderation']()
      .rules(ruleId)
      .get();
    const data: requestOptions = createNullObject();
    data.url = builtApi.api;
    data.route = builtApi.route;
    data.method = builtApi.method;
    const res = await request(data, this);
    return convertToCamelCase(res);
  }
  async createAutoModerationRule(
    guildId: Snowflake,
    data: AutoModerationRule,
    reason?: string,
  ) {
    const builtApi = this.api()
      .guilds(guildId)
      ['auto-moderation']()
      .rules()
      .post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async updateAutoModerationRule(
    guildId: Snowflake,
    ruleId: Snowflake,
    data: AutoModerationRule,
    reason?: string,
  ) {
    const builtApi = this.api()
      .guilds(guildId)
      ['auto-moderation']()
      .rules(ruleId)
      .patch();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async deleteAutoModerationRule(
    guildId: Snowflake,
    ruleId: Snowflake,
    reason?: string,
  ) {
    const builtApi = this.api()
      .guilds(guildId)
      ['auto-moderation']()
      .rules(ruleId)
      .delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async getChannel(channelId: Snowflake) {
    const builtApi = this.api().channels(channelId).get();
    const data: requestOptions = createNullObject();
    data.url = builtApi.api;
    data.route = builtApi.route;
    data.method = builtApi.method;
    const res = await request(data, this);
    return convertToCamelCase(res);
  }

  async updateChannel(
    channelId: Snowflake,
    data: Camelize<RawChannelData>,
    reason?: string,
  ) {
    const builtApi = this.api().channels(channelId).patch();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async deleteChannel(channelId: Snowflake, reason?: string) {
    const builtApi = this.api().channels(channelId).delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async getChannelMessages(
    channelId: Snowflake,
    options?: ChannelMergerOptions,
  ) {
    const builtApi = this.api().channels(channelId).messages().get();
    const data: requestOptions = createNullObject();
    data.url = builtApi.api;
    data.route = builtApi.route;
    data.method = builtApi.method;
    data.params = options;
    const res = await request(data, this);
    return convertToCamelCase(res);
  }

  async getChannelMessage(channelId: Snowflake, messageId: Snowflake) {
    const builtApi = this.api().channels(channelId).messages(messageId).get();
    const data: requestOptions = createNullObject();

    data.url = builtApi.api;
    data.route = builtApi.route;
    data.method = builtApi.method;

    const res = await request(data, this);
    return convertToCamelCase(res);
  }

  async createMessage(
    channelId: Snowflake,
    data: MessagePayload,
    reason?: string,
  ) {
    const builtApi = this.api().channels(channelId).messages().post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;

    const payload = await returnMessagePayload(data);
    req.params = payload;
    let res;
    if (payload instanceof FormData)
      res = await request(req, this, {
        'Content-Type': undefined,
      });
    else res = await request(req, this);
    return new Message(res, this);
  }

  async crosspostMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    reason?: string,
  ) {
    const builtApi = this.api()
      .channels(channelId)
      .messages(messageId)
      .crosspost()
      .post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async deleteMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    reason?: string,
  ) {
    const builtApi = this.api()
      .channels(channelId)
      .messages(messageId)
      .delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async createReaction({
    channelId,
    messageId,
    emoji,
  }: {
    channelId: Snowflake;
    messageId: Snowflake;
    emoji: string;
  }) {
    const builtApi = this.api()
      .channels(channelId)
      .messages(messageId)
      .reactions(encodeURIComponent(emoji))
      .put();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async deleteOwnReaction({
    channelId,
    messageId,
    emoji,
  }: {
    channelId: Snowflake;
    messageId: Snowflake;
    emoji: string;
  }) {
    const builtApi = this.api()
      .channels(channelId)
      .messages(messageId)
      .reactions(encodeURIComponent(emoji))
      .me()
      .delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async deleteReaction({
    channelId,
    messageId,
    emoji,
    userId,
  }: {
    channelId: Snowflake;
    messageId: Snowflake;
    emoji: string;
    userId: Snowflake;
  }) {
    const builtApi = this.api()
      .channels(channelId)
      .messages(messageId)
      .reactions(encodeURIComponent(emoji))
      .users(userId)
      .delete();
  }
}
