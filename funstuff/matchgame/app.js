document.addEventListener('DOMContentLoaded', () => {

	const grid = document.querySelector('.grid')
	const width = 8
	const squares = []
	const backgroundColor = 'white'


	const boulderColors = [
		'red',
		'yellow',
		'orange',
		'purple',
		'green',
		'blue'

	]

	// create board

	function createBoard() {
		for (let i = 0; i < width * width; i++) {
			const square = document.createElement('div')
			square.setAttribute('draggable', true)
			square.setAttribute('id', i)

			let randomColor = Math.floor(Math.random() * boulderColors.length)
			square.style.backgroundColor = boulderColors[randomColor]


			grid.appendChild(square)
			squares.push(square)
		}
	}

	createBoard()


	squares.forEach(square => square.addEventListener('dblclick', doubleClick))


	function doubleClick() {
		console.log(this.id, 'doubleclick')

		// get all the squares to remove
		squaresToRemove = canDestroy(this.id)
		if (squaresToRemove != null) {
			//for each square in squares to remove, swap the colors till you get to the last 
			for (let i = 0; i < squaresToRemove.length; i++) {
				currentSquare = parseInt(squaresToRemove[i])
				removeSquare(currentSquare)
			}
		}
	}

	function removeSquare(squareId) {
		let currentSquare = parseInt(squareId)


		previousSquare = currentSquare - width
		while (previousSquare >= 0) {
			// move the colors down 
			squares[currentSquare].style.backgroundColor = squares[previousSquare].style.backgroundColor
			currentSquare = previousSquare
			previousSquare = currentSquare - width

		}
		// so now we add an empty color 
			squares[currentSquare].style.backgroundColor = backgroundColor
	}


	function canDestroy(squareId) {
		//find all connected squares 
		// visited 
		let visited = []
		let tovisit = [parseInt(squareId)]
		let toDestroy = [parseInt(squareId)]
		let colorToMatch = squares[squareId].style.backgroundColor

		while (tovisit.length != 0) {

			let currentSquareId = parseInt(tovisit.pop())
			if (!visited.includes(currentSquareId))
				visited.push(currentSquareId)
			else
				continue

			console.log(currentSquareId, "visiting")
			children = [currentSquareId - 1, currentSquareId - width, currentSquareId + 1, currentSquareId + width]
			for (let i = 0; i < children.length; i++) {
				let child = parseInt(children[i])
				if (child >= 0 && child < (width * width)) {
					console.log(child, "child")

					if (squares[child].style.backgroundColor == colorToMatch) {
						console.log(child, "colormatch")
						if (!toDestroy.includes(child)) { toDestroy.push(child) }
						if (!visited.includes(child)) {

							tovisit.push(child)
						}
					}
				}
			}


		}
		console.log(toDestroy.length, "todestroy")
		for (td in toDestroy) {
			console.log(toDestroy[td])

		}
		if (toDestroy.length == 1)
			return null
		else
			return toDestroy


	}




})
