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
function CategoryModel({ title, subtitle, elements }) {
	const self = this

	self.title = title
	self.subtitle = subtitle
	self.elements = elements

	self.isCollapsed = ko.observable(false)
	self.collapse = function () {
		self.isCollapsed(!self.isCollapsed())
	}
}

function ViewModel() {
	const self = this

	// Categories
	self.categories = ko.observableArray([
		new CategoryModel({
			title: 'Обязательные для всех',
			subtitle: 'Документы, обязательные для всех сотрудников без исключения',
			elements: ko.observableArray([
				{ title: 'Паспорт', status: 'Обязательный', subtitle: 'Для всех' },
				{ title: 'ИНН', status: 'Обязательный', subtitle: 'Для всех' },
			]),
		}),

		new CategoryModel({
			title: 'Обязательные для трудоустройства',
			subtitle:
				'Документы, без которых невозможно трудоустройство человека на какую бы то ни было должность в компании вне зависимости от гражданства',
			elements: ko.observableArray([]),
		}),

		new CategoryModel({
			title: 'Специальные',
			subtitle: '',
			elements: ko.observableArray([]),
		}),
	])

	// Single elements
	self.singleCategories = ko.observableArray([
		new CategoryModel({
			title: 'Тестовое задание кандидата',
			subtitle:
				'Россия, Белорусия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха',
			elements: [],
		}),
		new CategoryModel({
			title: 'Трудовой договор',
			subtitle: '',
			elements: [],
		}),
		new CategoryModel({
			title: 'Мед. книжка',
			subtitle: '',
			elements: [],
		}),
	])
}

ko.bindingHandlers.slideIn = {
	init: function (element, valueAccessor) {
		const value = ko.utils.unwrapObservable(valueAccessor())
		$(element).toggle(value)
	},
	update: function (element, valueAccessor) {
		const value = ko.utils.unwrapObservable(valueAccessor())
		value ? $(element).slideDown() : $(element).slideUp()
	},
}

ko.applyBindings(new ViewModel())

/////
///////// IN CASE IF I AM NOT ALLOWED TO USE JQUERY AND PLUGINS
/////
// self.draggingItem = ko.observable(null)

// self.startDrag = function (item) {
// 	self.draggingItem(item)
// }

// self.afterMove = function (arg) {
// 	const item = self.draggingItem()
// 	const newIndex = arg.targetIndex
// 	self.singleCategories.remove(item)
// 	self.singleCategories.splice(newIndex, 0, item)
// 	self.draggingItem(null)
// }

// self.sortableOptions = {
// 	data: self.singleCategories,
// 	beforeMove: function (arg) {
// 		const item = arg.item
// 		return item == self.draggingItem()
// 	},
// 	afterMove: self.afterMove,
// }
