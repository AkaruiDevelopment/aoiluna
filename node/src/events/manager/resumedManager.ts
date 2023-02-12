import Client from '../../client/index.js'
import { GatewayEventNames } from '../../typings/enums.js'
import { GatewayResumedData } from '../../typings/interface.js'

export default function Resumed (_data: GatewayResumedData, client: Client) {
  client.emit(GatewayEventNames.Resumed)
}
