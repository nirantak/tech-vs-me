/* Main Script */

/* Register Service Worker */
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function() {
		navigator.serviceWorker
			.register("/service-worker.js")
			.catch(function(e) {
				console.error(
					"[SW] Error during service worker registration: ",
					e
				);
			});
	});
} else {
	console.log("Ahh! Your browser does not support Service Workers");
}

/* Contact Form */
$("#contact-form").submit(function(e) {
	e.preventDefault();

	var $form = $(this);

	$.get(
		"https://ipinfo.io",
		function(response) {
			var $data = $form.serialize() + "&" + $.param(response);

			$.post($form.attr("action"), $data)
				.done(function() {
					$form.prepend(
						"<div id='submit-successful' style='color:green; margin:auto;'>Your response has been recorded!</div>"
					);
					document.getElementById("contact-form").reset();
					var $submit_successful = $("#submit-successful");
					setTimeout(function() {
						if ($submit_successful.length > 0) {
							$submit_successful.remove();
						}
					}, 10000);
				})
				.fail(function() {
					$form.prepend(
						"<div id='submit-failed' style='color:red; margin:auto;'>There was an error sending this form. Please try again after some time.</div>"
					);
				});
		},
		"jsonp"
	);
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
