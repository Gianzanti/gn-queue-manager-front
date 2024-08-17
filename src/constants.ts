import pkg from '../package.json';

export const LOCALSTORAGE_KEY = `${pkg.name}-${pkg.version.split('.').join('')}`.toUpperCase();

export const API_BASE_URL = 'https://gn-queue-manager.shuttleapp.rs/';

export const CREATE_VISITOR_ENDPOINT = `${API_BASE_URL}visitors`;

export const MAIN_COLOR = `#3f51b5`;

export const REFRESH_SECONDS = 1 * 60;
