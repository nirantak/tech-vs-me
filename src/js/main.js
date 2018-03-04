/* Main Script */

/* Register Service Worker */
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then(function(reg) {
				listenForWaitingServiceWorker(reg, promptUserToRefresh);
			})
			.catch(function(e) {
				console.error("[SW] Error during service worker registration: ", e);
			});
	});
} else {
	console.log("Ahh! Your browser does not support Service Workers");
}

function listenForWaitingServiceWorker(reg, callback) {
	function awaitStateChange() {
		reg.installing.addEventListener("statechange", function() {
			if (this.state === "installed") callback(reg);
		});
	}
	if (!reg) {
		return;
	} else if (reg.waiting) {
		return callback(reg);
	} else if (reg.installing) {
		awaitStateChange();
	} else {
		reg.addEventListener("updatefound", awaitStateChange);
	}
}

// Reload once when the new Service Worker starts activating
var refreshing;
navigator.serviceWorker.addEventListener("controllerchange", function() {
	if (refreshing) return;
	refreshing = true;
	window.location.reload(true);
});
function promptUserToRefresh(reg) {
	if (window.confirm("Updates are available!\nClick OK to refresh")) {
		reg.waiting.postMessage("skipWaiting");
	}
}

/* Contact Form */
$("#contact-form").submit(function(e) {
	e.preventDefault();

	var $form = $(this);
	$.post($form.attr("action"), $form.serialize()).then(function() {
		alert("Your response has been recorded!");
		document.getElementById("contact-form").reset();
	});
});

/* Search */
$(function() {
	var show = true;

	var toggleSearch = function(visible) {
		show = !visible;
		var visibility = visible ? "block" : "none";

		$("#search-content").val("");
		$(".search-tool").css("display", visibility);
	};

	$("#close-btn").click(function() {
		toggleSearch(false);
	});

	$("#search-btn").click(function() {
		toggleSearch(true);
	});

	$.getJSON("/search.json").done(function(data) {
		if (data.code == 0) {
			$("#search-content").typeahead({
				source: data.data,
				displayText: function(item) {
					return item.title;
				},
				afterSelect: function(item) {
					window.location.href = item.url;
				}
			});
		}
	});
});
