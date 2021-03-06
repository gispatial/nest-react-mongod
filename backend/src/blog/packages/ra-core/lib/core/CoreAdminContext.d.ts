import { FunctionComponent, ComponentType } from 'react';
import { History } from 'history';
import { AuthProvider, LegacyAuthProvider, I18nProvider, DataProvider, AdminChildren, CustomRoutes, DashboardComponent, LegacyDataProvider, InitialState } from '../types';
export declare type ChildrenFunction = () => ComponentType[];
export interface AdminContextProps {
    authProvider?: AuthProvider | LegacyAuthProvider;
    children?: AdminChildren;
    customSagas?: any[];
    customReducers?: object;
    customRoutes?: CustomRoutes;
    dashboard?: DashboardComponent;
    dataProvider: DataProvider | LegacyDataProvider;
    history?: History;
    i18nProvider?: I18nProvider;
    initialState?: InitialState;
    theme?: object;
}
declare const CoreAdminContext: FunctionComponent<AdminContextProps>;
export default CoreAdminContext;
