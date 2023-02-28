import { integer, Camelize, snowflake, Snowflake } from './types.js';
import {
  ActionTypes,
  AllowedMentionTypes,
  ApplicationRoleConnectionMetadataType,
  ButtonStyles,
  ChannelTypes,
  DefaultMessageNotifications,
  ExplicitContentFilterLevel,
  GatewayEventNames,
  GatewayOpCodes,
  GuildFeatures,
  GuildNSFWLevel,
  GuildScheduledEventEntityType,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventStatus,
  InteractionTypes,
  InviteTargetTypes,
  KeywordPresetTypes,
  Locales,
  MFALevel,
  MessageFlags,
  OverwriteType,
  PremiumTier,
  PremiumTypes,
  Status,
  SystemChannelFlags,
  TextInputStyles,
  ThreadAutoArchiveDuration,
  VerificationLevel,
} from './enums.js';

export interface ClientOptions {
  token: `${string}.${string}.${string}`;
  intents: integer;
  identify?: Camelize<GatewayIdentifyData['d']>;
}
export interface GatewayEventData {
  op: GatewayOpCodes;
  d?: Record<string, unknown>;
  s?: integer;
  t?: string;
}

export interface GatewayHelloData {
  op: GatewayOpCodes.Hello;
  d: {
    heartbeat_interval: integer;
  };
}

export interface GatewayIdentifyData {
  op: GatewayOpCodes.Identify;
  d: {
    token: string;
    intents: integer;
    properties: {
      os: string;
      browser: string;
      device: string;
    };
    compress?: boolean;
    large_threshold?: integer;
    shard?: [integer, integer];
    presence?: {
      status: Status;
      activities: Activity[];
      afk: boolean;
      since?: integer;
    };
  };
}
export interface Activity {
  name: string;
  type: integer;
  url?: string;
}

export interface GatewayHeartbeatData {
  op: GatewayOpCodes.Heartbeat;
  d: integer;
}

export interface GatewayHeartbeatAckData {
  op: GatewayOpCodes.HeartbeatAck;
  d: integer;
}

export interface GatewayDispatchData {
  op: GatewayOpCodes.Dispatch;
  s: integer;
  t: GatewayEventNames;
  d: unknown;
}

export interface GatewayReadyData extends GatewayDispatchData {
  t: GatewayEventNames.Ready;
  d: {
    v: 10 | 9;
    user: RawUserData;
    guilds: {
      id: snowflake;
      unavailable?: boolean;
    }[];
    session_id: string;
    resume_gateway_url: string;
    shard?: [integer, integer];
    application: RawApplicationData;
  };
}

export interface GatewayDebugData extends GatewayDispatchData
{ 
  t: GatewayEventNames.Debug;
  d: {
    message: unknown;
    timestamp: number;
    status: string;
  };
  s: number;
}

export interface RawUserData {
  id: snowflake;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: integer;
  locale?: Locales;
  verified?: boolean;
  email?: string;
  flags?: integer;
  premium_type?: PremiumTypes;
  public_flags?: integer;
}

export interface RawApplicationData {
  id: snowflake;
  name: string;
  icon: string;
  description: string;
  rpc_origins?: string[];
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner: RawUserData;
  verify_key: string;
  team?: rawTeamData[];
  guild_id?: snowflake;
  primary_sku_id?: snowflake;
  slug?: string;
  cover_image?: string;
  flags?: integer;
  tags?: string[];
  install_params?: string;
  custom_install_url?: string;
  role_collections_verification_url?: string;
}

export interface rawTeamData {
  icon?: string;
  id: snowflake;
  members: rawTeamMemberData[];
  name: string;
  owner_user_id: snowflake;
}

export interface rawTeamMemberData {
  membership_state: 1 | 2;
  permissions: string[];
  team_id: snowflake;
  user: RawUserData;
}

export interface GatewayResumedData extends GatewayDispatchData {
  t: GatewayEventNames.Resumed;
  d: {
    _trace: string[];
  };
}

export interface GatewayReconnectData extends GatewayDispatchData {
  t: GatewayEventNames.Reconnect;
  d: null;
}

export interface GatewayInvalidSessionData extends GatewayDispatchData {
  t: GatewayEventNames.InvalidSession;
  d: boolean;
}

