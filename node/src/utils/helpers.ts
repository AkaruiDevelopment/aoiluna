import { statSync } from 'fs';
import { GatewayDebugData, MessagePayload } from '../typings/interface.js';
import { Camelize, Snakify } from '../typings/types.js';
import { readFile } from 'fs/promises';
import DebugManager from '../events/manager/debugManager.js';
import Client from '../client/index.js';
import { GatewayEventNames, GatewayOpCodes } from '../typings/enums.js';

export function ConvertHexToBigInt(hash: string) {
  if (hash.startsWith('a_')) {
    return -BigInt('0x' + hash.slice(2));
  }
  return BigInt('0x' + hash);
}

export function ConvertBigIntToHex(hash: bigint) {
  if (hash < 0n) {
    return 'a_' + (-hash).toString(16);
  }
  return hash.toString(16);
}

export function convertToCamelCase<T extends any>(
  obj: T,
): Camelize<T> | Camelize<T>[] | T {
  if (typeof obj !== 'object') return obj as Camelize<T>;
  if (!obj) return obj as Camelize<T>;
  else if (obj instanceof Array) {
    return obj.map((item) => {
      return convertToCamelCase(item) as Camelize<T>;
    });
  } else {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
      const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      newObj[newKey] = convertToCamelCase(obj[key]);
    }
    // @ts-ignore
    return newObj;
  }
}

export function convertToSnakeCase<T extends any>(
  obj: T,
): Snakify<T> | Snakify<T>[] | T {
  if (typeof obj !== 'object') return obj as Snakify<T>;
  if (!obj) return obj as Snakify<T>;
  else if (obj instanceof Array) {
    return obj.map((item) => {
      return convertToSnakeCase(item) as Snakify<T>;
    });
  } else {
    const newObj: Record<string, any> = {};
    for (const key in obj) {
      const newKey = key.replace(/[A-Z]/g, (g) => `_${g[0].toLowerCase()}`);
      newObj[newKey] = convertToSnakeCase(obj[key]);
    }
    // @ts-ignore
    return newObj;
  }
}

export function createNullObject() {
  return Object.create(null);
}

export function Stringify(obj: any) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  });
}

export function isUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
//@ts-ignore
const fileType= async (file:Buffer) => await import('file-type').then(x => x.fileTypeFromBuffer(file));

export async function getFileData(file: string | Buffer) {
  if (typeof file === 'string' ) {
    if ( isUrl( file ) )
    {
      const res = await fetch( file );
      return new Blob( [ await res.arrayBuffer() ], { type: <string>res.headers.get( 'content-type' ) } );
    } else if ( statSync( file ).isFile() )
    {
      const res = await readFile( file );
      return new Blob( [ res ], { type: ( await fileType( res ) )?.mime ?? 'application/octet-stream' } );
    }
    else
    {
      return new Blob( [ file ], { type: 'text/plain' } );
    }
  }
  return new Blob( [ file ], { type: ( await fileType( file ) )?.mime ?? 'application/octet-stream' } );
}

export async function returnMessagePayload ( payload: MessagePayload )
{
  const object = createNullObject();
  const res = createNullObject();
  object.content = payload.content ?? ' ';
  object.embeds = payload.embeds ;
  object.allowedMentions = payload.allowedMentions ;
  object.components = payload.components ;
  object.flags = payload.flags ;
  object.messageReference = payload.messageReference;
  object.stickerIds = payload.stickerIds ;
  object.nounce = payload.nounce;
  object.tts = payload.tts ;
  object.attachments = payload.attachments?.map( ( a, i ) =>
  {
    return {
      id: i.toString(),
      filename: a.spoiler ? 'SPOILER_' + a.name : a.name,
      description: a.description,
    };
  } );
  if ( object.attachments && object.attachments.length === 0 ) delete object.attachments;
  if ( payload.attachments && payload.attachments.length > 0 )
  {
    const formData = new FormData();
    formData.append( "payload_json", Stringify( convertToSnakeCase( object ) ) );
    let index = 0;
    for ( const attachment of payload.attachments )
    {
      if ( attachment.file )
        formData.append( attachment.file.key, attachment.file.blob, attachment.file.filename );
      else
        formData.append(`files[${index}]`, await getFileData( attachment.data ), attachment.name );
    }
    return formData;
  }
  return object;
}

export function createDebug ( data: GatewayDebugData['d'],client:Client )
{
  const d = {
    d: data,
    t: GatewayEventNames.Debug as GatewayEventNames.Debug,
    op: GatewayOpCodes.Dispatch as GatewayOpCodes.Dispatch,
    s:  -1,
  }
  DebugManager(d, client)
}