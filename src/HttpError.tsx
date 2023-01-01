import { AxiosResponse } from 'axios';

export default class HttpError extends Error {
  static throwResponse(res: AxiosResponse): never {
    throw new HttpError(res.status, res.data);
  }

  static throwIf4xxOr5xx(res: AxiosResponse): void {
    if (res.status >= 400) {
      HttpError.throwResponse(res);
    }
  }

  constructor(
    public readonly status: number,
    public readonly body: any,
  ) {
    super(`Unexpected respose code ${status}`);
  }
}

