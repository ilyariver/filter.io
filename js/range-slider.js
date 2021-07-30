const rangeCost = $('.js-range-slider-input-cost')
const rangeArea = $('.js-range-slider-input-area')
let	from = 0
let	to = 0
let numberRepeat = 1

rangeCost.ionRangeSlider({
	skin: 'round',
	type: 'double',
	drag_interval: true,
	min_interval: 1000000,
	step: 100000,
	min: 2620500,
	max: 7715000,
	hide_min_max: true,
	hide_from_to: true,
	force_edges: false,
	onStart: startInputs,
	onChange: updateInputs,
	onFinish: finishInputs,
	onUpdate: startInputs,
})

rangeArea.ionRangeSlider({
	skin: 'round',
	type: 'double',
	drag_interval: true,
	min_interval: 10,
	step: 10,
	min: 0,
	max: 460,
	hide_min_max: true,
	hide_from_to: true,
	force_edges: false,
	onStart: startInputs,
	onChange: updateInputs,
	onFinish: finishInputs,
	onUpdate: startInputs,
})

function startInputs(data) {
	const parentRangeElement = data.slider[0].parentElement
	const inputFrom = parentRangeElement.querySelector('.js-from-where')
	const inputTo = parentRangeElement.querySelector('.js-from-to')

	from = data.from
	to = data.to

	inputFrom.style.color = '#cbcbcb'
	inputTo.style.color = '#cbcbcb'



	inputFrom.innerHTML = from.toLocaleString('ru-RU')
	inputTo.innerHTML = to.toLocaleString('ru-RU')
}

function updateInputs(data) {
	const parentRangeElement = data.slider[0].parentElement
	const inputFrom = parentRangeElement.querySelector('.js-from-where')
	const inputTo = parentRangeElement.querySelector('.js-from-to')

	inputFrom.style.color = '#0b1739'
	inputTo.style.color = '#0b1739'

	from = data.from
	to = data.to


	inputFrom.innerHTML = from.toLocaleString('ru-RU')
	inputTo.innerHTML = to.toLocaleString('ru-RU')

	if (numberRepeat === 1) {
		console.log('sdf')
		App.f()
		numberRepeat++
	}

}



function finishInputs(data) {
	let filtered = ''
	if (data.slider[0].classList.contains('js-irs-0')) {
		flatsFilter.rangeCost = {
			from: from,
			to: to,
			active: true
		}
		flatsFilter.rangeArea ? flatsFilter.rangeArea['active'] = false : false
		filtered = App.filterRender('rangeCost', 'cost')
	}
	if (data.slider[0].classList.contains('js-irs-1')) {
		flatsFilter.rangeArea = {
			from: from,
			to: to,
			active: true
		}
		flatsFilter.rangeCost ? flatsFilter.rangeCost['active'] = false : false
		filtered = App.filterRender('rangeArea', 'area')
	}

	numberRepeat = 1
	getResponse(App.stateView, false, 'slide', filtered)
}