export interface GatewayMessageCreateData extends GatewayDispatchData {
  t: GatewayEventNames.MessageCreate;
  d: RawMessageData;
}

export interface RawMessageData {
  edited_timestamp: any;
  this: any;
  id: snowflake;
  channel_id: snowflake;
  author: RawUserData;
  content: string;
  timestamp: string;
  edited_timstamp: string | null;
  tts: boolean;
  mention_everyone: boolean;
  mentions: RawUserData[];
  mention_roles: snowflake[];
  mention_channels?: RawChannelMentionData[];
  attachments: RawAttachmentData[];
  embeds: RawEmbedData[];
  reactions?: RawReactionData[];
  nonce?: string | integer;
  pinned: boolean;
  webhook_id?: snowflake;
  type: integer;
  activity?: RawMessageActivityData;
  application?: RawApplicationData;
  application_id?: snowflake;
  message_reference?: RawMessageReferenceData;
  flags?: integer;
  stickers?: RawStickerData[];
  referenced_message?: RawMessageData;
  interaction?: RawMessageInteractionData;
  thread?: RawChannelData;
  components?: RawMessageComponentData[];
  sticker_items?: RawStickerItemData[];
  position?: integer;
  role_subscription_data?: RawRoleSubscriptionData;
}

export interface RawRoleData {
  id: snowflake;
  name: string;
  color: integer;
  hoist: boolean;
  icon?: string;
  unicode_emoji?: string;
  position: integer;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  tags?: RawRoleTagsData;
}

export interface RawRoleTagsData {
  bot_id?: snowflake;
  integration_id?: snowflake;
  premium_subscriber?: null;
  subscription_listing_id?: snowflake;
  available_for_purchase?: null;
  guild_connections?: null;
}

export interface RawChannelMentionData {
  id: snowflake;
  guild_id: snowflake;
  type: integer;
  name: string;
}

export interface RawAttachmentData {
  id: snowflake;
  filename: string;
  description?: string;
  content_type?: string;
  size: integer;
  url: string;
  proxy_url: string;
  height?: integer;
  width?: integer;
  ephemeral?: boolean;
}

export interface RawEmbedData {
  title?: string;
  type?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: integer;
  footer?: {
    text?: string;
    icon_url?: string;
  };
  image?: {
    url?: string;
  };
  thumbnail?: {
    url?: string;
  };
  video?: {
    url?: string;
    proxy_url?: string;
    height?: integer;
    width?: integer;
  };
  provider?: {
    name?: string;
    url?: string;
  };
  author?: {
    name?: string;
    url?: string;
    icon_url?: string;
  };
  fields?: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
}

export interface RawReactionData {
  count: integer;
  me: boolean;
  emoji: RawEmojiData;
}

export interface RawEmojiData {
  id: snowflake | null;
  name: string;
  roles?: snowflake[];
  user?: RawUserData;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}

export interface RawMessageActivityData {
  type: 1 | 2 | 3 | 5;
  party_id?: string;
}

export interface RawMessageReferenceData {
  message_id?: snowflake;
  channel_id?: snowflake;
  guild_id?: snowflake;
  fail_if_not_exists?: boolean;
}

export interface RawMessageInteractionData {
  id: snowflake;
  type: InteractionTypes;
  name: string;
  user: RawUserData;
  member?: RawMemberData;
}

export interface RawMemberData {
  user?: RawUserData;
  nick?: string;
  avatar?: string;
  roles: snowflake[];
  joined_at: string;
  premium_since?: string;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string;
}

export interface RawChannelData {
  id: snowflake;
  type: ChannelTypes;
  guild_id?: snowflake;
  position?: integer;
  permission_overwrites?: RawOverwriteData[];
  name?: string;
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: snowflake;
  bitrate?: integer;
  user_limit?: integer;
  rate_limit_per_user?: integer;
  recipients?: RawUserData[];
  icon?: string;
  owner_id?: snowflake;
  application_id?: snowflake;
  parent_id?: snowflake;
  last_pin_timestamp?: string;
  rtc_region?: string;
  video_quality_mode?: integer;
  message_count?: integer;
  member_count?: integer;
  thread_metadata?: RawThreadMetadataData;
  member?: RawThreadMemberData;
  default_auto_archive_duration?: integer;
  permissions?: string;
  flags?: integer;
  total_message_sent?: integer;
  available_tags?: RawTagData[];
  applied_tags?: snowflake[];
  default_reaction_emoji?: RawDefaultReactionData[];
  default_thread_rate_limit_per_user?: integer;
  default_sort_order?: integer;
  default_forum_layout?: integer;
}

