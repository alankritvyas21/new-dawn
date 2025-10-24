import packageJson from '../../../../package.json';

export const environment = {
  production: false,
  configFile: 'assets/config/config.json',
  version: packageJson.version
};
