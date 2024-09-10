import pkg from '../package.json';

export const LOCALSTORAGE_KEY = `${pkg.name}-${pkg.version.split('.').join('')}`.toUpperCase();

export const API_BASE_URL = 'https://gn-queue-manager.shuttleapp.rs/';

export const CREATE_VISITOR_ENDPOINT = `${API_BASE_URL}visitors`;

export const MAIN_COLOR_RESOUND = `#AF1023`;

export const MAIN_COLOR_BELTONE = `#0054A6`;

export const REFRESH_SECONDS = 1 * 60;
