const ulList = document.querySelector('.ul-list')
const input = document.querySelector('.input')
const addBtn = document.querySelector('.add-btn')
const deleteBtn = document.querySelector('.delete')
const editBtn = document.querySelector('.edit')
const readyBtn = document.querySelector('.fa-check')
const text = document.querySelector('.text')
const emptyList = document.querySelector('.empty-list')
const currentDay = document.querySelector('.current-day')

const bgBtns = document.querySelectorAll('.bg')
const motiveBtn = document.querySelector('.motive')
const motives = document.querySelector('.motives')

const todoImg = document.querySelector('.hero-img')

const popup = document.querySelector('.popup')
const popupInput = document.querySelector('.popupinput')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const error = document.querySelector('.error')

let ID = 0
let todoToEdit

const todayDay = () => {
	const date = new Date()
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
	const currDay = date.toLocaleDateString('pl-PL', options)
	currentDay.textContent = currDay
}

todayDay()

const checkInput = () => {
	if (input.value !== '') {
		createTodo()
	}
}

const createTodo = () => {
	const newLi = document.createElement('li')
	newLi.classList.add('li-item')
	newLi.setAttribute('id', ID)

	newLi.innerHTML = ` <button class="btn-circle">
	<i class="fa-solid fa-check"></i>
	</button>
	<p class="text">${input.value}</p>
	<button class="btn delete" onclick="endTask(${ID})"><i class="fa-solid fa-xmark"></i></button>
	<button class="btn edit">EDIT</button>`

	ulList.append(newLi)
	ID++
	input.value = ''
	empty()
}

const endTask = ID => {
	const liDelete = document.getElementById(ID)

	ulList.removeChild(liDelete)

	empty()
}

const activeTask = e => {
	if (e.target.matches('.fa-solid')) {
		e.target.parentElement.nextElementSibling.classList.toggle('ready')
	}
}

const empty = () => {
	const allTodos = document.querySelectorAll('.li-item')

	if (allTodos.length === 0) {
		emptyList.textContent = 'Dodaj nowe zadanie'
	} else {
		emptyList.textContent = ''
	}
}


const showMotives = () => {
	motives.classList.toggle('show-motives')
}

const hideMotivesWindow = e => {

	if(e.target.classList.contains('motives') || e.target.classList.contains('motive') || e.target.classList.contains('bg') || e.target.classList.contains('fa-solid') || e.target.classList.contains('bg-box') || e.target.classList.contains('motives-title')) return

	motives.classList.remove('show-motives')
}



const changeBg = e => {
	bgBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			if (btn.matches('.one')) {
				todoImg.style.backgroundImage = `url('https://cdn.pixabay.com/photo/2020/07/27/14/34/forest-5442598_960_720.jpg')`
			} else if (btn.matches('.two')) {
				todoImg.style.backgroundImage = `url('https://cdn.pixabay.com/photo/2011/12/14/12/17/galaxy-11098_960_720.jpg')`
			} else if (btn.matches('.three')) {
				todoImg.style.backgroundImage = `url('https://cdn.pixabay.com/photo/2015/12/05/08/25/fairy-tale-1077863_960_720.jpg')`
			} else if (btn.matches('.four')) {
				todoImg.style.backgroundImage = `url('https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_960_720.jpg')`
			} else if (btn.matches('.five')) {
				todoImg.style.backgroundImage = `url('https://cdn.pixabay.com/photo/2017/10/20/01/06/north-star-2869817_960_720.jpg')`
			} else if (btn.matches('.six')) {
				todoImg.style.backgroundImage = `url('https://cdn.pixabay.com/photo/2017/02/08/12/46/moon-2048727_960_720.jpg')`
			} else if (btn.matches('.seven')) {
				todoImg.style.backgroundImage = `linear-gradient(
					to right,
					#b8cbb8 0%,
					#b8cbb8 0%,
					#b465da 0%,
					#cf6cc9 33%,
					#ee609c 66%,
					#ee609c 100%
				)`
			} else if (btn.matches('.eight')) {
				todoImg.style.backgroundImage = `url(https://cdn.pixabay.com/photo/2020/04/09/02/26/tree-5019381_960_720.jpg)`
			} else if (btn.matches('.nine')) {
				todoImg.style.backgroundImage = `url(https://cdn.pixabay.com/photo/2021/05/11/06/22/night-sky-6245049_960_720.jpg)`
			}
		})
	})
}

const showPopup = e => {
	todoToEdit = e.target.closest('li')

	if (e.target.matches('.edit')) {
		popup.style.display = 'flex'
		popupInput.value = todoToEdit.firstChild.nextElementSibling.nextElementSibling.textContent
	}
}

const cancelPopup = () => {
	popup.style.display = 'none'
	error.textContent = ''
}

const savePopup = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.nextElementSibling.nextElementSibling.textContent = popupInput.value
		popup.style.display = 'none'
		error.textContent = ''
	} else {
		error.textContent = 'Wprowadz treść zadania'
	}
}

const keyEnter = e => {
	if (e.key === 'Enter') {
		checkInput()
	}
}

const editEnter = (e) => {
	if (e.key === 'Enter'){
		savePopup()
	}
}

ulList.addEventListener('click', showPopup)
addBtn.addEventListener('click', checkInput)
ulList.addEventListener('click', activeTask)
input.addEventListener('keydown', keyEnter)
motiveBtn.addEventListener('click', showMotives)
cancelBtn.addEventListener('click', cancelPopup)
saveBtn.addEventListener('click', savePopup)
popupInput.addEventListener('keydown', editEnter)
window.addEventListener('click', hideMotivesWindow)

changeBg()
