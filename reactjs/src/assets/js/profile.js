$(document).ready(function() {
	$("input[type='file']").change(function() {
		var filename = $(this).val().replace(/.*(\/|\\)/, '');
		$("#file_name").text(filename);
	});
});