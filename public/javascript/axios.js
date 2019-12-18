import axios from 'axios';
const token = 'sBfhcHvlD6FAUGj0hbrbO9CwabcTp1dG';

export default {
	post: (body, callback) => {
		const header = body.headers ? { ...body.headers, 'x-access-token': token } : { 'x-access-token': token };
		axios.post(body.url, body.params, {
			headers: header
		}).then(resp => {
			callback(resp)
		}).catch(error => {
			callback({
				status: 500,
				data: [],
				message: error.message
			});
			console.error(error);
		});
	},
	get: (body, callback) => {
		const header = body.headers ? { ...body.headers, 'x-access-token': token } : { 'x-access-token': token };
		axios({
			method: 'get',
			url: body.url,
			params: body.params || {},
			headers: header
		}).then(resp => {
			callback(resp)
		}).catch(error => {
			callback({
				status: 500,
				data: [],
				message: error.message
			});
			console.error(error);
		});
	},
	put: (body, callback) => {
		const header = body.headers ? { ...body.headers, 'x-access-token': token } : { 'x-access-token': token };
		axios.put(body.url, body.params, {
			headers: header
		}).then(resp => {
			callback(resp)
		}).catch(error => {
			callback({
				status: 500,
				data: [],
				message: error.message
			});
			console.error(error);
		});
	},
	delete: (body, callback) => {
		const header = body.headers ? { ...body.headers, 'x-access-token': token } : { 'x-access-token': token };
		axios({
			method: 'delete',
			url: body.url,
			params: body.params,
			headers: header
		}).then(resp => {
			callback(resp)
		}).catch(error => {
			callback({
				status: 500,
				data: [],
				message: error.message
			});
			console.error(error);
		});
	},
}