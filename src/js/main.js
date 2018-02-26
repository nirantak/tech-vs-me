/* Main Script */

/* Register Service Worker */
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then(function(reg) {
				reg.onupdatefound = function() {
					var installingWorker = reg.installing;

					installingWorker.onstatechange = function() {
						switch (installingWorker.state) {
							case "installed":
								if (navigator.serviceWorker.controller) {
									cache_update_alert();
								} else {
									console.log("Content is now available offline!");
								}
								break;

							case "redundant":
								console.error("The installing service worker became redundant.");
								break;
						}
					};
				};
			})
			.catch(function(e) {
				console.error("Error during service worker registration: ", e);
			});
	});
}

function cached_alert() {
	alert("Content is now available offline!");
}
function cache_update_alert() {
	if (confirm("Updated content is available\nPlease Refresh")) {
		window.location.reload(true);
	} else {
		console.log("Updated content is available.");
	}
}

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
