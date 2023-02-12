import Client from "../../client/index.js";
import { GatewayEventNames } from "../../typings/enums";
import { GatewayDebugData } from "../../typings/interface.js";

export default function DebugManager ( data: GatewayDebugData, client: Client )
{
    client.emit( GatewayEventNames.Debug, data.d );
}