export interface RawOverwriteData {
  id: snowflake;
  type: 0 | 1;
  allow: string;
  deny: string;
}

export interface RawThreadMetadataData {
  archived: boolean;
  auto_archive_duration: integer;
  archive_timestamp: string;
  locked?: boolean;
  invitable?: boolean;
  create_timestamp?: string;
}

export interface RawThreadMemberData {
  id?: snowflake;
  user_id?: snowflake;
  join_timestamp?: string;
  flags?: integer;
  member?: RawMemberData;
}

export interface RawTagData {
  id: snowflake;
  name: string;
  moderated: boolean;
  emoji_id: snowflake | null;
  emoji_name: string | null;
}

export interface RawDefaultReactionData {
  emoji_id: snowflake | null;
  emoji_name: string | null;
}

export interface RawStickerData {
  id: snowflake;
  pack_id?: snowflake;
  name: string;
  description: string | null;
  tags?: string;
  asset?: string;
  type: 1 | 2;
  format_type: 1 | 2 | 3 | 4;
  available?: boolean;
  guild_id?: snowflake;
  user?: RawUserData;
  sort_value?: integer;
}

export interface RawStickerItemData {
  id: snowflake;
  name: string;
  format_type: 1 | 2 | 3 | 4;
}

export interface RawMessageComponentData {
  type: 1;
  components: (RawButtonData | RawMenuData | RawTextInputData)[];
}

export interface RawButtonData {
  type: 2;
  style: ButtonStyles;
  label?: string;
  emoji?: {
    id?: snowflake;
    name?: string;
    animated?: boolean;
  };
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export interface RawMenuData {
  type: 3 | 5 | 6 | 7 | 8;
  custom_id: string;
  options?: RawMenuOptionData[];
  channel_types?: ChannelTypes[];
  placeholder?: string;
  min_values?: integer;
  max_values?: integer;
  disabled?: boolean;
}

export interface RawMenuOptionData {
  label: string;
  value: string;
  description?: string;
  emoji?: {
    id?: snowflake;
    name?: string;
    animated?: boolean;
  };
  default?: boolean;
}

export interface RawTextInputData {
  type: 4;
  custom_id: string;
  placeholder?: string;
  min_length?: integer;
  max_length?: integer;
  style: TextInputStyles;
}

export interface RawRoleSubscriptionData {
  role_subscription_listing_id: snowflake;
  tier_name: string;
  total_months_subscribed: integer;
  is_renewal: boolean;
}

export interface Queue {
  global: boolean;
  limit: integer;
  remaining: integer;
  reset: integer;
  resetAfter: integer;
  bucket: string;
  route: string;
}

export interface requestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  auditLogReason?: string;
  route: string;
  params?: object;
}

export interface ApplicationRoleConnectionMetadata {
  type: ApplicationRoleConnectionMetadataType;
  key: string;
  name: string;
  nameLocalizations?: Record<Locales, string>;
  description: string;
  descriptionLocalizations?: Record<Locales, string>;
}

export interface AutoModerationRule {
  name: string;
  eventTypes: integer;
  triggerType: integer;
  triggerMetadata: AutoModerationRuleTriggerMetadata;
  actions: { type: ActionTypes; metadata: ActionMetadata }[];
  enabled?: boolean;
  exemptRoles?: Snowflake[];
  exemptChannels?: Snowflake[];
}

export interface AutoModerationRuleTriggerMetadata {
  keywordFilter: string[];
  regex_patterns: string[];
  presets: KeywordPresetTypes;
  allowList: string[];
  mentionTotalLimit: integer;
}

export interface ActionMetadata {
  channelId: snowflake;
  durationSeconds: integer;
}

export interface MessagePayload {
  content?: string;
  tts?: boolean;
  embeds?: Camelize<RawEmbedData>[];
  allowedMentions?: allowedMentions;
  messageReference?: Camelize<RawMessageReferenceData>;
  components?: Camelize<RawMessageComponentData>[];
  stickerIds?: Snowflake[];
  attachments?: MessagePayloadAttachment[];
  flags?: MessageFlags;
  nounce?: string | integer;
}

