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

// KO MODEL
function ViewModel() {
	const self = this

	self.singleCategories = ko.observableArray([
		{
			title: 'Тестовое задание кандидата',
			subtitle:
				'Россия, Белорусия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха',
		},
		{
			title: 'Трудовой договор',
			subtitle: '',
		},
		{
			title: 'Мед. книжка',
			subtitle: '',
		},
	])

	self.draggingItem = ko.observable(null)

	self.startDrag = function (item) {
		self.draggingItem(item)
	}

	self.afterMove = function (arg) {
		const item = self.draggingItem()
		const newIndex = arg.targetIndex
		self.singleCategories.remove(item)
		self.singleCategories.splice(newIndex, 0, item)
		self.draggingItem(null)
	}

	self.sortableOptions = {
		data: self.singleCategories,
		beforeMove: function (arg) {
			const item = arg.item
			return item == self.draggingItem()
		},
		afterMove: self.afterMove,
	}
}

ko.applyBindings(new ViewModel())
