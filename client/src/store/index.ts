import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import 'react-redux';
import rootReducer from '../reducers';
import { VineState } from '../reducers/vine';

export interface AppStore {
    store: Store;
}

export interface StoreState {
    vine: VineState;
    config: void
}

declare module 'react-redux' {

}

export default (): AppStore =>  {
    const store = createStore(rootReducer, applyMiddleware(thunk));

    return { store };
};
