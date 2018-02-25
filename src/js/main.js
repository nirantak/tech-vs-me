// Main Script

// Register Service Worker
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
		navigator.serviceWorker.register("/service-worker.js").then(function() {
			console.log("Service Worker Registered");
		});
	});
}

// Search
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
