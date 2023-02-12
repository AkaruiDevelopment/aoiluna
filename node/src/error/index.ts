export class UzumiError {
  static apiError(
    msg: string,
    url: string,
    route: string,
    status: number,
    method: string,
  ) {
    const error = new Error(msg);
    error.name = 'UzumiError -> [DAPIError]';
    //@ts-ignore
    error.url = url;
    //@ts-ignore
    error.route = route;
    //@ts-ignore
    error.code = status;
    //@ts-ignore
    error.method = method;
    throw error;
  }
}
