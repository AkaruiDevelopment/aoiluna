import Client from '../client/index.js'
import { GatewayEventNames } from '../typings/enums.js'
import { GatewayDispatchData, GatewayMessageCreateData, GatewayReadyData } from '../typings/interface.js'
import Ready from './manager/readyManager.js'
import MessageCreate from './manager/messageCreateManager.js'
export default function EventManager (
  data: GatewayDispatchData,
  client: Client
) {
  switch (data.t) {
    case GatewayEventNames.Hello:
      break
    case GatewayEventNames.Ready:
      Ready(<GatewayReadyData>data, client)
      break
    case GatewayEventNames.MessageCreate:
      MessageCreate(<GatewayMessageCreateData>data, client)
  }
}
