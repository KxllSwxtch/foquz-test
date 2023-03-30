// FUNCTIONALITY TO MAKE AN XMARK ICON VISIBLE ONLY WHEN THE USER TYPES
$(document).ready(function () {
	$('#search').on('input', function () {
		if ($(this).val().length > 0) {
			$(this).siblings('i.xmarkIcon').show()
		} else {
			$(this).siblings('i.xmarkIcon').hide()
		}
	})
})

function ViewModel() {}

ko.applyBindings(new ViewModel())
