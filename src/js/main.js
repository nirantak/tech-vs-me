// Main Script

// Register Service Worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then(function () { console.log('Service Worker Registered'); });
	});
}

$("#gcse").html("<gcse:search></gcse:search>");
