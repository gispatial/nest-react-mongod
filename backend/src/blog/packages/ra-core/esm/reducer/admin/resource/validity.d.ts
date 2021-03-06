import { Reducer } from 'redux';
interface ValidityRegistry {
    [key: string]: Date;
    [key: number]: Date;
}
declare const validityReducer: Reducer<ValidityRegistry>;
export default validityReducer;
