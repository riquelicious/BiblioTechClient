

const server = 'http://localhost:5000'; //edit if needed

export function send_books(books) {
	fetch(`${server}/insert_books`, {
		method: 'POST',
		body: JSON.stringify({books: books}),
		headers: { 'Content-Type': 'application/json'

		}
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		console.log(data);
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
	});
}


export function fetch_books() {
	return fetch(`${server}/select_books`)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	// .then(data => {
	// 	return(data);
	// })
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
		return([]);
	})
}
