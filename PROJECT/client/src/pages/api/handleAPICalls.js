let handler = async (req, res) => {
	// const method = 'POST'; 

	let email, firstName, lastName, password, username; 
	
	let formBody = JSON.stringify({
		u_email: email, 
		u_first_name: firstName, 
		u_last_name: lastName, 
		u_password: password, 
		u_username: username, 
	  })

	let options = {
		method: "POST", 
		body: formBody, 
		headers: {
		  "Content-Type" : "application/json"
		}		
	}

	// let url = "http://localhost:6002/user"; 

	let url = process.env.API_URL;


	try {
		const response = await fetch (url, options); 
		const data = await response.json(); 
		return res.end(JSON.stringify(data)); 
	} catch(err) {
		res.end(JSON.stringify({'error' : err.message})); 
	}
	


}

export default handler; 






/* import httpProxy from 'http-proxy'

const API_URL = process.env.API_URL // The actual URL of your API

const proxy = httpProxy.createProxyServer()

// Make sure that we don't parse JSON bodies on this route:
export const config = {
	api: {
		bodyParser: false,
	},
}

export default (req, res) => {
	return new Promise((resolve, reject) => {
		proxy.web(req, res, { target: API_URL, changeOrigin: true }, (err) => {
			if (err) {
				return reject(err)
			}
			resolve()
		})
	})
} */

