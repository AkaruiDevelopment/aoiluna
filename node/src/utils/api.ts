import { ApiroxyData } from '../typings/types.js';
import { DiscordApi } from './libconstants.js';

const ApiProxy = {
  get(target: ApiroxyData, prop: any) {
    if (['get', 'patch', 'put', 'post', 'delete'].includes(prop)) {
      target.method = prop.toUpperCase();
      return (...value: any[]) => target as ApiroxyData;
    }
    return (...value: any[]): ApiroxyData => {
      if (value.length) {
        if (prop === 'symbol') return target as ApiroxyData;
        target.api += `/${prop}/${value.join('/')}`;
        if (!target.route) target.route = `/${prop}/${value.join('/')}`;
        return new Proxy(target, ApiProxy) as ApiroxyData;
      }
      if (prop === 'symbol') return target as ApiroxyData;
      target.api += `/${prop}`;
      if (!target.route) target.route = prop;
      return new Proxy(target, ApiProxy) as ApiroxyData;
    };
  },
};

const Api = () =>
  new Proxy(
    // @ts-ignore
    { api: DiscordApi, method: 'GET', route: '' },
    ApiProxy,
  ) as ApiroxyData;
export default Api;