export interface allowedMentions {
  parse?: AllowedMentionTypes[];
  roles?: snowflake[];
  users?: snowflake[];
  repliedUser?: boolean;
}

export interface MessagePayloadAttachment {
  file?: { blob: Blob; key: `files[${integer}]}]`; filename: string };
  name: string;
  data: string | Buffer;
  spoiler?: boolean;
  description?: string;
}

export interface EditChannelPermissionsPayload
{
  allow: string;
  deny: string;
  type: OverwriteType;
}

export interface RawGuildData
{
  id: snowflake;
  name: string;
  icon: string | null;
  icon_hash: string | null;
  splash: string | null;
  discovery_splash: string | null;
  owner?: boolean;
  owner_id: snowflake;
  permissions?: string;
  afk_channel_id: snowflake | null;
  afk_timeout: integer;
  widget_enabled?: boolean;
  widget_channel_id?: snowflake | null;
  verification_level: VerificationLevel;
  default_message_notifications: DefaultMessageNotifications;
  explicit_content_filter: ExplicitContentFilterLevel;
  roles: RawRoleData[];
  emojis: RawEmojiData[];
  features: GuildFeatures[];
  mfa_level: MFALevel;
  application_id?: snowflake;
  system_channel_id?: snowflake;
  system_channel_flags: SystemChannelFlags;
  rules_channel_id?: snowflake;
  max_presences?: integer;
  max_members?: integer;
  vanity_url_code?: string;
  description?: string;
  banner?: string;
  premium_tier: PremiumTier;
  premium_subscription_count?: integer;
  preferred_locale: Locales;
  public_updates_channel_id?: snowflake;
  max_video_channel_users?: integer;
  approximate_member_count?: integer;
  approximate_presence_count?: integer;
  welcome_screen?: RawWelcomeScreenData;
  nsfw_level: GuildNSFWLevel;
  stickers?: RawStickerData[];
  premium_progress_bar_enabled?: boolean;
}

export interface RawWelcomeScreenData
{
  description: string | null;
  welcome_channels: RawWelcomeScreenChannelData[];
}

export interface RawWelcomeScreenChannelData
{
  channel_id: snowflake;
  description: string;
  emoji_id: snowflake | null;
  emoji_name: string | null;
}

export interface RawInviteData
{
  code: string;
  guild?: RawGuildData;
  channel: RawChannelData;
  inviter?: RawUserData;
  target_user?: RawUserData;
  target_type?: InviteTargetTypes;
  target_application?: RawApplicationData;
  approximate_presence_count?: integer;
  approximate_member_count?: integer;
  expires_at?: string;
  guild_scheduled_event?: RawGuildScheduledEventData;
}

export interface RawGuildScheduledEventData
{
  id: snowflake;
  guild_id: snowflake;
  channel_id: snowflake | null;
  creator_id?: snowflake | null;
  name: string;
  description?: string;
  scheduled_start_time: string;
  scheduled_end_time: string | null;
  privacy_level: GuildScheduledEventPrivacyLevel;
  status: GuildScheduledEventStatus;
  entity_type: GuildScheduledEventEntityType;
  entity_id?: snowflake | null;
  entity_metadata?: RawGuildScheduledEventEntityMetadata  | null;
  creator?: RawUserData;
  user_count?: integer;
  image?: string | null;
}

export interface RawGuildScheduledEventEntityMetadata
{
  location?: string;
}

export interface CreateChannelInvitePayload
{
  maxAge?: integer;
  maxUses?: integer;
  temporary?: boolean;
  unique?: boolean;
  targetUserId?: snowflake;
  targetType?: InviteTargetTypes;
  targetApplicationId?: snowflake;
  
}

export interface GroupDMAddRecipientPayload
{
  accessToken: string;
  nick: string;
}

export interface StartThreadPayload
{
  name: string;
  autoArchiveDuration: ThreadAutoArchiveDuration;
  rateLimitPerUser?: integer;
}
export interface StartThreadInForumPayload extends StartThreadPayload
{
  message: MessagePayload;
  applied_tags?: snowflake[];
}