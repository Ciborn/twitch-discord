const request = require("request");
setInterval(() => {
	const streamer = document.getElementsByTagName("h5").item(2).innerText;
	const title = document.getElementsByTagName("h2").item(0).innerText;
	const game = document.querySelectorAll("a.tw-interactive.tw-link[data-a-target=\"stream-game-link\"]").item(0).innerText;
	if (streamer !== null && title !== null && game !== null) {
		var http = new XMLHttpRequest();
		var url = 'http://localhost:58910';
		var params = `streamer=${streamer}&title=${title}&game=${game}`;
		http.open('POST', url, true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.send(params);
	}
}, 15000);