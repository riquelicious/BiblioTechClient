

const server = 'http://localhost:3030';

//fetch_values();
export function fetch_values(params) {
	// Example of a GET request
	fetch( server +'/api/endpoint')
	.then(response => {
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json(); // or response.text() for plain text
	})
	.then(data => {
	console.log(data); // Handle the response data
	})
	.catch(error => {
	console.error('There was a problem with the fetch operation:', error);
	});
}
