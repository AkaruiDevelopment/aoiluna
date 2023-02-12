export enum GatewayOpCodes
{
    Dispatch,
    Heartbeat,
    Identify,
    PresenceUpdate,
    VoiceStateUpdate,
    Resume,
    Reconnect=7,
    RequestGuildMembers,
    InvalidSession,
    Hello,
    HeartbeatAck
}

export enum GatewayEventNames
{
    Hello = 'HELLO',
    Ready = 'READY',
    Resumed = 'RESUMED',
    Reconnect = 'RECONNECT',
    InvalidSession = 'INVALID_SESSION',
    ChannelCreate = 'CHANNEL_CREATE',
    ChannelUpdate = 'CHANNEL_UPDATE',
    ChannelDelete = 'CHANNEL_DELETE',
    ChannelPinsUpdate = 'CHANNEL_PINS_UPDATE',
    ThreadCreate = 'THREAD_CREATE',
    ThreadUpdate = 'THREAD_UPDATE',
    ThreadDelete = 'THREAD_DELETE',
    ThreadListSync = 'THREAD_LIST_SYNC',
    ThreadMemberUpdate = 'THREAD_MEMBER_UPDATE',
    ThreadMembersUpdate = 'THREAD_MEMBERS_UPDATE',
    GuildCreate = 'GUILD_CREATE',
    GuildUpdate = 'GUILD_UPDATE',
    GuildDelete = 'GUILD_DELETE',
    GuildBanAdd = 'GUILD_BAN_ADD',
    GuildBanRemove = 'GUILD_BAN_REMOVE',
    GuildEmojisUpdate = 'GUILD_EMOJIS_UPDATE',
    GuildIntegrationsUpdate = 'GUILD_INTEGRATIONS_UPDATE',
    GuildMemberAdd = 'GUILD_MEMBER_ADD',
    GuildMemberRemove = 'GUILD_MEMBER_REMOVE',

    GuildMemberUpdate = 'GUILD_MEMBER_UPDATE',
    GuildMembersChunk = 'GUILD_MEMBERS_CHUNK',
    GuildRoleCreate = 'GUILD_ROLE_CREATE',
    GuildRoleUpdate = 'GUILD_ROLE_UPDATE',
    GuildRoleDelete = 'GUILD_ROLE_DELETE',
    GuildScheduledEventCreate = 'GUILD_SCHEDULED_EVENT_CREATE',
    GuildScheduledEventUpdate = 'GUILD_SCHEDULED_EVENT_UPDATE',
    GuildScheduledEventDelete = 'GUILD_SCHEDULED_EVENT_DELETE',
    GuildScheduledEventUserAdd = 'GUILD_SCHEDULED_EVENT_USER_ADD',
    GuildScheduledEventUserRemove = 'GUILD_SCHEDULED_EVENT_USER_REMOVE',
    IntergrationCreate = 'INTEGRATION_CREATE',
    IntergrationUpdate = 'INTEGRATION_UPDATE',
    IntergrationDelete = 'INTEGRATION_DELETE',
    InteractionCreate = 'INTERACTION_CREATE',
    InviteCreate = 'INVITE_CREATE',
    InviteDelete = 'INVITE_DELETE',
    MessageCreate = 'MESSAGE_CREATE',
    MessageUpdate = 'MESSAGE_UPDATE',
    MessageDelete = 'MESSAGE_DELETE',
    MessageDeleteBulk = 'MESSAGE_DELETE_BULK',
    MessageReactionAdd = 'MESSAGE_REACTION_ADD',
    MessageReactionRemove = 'MESSAGE_REACTION_REMOVE',
    MessageReactionRemoveAll = 'MESSAGE_REACTION_REMOVE_ALL',
    MessageReactionRemoveEmoji = 'MESSAGE_REACTION_REMOVE_EMOJI',
    PresenceUpdate = 'PRESENCE_UPDATE',
    StageInstanceCreate = 'STAGE_INSTANCE_CREATE',
    StageInstanceUpdate = 'STAGE_INSTANCE_UPDATE',
    StageInstanceDelete = 'STAGE_INSTANCE_DELETE',
    TypingStart = 'TYPING_START',
    UserUpdate = 'USER_UPDATE',
    VoiceStateUpdate = 'VOICE_STATE_UPDATE',
    VoiceServerUpdate = 'VOICE_SERVER_UPDATE',
    WebhooksUpdate = 'WEBHOOKS_UPDATE',
    Debug = 'DEBUG',
}

