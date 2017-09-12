import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

export default function routes(store) {

	const hasPermission = function() {
		//TODO: 在这里做权限检查
		return true;
	}

	const requireLogin = function(nextState, replace, next) {

		const isLogin = true;
		// TODO: 登陆检查
		if (!isLogin) {
			replace('/login/');
		}
		// TODO: 权限检查
		if (isLogin && !hasPermission()) {
			replace('/');
		}
		next();
	}

	return (
		<Route path='/' component={App} >
		</Route>
	);
}
