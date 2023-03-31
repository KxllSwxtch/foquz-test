// KO MODEL
function CategoryModel({ title, subtitle, status, elements }) {
	const self = this

	self.title = title
	self.subtitle = subtitle
	self.status = status
	self.elements = elements

	// Collapse functionality
	self.isCollapsed = ko.observable(true)
	self.collapse = function () {
		self.isCollapsed(!self.isCollapsed())
	}
}

function ViewModel() {
	const self = this

	// Search
	self.query = ko.observable('')
	self.clearQuery = function () {
		self.query('')
	}
	self.hasTyped = ko.computed(function () {
		return self.query().length > 0
	})

	// This will only let the user move the item after clicking the move icon
	self.selectedItem = ko.observable(null)

	// Categories
	self.categories = ko.observableArray([
		new CategoryModel({
			title: 'Обязательные для всех',
			subtitle: 'Документы, обязательные для всех сотрудников без исключения',
			elements: ko.observableArray([
				new CategoryModel({
					title: 'Паспорт',
					status: 'Обязательный',
					subtitle: 'Для всех',
				}),
				new CategoryModel({
					title: 'ИНН',
					status: 'Обязательный',
					subtitle: 'Для всех',
				}),
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

	self.filteredCategories = ko.computed(function () {
		const query = self.query().toLowerCase()
		if (!query) return self.categories()
		else {
			return ko.utils.arrayFilter(self.categories(), function (item) {
				return item.title.toLowerCase().indexOf(query) >= 0
			})
		}
	}, self)

	// Single elements
	self.singleCategories = ko.observableArray([
		new CategoryModel({
			title: 'Тестовое задание кандидата',
			subtitle:
				'Россия, Белорусия, Украина, администратор филиала, повар-сушист, повар-пиццмейкер, повар горячего цеха',
			elements: [],
			status: '',
		}),
		new CategoryModel({
			title: 'Трудовой договор',
			subtitle: '',
			elements: [],
			status: '',
		}),
		new CategoryModel({
			title: 'Мед. книжка',
			subtitle: '',
			elements: [],
			status: '',
		}),
	])

	self.filteredSingleCategories = ko.computed(function () {
		const query = self.query().toLowerCase()
		if (!query) return self.singleCategories()
		else {
			return ko.utils.arrayFilter(self.singleCategories(), function (item) {
				return item.title.toLowerCase().indexOf(query) >= 0
			})
		}
	}, self)

	self.onSortEnd = function (event, ui) {
		ui.item.addClass('dropped-item')
		setTimeout(function () {
			ui.item.removeClass('dropped-item')
		}, 500)
	}
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
