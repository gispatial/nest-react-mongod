import { DataProvider } from 'ra-core';
declare const _default: ({ defaultData, localStorageKey, loggingEnabled, localStorageUpdateDelay, }: {
    defaultData: any;
    localStorageKey: string;
    loggingEnabled: boolean;
    localStorageUpdateDelay: number;
}) => DataProvider;
/**
 * Respond to react-admin data queries using a local database persisted in localStorage
 *
 * Useful for local-first web apps.
 *
 * @example // initialize with no data
 *
 * import localStorageDataProvider from 'ra-data-local-storage';
 * const dataProvider = localStorageDataProvider();
 *
 * @example // initialize with default data (will be ignored if data has been modified by user)
 *
 * import localStorageDataProvider from 'ra-data-local-storage';
 * const dataProvider = localStorageDataProvider({
 *   defaultData: {
 *     posts: [
 *       { id: 0, title: 'Hello, world!' },
 *       { id: 1, title: 'FooBar' },
 *     ],
 *     comments: [
 *       { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
 *       { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
 *     ],
 *   }
 * });
 */
export default _default;
