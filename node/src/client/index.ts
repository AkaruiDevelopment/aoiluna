import User from '../classes/User.js';
import { GatewayEventNames } from '../typings/enums.js';
import {
  ApplicationRoleConnectionMetadata,
  AutoModerationRule,
  ClientOptions,
  CreateChannelInvitePayload,
  EditChannelPermissionsPayload,
  GroupDMAddRecipientPayload,
  MessagePayload,
  RawApplicationData,
  RawChannelData,
  RawInviteData,
  RawMessageData,
  RawUserData,
  StartThreadInForumPayload,
  StartThreadPayload,
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
import Invite from '../classes/Invite.js';
import Channel from '../classes/Channel.js';
import Member from '../classes/Member.js';
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
      .reactions( encodeURIComponent( emoji ) )
      ['@me']()
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

    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async getReactions({
    channelId,
    messageId,
    emoji,
    options,
  }: {
    channelId: Snowflake;
    messageId: Snowflake;
    emoji: string;
    options?: { after?: Snowflake; limit?: number };
  }) {
    const builtApi = this.api()
      .channels(channelId)
      .messages(messageId)
      .reactions(encodeURIComponent(emoji))
      .get();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = options;

    const res = await request(req, this);
    return res.map((x: RawUserData) => new User(x, this));
  }

  async deleteAllReactions(channelId: Snowflake, messageId: Snowflake) {
    const builtApi = this.api()
      .channels(channelId)
      .messages(messageId)
      .reactions()
      .delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }
  async deleteAllReactionsForEmoji({
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
      .delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async editMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    data: MessagePayload,
  ) {
    const builtApi = this.api().channels(channelId).messages(messageId).patch();
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

  async deleteBulkMessages(
    channelId: Snowflake,
    messageIds: Snowflake[],
    reason?: string,
  ) {
    const builtApi = this.api()
      .channels(channelId)
      .messages()
      .bulkDelete()
      .post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = { messages: messageIds };

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async editChannelPermissions(
    channelId: Snowflake,
    overwriteId: Snowflake,
    data: EditChannelPermissionsPayload,
    reason?: string,
  ) {
    const builtApi = this.api()
      .channels(channelId)
      .permissions(overwriteId)
      .put();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;
    req.auditLogReason = reason;
    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async getChannelInvites(channelId: Snowflake) {
    const builtApi = this.api().channels(channelId).invites().get();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return res.map((x: RawInviteData) => new Invite(x, this));
  }

  async createChannelInvite(
    channelId: Snowflake,
    data: CreateChannelInvitePayload,
    reason?: string,
  ) {
    const builtApi = this.api().channels(channelId).invites().post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data ?? {};

    const res = await request(req, this);
    return new Invite(res, this);
  }

  async deleteChannelPermission(
    channelId: Snowflake,
    overwriteId: Snowflake,
    reason?: string,
  ) {
    const builtApi = this.api()
      .channels(channelId)
      .permissions(overwriteId)
      .delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async followAnnouncementChannel(
    channelId: Snowflake,
    webhookChannelId: Snowflake,
  ) {
    const builtApi = this.api().channels(channelId).followers().post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = { webhookChannelId };

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async triggerTypingIndicator(channelId: Snowflake) {
    const builtApi = this.api().channels(channelId).typing().post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async getPinnedMessages(channelId: Snowflake) {
    const builtApi = this.api().channels(channelId).pins().get();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return res.map((x: RawMessageData) => new Message(x, this));
  }

  async pinMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    reason?: string,
  ) {
    const builtApi = this.api().channels(channelId).pins(messageId).put();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async unpinMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    reason?: string,
  ) {
    const builtApi = this.api().channels(channelId).pins(messageId).delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async groupDMAddRecipient(
    channelId: Snowflake,
    userId: Snowflake,
    data: GroupDMAddRecipientPayload,
  ) {
    const builtApi = this.api().channels(channelId).recipients(userId).put();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async groupDMRemoveRecipient(channelId: Snowflake, userId: Snowflake) {
    const builtApi = this.api().channels(channelId).recipients(userId).delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async startThreadFromMessage(
    channelId: Snowflake,
    messageId: Snowflake,
    data: StartThreadPayload,
    reason?: string,
  ) {
    const builtApi = this.api()
      .channels(channelId)
      .messages(messageId)
      .threads()
      .post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return new Channel(res, this);
  }

  async startThreadWithoutMessage(
    channelId: Snowflake,
    data: StartThreadPayload,
    reason?: string,
  ) {
    const builtApi = this.api().channels(channelId).threads().post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return new Channel(res, this);
  }

  async startThreadInForum(
    channelId: Snowflake,
    data: StartThreadInForumPayload,
    reason?: string,
  ) {
    const builtApi = this.api().channels(channelId).threads().post();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = data;
    req.auditLogReason = reason;

    const res = await request(req, this);
    return new Channel(res, this);
  }

  async joinThread(channelId: Snowflake) {
    const builtApi = this.api()
      .channels(channelId)
      ['thread-members']('@me')
      .put();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async addThreadMember(channelId: Snowflake, userId: Snowflake) {
    const builtApi = this.api()
      .channels(channelId)
      ['thread-members'](userId)
      .put();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async leaveThread(channelId: Snowflake) {
    const builtApi = this.api()
      .channels(channelId)
      ['thread-members']('@me')
      .delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async removeThreadMember(channelId: Snowflake, userId: Snowflake) {
    const builtApi = this.api()
      .channels(channelId)
      ['thread-members'](userId)
      .delete();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;

    const res = await request(req, this);
    return convertToCamelCase(res);
  }

  async getThreadMember(
    channelId: Snowflake,
    userId: Snowflake,
    withMember = true,
  ) {
    const builtApi = this.api()
      .channels(channelId)
      ['thread-members'](userId)
      .get();
    const req: requestOptions = createNullObject();
    req.url = builtApi.api;
    req.route = builtApi.route;
    req.method = builtApi.method;
    req.params = { withMember };

    const res = await request(req, this);
    return {
      id: BigInt(res.id),
      userId: BigInt(res.user_id),
      joinTimestamp: new Date(res.join_timestamp),
      flags: res.flags,
      member: res.member ? new Member(res.member, this) : null,
    };
  }
}
