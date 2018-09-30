import {
	CANCEL_ORDER, CREATE_ORDER, GET_BALANCE, GET_CANDLE_DATA, GET_MARKETS, GET_ORDERS, LOGIN, LOGOUT, POLL_MARKET_DATA, POLL_USER_DATA,
	USER
} from "../constants/ChartActionTypes";

export function pollMarketData(market, interval, last_polled) {
	let url = `/api/markets/${market.symbol}/poll?interval=${interval.value}`;
	if (last_polled) {
		const end_time = parseInt(new Date().getTime() / 1000, 10);
		url += `&start_time=${last_polled}&end_time=${end_time}`
	}

	return {
		type: POLL_MARKET_DATA,
		payload: {
			request: {
				url: url
			}
		}
	}
}

export function pollUserData(last_polled) {
	let url = `/api/user/poll`;
	if (last_polled) {
		const end_time = parseInt(new Date().getTime() / 1000, 10);
		url += `&start_time=${last_polled}&end_time=${end_time}`
	}

	return {
		type: POLL_USER_DATA,
		payload: {
			request: {
				url: url
			}
		}
	}
}

export function getCandles(market, interval, start_time=null, end_time=null) {
	let url = `/api/markets/${market.symbol}/candlesticks?interval=${interval.value}`;
	if (end_time) url += `&end_time=${end_time}`;
	if (start_time) url += `&start_time=${start_time}`;

	return {
		type: GET_CANDLE_DATA,
		payload: {
			request: {
				url: url
			}
		}
	}
}

export function login(email, password) {
	return {
		type: LOGIN,
		payload: {
			request: {
				method: 'post',
				url: '/login',
				data: {email, password}
			}
		}
	}
}

export function user() {
	return {
		type: USER,
		payload: {
			request: {
				url: '/api/user',
			}
		}
	}
}

export function logout() {
	return {
		type: LOGOUT,
		payload: {
			request: {
				method: 'post',
				url: '/logout',
			}
		}
	}
}

export function getBalance(currencies = []) {
	return {
		type: GET_BALANCE,
		payload: {
			request: {
				url: `/api/balance/${currencies.join().toUpperCase()}`,
			}
		}
	}
}

export function getOrders() {
	return {
		type: GET_ORDERS,
		payload: {
			request: {
				url: '/api/orders',
			}
		}
	}
}

export function createOrder(valuta_pair_id, price, quantity, buy, type = 0) {
	return {
		type: CREATE_ORDER,
		payload: {
			request: {
				method: 'post',
				url: '/api/orders/create',
				data: {valuta_pair_id, price, quantity, buy, type}
			}
		}
	}
}

export function cancelOrder(order_id) {
	return {
		type: CANCEL_ORDER,
		payload: {
			request: {
				method: 'post',
				url: `/api/orders/${order_id}/cancel`,
			}
		}
	}
}

export function getMarkets() {
	return {
		type: GET_MARKETS,
		payload: {
			request: {
				url: '/api/markets',
			}
		}
	}
}