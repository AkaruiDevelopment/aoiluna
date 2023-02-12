import User from '../../classes/User.js'
import Client from '../../client/index.js'
import { GatewayEventNames } from '../../typings/enums.js'
import { Camelize } from '../../typings/types.js'
import { convertToCamelCase } from '../../utils/helpers.js'
import {
  GatewayReadyData,
  RawApplicationData
} from '../../typings/interface.js'
export default async function Ready (data: GatewayReadyData, client: Client) {
  const readyData = {
    user: new User(data.d.user, client),
    guilds: data.d.guilds,
    resumeGatewayUrl: data.d.resume_gateway_url,
    shard: data.d.shard,
    sessionId: data.d.session_id,
    application: <Camelize<RawApplicationData>>(
            convertToCamelCase(data.d.application)
        )
  }
  client.readyData = readyData

  for (const f of client.__on__[GatewayEventNames.Ready] ?? []) {
    await f(client)
  }
}
