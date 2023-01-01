import axios, { AxiosInstance } from 'axios';

import config from './config';
import HttpError from './HttpError';
import getTimeZone from './timezoneHelper';

export class AuthApiClient {
  private http: AxiosInstance;

  constructor(private baseURL = config.baseApiUrl) {
    this.http = axios.create({
      baseURL: this.baseURL,
      timeout: 5000,
      headers: {
        'x-uh-os': 'web',
        'x-uh-app-release': config.buildVersion,
        get 'x-uh-timezone'(): string { return getTimeZone()!; },
        'x-requested-with': 'axios-AuthApiClient',
      },
    });
    this.http.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      // This is required by the interceptor api
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`,
      };
      return config;
    });
  }

  public async login(email: string, password: string): Promise<any> {
    const res = await this.http.post('/auth/login', {
      params: {
        email,
        password,
      },
      type: 'uphabit',
    }, {
      // we want to do our own validation below to nice-ify the errors
      validateStatus: () => true,
    });
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: 'Invalid Login' };
    }
    HttpError.throwIf4xxOr5xx(res);
    return {
      ok: true,
      user: res.data,
    };
  }

  public async addContact(value: any): Promise<any> {
    
    const res = await this.http.post('/api/contacts', value, {
      // we want to do our own validation below to nice-ify the errors
      validateStatus: () => true,
    });
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: 'Invalid contacts' };
    }
    HttpError.throwIf4xxOr5xx(res);
    return {
      ok: true,
      user: res.data,
    };
  }

  public async putContact(
    contact: any & { id: string }
  ): Promise<any> {
    const res = await this.http.put(`/api/contacts/${contact.id}`, {
      ...contact,
    })
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: 'contact update error' };
    }
    HttpError.throwIf4xxOr5xx(res);
    return {
      ok: true,
      user: res.data,
    };
  }

  public async getAllContacts(): Promise<any> {
    const res = await this.http.get('/api/updates?filter[]=contacts');
    if (res.status === 401 || res.status === 403) {
      return { ok: false, error: 'Get contacts error' };
    }
    HttpError.throwIf4xxOr5xx(res);
    return {
      ok: true,
      data: res.data,
    };
  }

}



export default new AuthApiClient();
