/* eslint-disable no-process-env */
import pkg from '../package.json';

/**
 * This file should serve as a single place for anything that
 * needs to read an env-var
 */

 function parseEnvBool(value?: string): boolean {
  return !!value && value.toLowerCase() !== 'false';
}

const config = {

  get rootPublicUrl(): string {
    return process.env.PUBLIC_URL || window.location.origin;
  },

  get baseApiUrl(): string {
    const DEV_URL = 'https://staging.api.uphabit.com';
    return process.env.REACT_APP_OVERRIDE_HOST || DEV_URL;
  },

  get showSsoButtons(): boolean {
    return parseEnvBool(process.env.REACT_APP_UH_SHOW_SSO_BUTTONS) || this.isLocalDevServer;
  },

  get isLocalDevServer(): boolean {
    return process.env.NODE_ENV === 'development';
  },

  get buildVersion(): string {
    let { version } = pkg;
    const buildId = process.env.REACT_APP_BUILD_ID;
    if (buildId) {
      version += '-';
      version += buildId;
    }
    return version;
  }

} as const;

export default config;
