import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { Router, hashHistory } from 'react-router';
import route from './routes';
import todoApp from './reducers/todo';

const level='log';
const loggerMiddleware = createLogger({level});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = (process.env.NODE_ENV === "production" ?
			applyMiddleware(thunkMiddleware)(createStore) :
			applyMiddleware(thunkMiddleware,loggerMiddleware)(createStore));

export default function configureStore(initialState) {
	return createStoreWithMiddleware(todoApp, initialState);
}

const persistedState = {};
let store = configureStore(persistedState);
let unsubscribe = store.subscribe(() => {
	console.log("call subscribe, state:", store.getState());
})

ReactDOM.render(
		<Provider store={store}>
			<Router history={hashHistory} routes={route(store)} />
		</Provider>,
	document.getElementById('root'));

/*
if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools');
	ReactDOM.render(
	  <AppContainer>
			<Provider store={store}>
				<Router history={hashHistory} routes={route(store)} />
	      <DevTools />
			</Provider>
	  </AppContainer>,
		document.getElementById('root'));
}


if (module.hot) {
    module.hot.accept('./reducers/todo', () => {
        const reducer = require('./reducers/todo').default;
        store = createStoreWithMiddleware(reducer, {});
        console.log("--> module host store: ", store);
        ReactDOM.render(
					<AppContainer>
						<Provider store={store}>
							<Router history={hashHistory} routes={route(store)} />
						</Provider>
					</AppContainer>,
            document.getElementById('root')
        );
    });
}

*/