export enum Status
{
    Online = 'online',
    Dnd = 'dnd',
    Idle = 'idle',
    Invisible = 'invisible',
    Offline = 'offline'
}

export enum Locales
{
    Indonesian = 'id',
    Danish = 'da',
    German = 'de',
    EnglishUK = 'en-GB',
    EnglishUS = 'en-US',
    Spanish = 'es-ES',
    French = 'fr',
    Croatian = 'hr',
    Italian = 'it',
    Lithuanian = 'lt',
    Hungarian = 'hu',
    Dutch = 'nl',
    Norwegian = 'no',
    Polish = 'pl',
    PortugueseBrazil = 'pt-BR',
    Romanian = 'ro',
    Finnish = 'fi',
    Swedish = 'sv-SE',
    Vietnamese = 'vi',
    Turkish = 'tr',
    Czech = 'cs',
    Greek = 'el',
    Bulgarian = 'bg',
    Russian = 'ru',
    Ukrainian = 'uk',
    Hindi = 'hi',
    Thai = 'th',
    ChineseChina = 'zh-CN',
    Japanese = 'ja',
    ChineseTaiwan = 'zh-TW',
    Korean = 'ko'
}

export enum PremiumTypes
{
    None,
    NitroClassic,
    Nitro,
    NitroBasic
}

export enum InteractionTypes
{
    Ping = 1,
    ApplicationCommand = 2,
    MessageComponent = 3,
    ApplicationCommandAutocomplete = 4,
    ModalSubmit = 5,
}

export enum ChannelTypes
{
    GuildText,
    Dm,
    GuildVoice,
    GroupDm,
    GuildCategory,
    GuildAnnoucement,
    AnnoucementThread = 10,
    PublicThread,
    PrivateThread,
    GuildStageVoice,
    GuildDirectory,
    GuildForum,
}

export enum ButtonStyles
{
    Primary = 1,
    Secondary,
    Success,
    Danger,
    Link
}

export enum TextInputStyles
{
    Short = 1,
    Paragraph,
}


export enum ApplicationRoleConnectionMetadataType
{
    IntegerLessThanOrEqual = 1,
    IntegerGreaterThanOrEqual,
    IntegerEqual,
    IntegerNotEqual,
    DateTimeLessThanOrEqual,
    DateTimeGreaterThanOrEqual,
    BooleanEqual,
    BooleanNotEqual,
}

export enum KeywordPresetTypes
{
    Profanity = 1,
    SexualContent,
    Slurs,
}
export enum ActionTypes
{
    BlockMessage = 1,
    SendAlertMessage,
    Timeout,
}

export enum AllowedMentionTypes
{
    Role = 'roles',
    User = 'users',
    Everyone = 'everyone'
}

export enum MessageFlags
{
    Crossposted = 1 << 0,
    IsCrosspost = 1 << 1,
    SuppressEmbeds = 1 << 2,
    SourceMessageDeleted = 1 << 3,
    Urgent = 1 << 4,
    HasThread = 1 << 5,
    Ephemeral = 1 << 6,
    Loading = 1 << 7,
    FailedToMentionSomeRolesInThread = 1 << 8,
    SuppressNotifications = 1 << 12,
}

export enum Intents
{
    Guilds = 1 << 0,
    GuildMembers = 1 << 1,
    GuildModeration = 1 << 2,
    GuildEmojisAndStickers = 1 << 3,
    GuildIntegrations = 1 << 4,
    GuildWebhooks = 1 << 5,
    GuildInvites = 1 << 6,
    GuildVoiceStates = 1 << 7,
    GuildPresences = 1 << 8,
    GuildMessages = 1 << 9,
    GuildMessageReactions = 1 << 10,
    GuildMessageTyping = 1 << 11,
    DirectMessages = 1 << 12,
    DirectMessageReactions = 1 << 13,
    DirectMessageTyping = 1 << 14,
    MessageContent = 1 << 15,
    GuildScheduledEvents = 1 << 16,
    AutoModerationConfiguration = 1 << 17,
    AutoModerationExecution = 1 << 18,
}
