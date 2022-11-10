const num_cols_max = 8;

const possibleColors = [
    // getComputedStyle(document.body).getPropertyValue('--color1'),
    // getComputedStyle(document.body).getPropertyValue('--color2'),
    getComputedStyle(document.body).getPropertyValue('--color3'),
    getComputedStyle(document.body).getPropertyValue('--color4'),
    getComputedStyle(document.body).getPropertyValue('--color5')
];
const noboxColor = 'white';
let squares = [];

function get_square_row(square_id) {
    return Math.floor(square_id / num_cols_max);
}

function get_square_col(square_id) {
    return square_id % num_cols_max;
}

function get_square_id(square_row, square_col) {

    let toret = square_row * num_cols_max + square_col;
    console.info("[", square_row, ",", square_col, "]", toret);
    return toret;
}

function get_row_col(square_id) {
    return [get_square_row(square_id), get_square_col(square_id)];
}

function get_4_connected_neighbours(square_id) {
    let square_row = get_square_row(square_id);
    let square_col = get_square_col(square_id);

    console.log("square", square_id, ": ", square_row, square_col, " computed ", get_square_id(square_row, square_col));
    let neighbours = [
        square_id + num_cols_max,
        square_id - num_cols_max,
        square_id + 1,
        square_id - 1];
    console.log("unfiltered neighbours ", square_id, neighbours);
    let filtered_neighbours = [];
    //so say we have a square n, then the one above it will be n - max width
    //the one below it will be n + max width
    //the one next to it will be n-1, n+1

    // now we filter stuff
    for (let i = 0; i < neighbours.length; i++) {
        if ((neighbours[i] < num_cols_max * num_cols_max) && (neighbours[i] >= 0)) {
            //now to check if there's no row and column change
            let neighbour_row = get_square_row(neighbours[i]);
            let neighbour_col = get_square_col(neighbours[i]);
            console.log("neighbour ", neighbours[i], ": ", neighbour_row, neighbour_col);
            if (neighbour_row == square_row || neighbour_col == square_col) {
                filtered_neighbours.push(neighbours[i]);
            }
        }
    }
    return filtered_neighbours;


}

function find_all_4_connected_squares_with_color(squares, square_id) {
    //so basically start with the id that we have
    // do its neighbours
    // and then do that ones neighbours
    let color_to_match = squares[square_id].style.backgroundColor;
    console.log("Matching ", color_to_match);
    let ns = get_4_connected_neighbours(square_id);
    console.log("4 connected neighbours ", ns);
    let visited = []
    let tovisit = ns;
    let all_ns = {};
    // so for each of these add these to the list if the color matches
    while (tovisit.length != 0) {
        let visiting = tovisit.pop();
        if (!visited.includes(visiting)) {

            visited.push(visiting);
            if (squares[visiting].style.backgroundColor == color_to_match) {

                let row_col = get_row_col(visiting);
                if (!(row_col[1] in all_ns)) {
                    all_ns[row_col[1]] = [];
                }
                all_ns[row_col[1]].push(row_col[0]);

                // all_ns.push(get_row_col(visiting));
                let visiting_ns = get_4_connected_neighbours(visiting);
                tovisit.push(...visiting_ns);
            }
        }
    }
    // all_ns.sort((a, b) => a - b)
    // all_ns.sort(function(a, b) {
    //     if (a[1] == b[1]) {
    //         return a[0] - b[0];
    //     }
    //     return a[1] - b[1];
    // });
    for (let key in all_ns) {
        all_ns[key].sort((a, b) => a - b);
    }
    console.log(all_ns);
    return all_ns;
}

function update_squares(affected_squares, squares) {
    //affected squares
    //format is a dictionary with columns as keys and rows as list elements
    // for each col we set all the ones in the list to white

    for (let colval in affected_squares) {


        for (let rowindex in affected_squares[colval]) {

            let rowval = affected_squares[colval][rowindex];
            let squareid = get_square_id(parseInt(rowval), parseInt(colval));
            let square = squares[squareid];
            square.style.backgroundColor = noboxColor;
            // square.style.borderColor = "yellow";
        }

        recolor_column(affected_squares[colval],parseInt(colval),squares);


    }
}
function recolor_column(affected_row_vals,column_val,squares){
    let start_at = affected_row_vals[affected_row_vals.length-1];
    let end_at = start_at;
    let start_square = get_square_id(start_at,column_val);
    let next_square = start_square;
    do {
        while (squares[next_square].style.backgroundColor == noboxColor) {
            if (end_at - 1 >= 0) {
                end_at--;
                next_square = next_square - num_cols_max;
            } else {
                break;
            }

        }
        do {
             if (end_at == -1) {
                squares[start_square].style.backgroundColor = noboxColor;
            } else {
                squares[start_square].style.backgroundColor = squares[next_square].style.backgroundColor;
            }
            // if ((start_square - num_cols_max) >= 0) {
                start_square = start_square - num_cols_max;
            // }
            if (end_at-1 >= -1) {
                next_square = next_square - num_cols_max;
                end_at--;
            }
        } while (!affected_row_vals.includes(end_at) && (start_square >=0));
    }while(start_square>=0);
}

function dblclick_grid_square(event) {
    // console.log(event);
    // console.log(event.target);
    let squareid = parseInt(event.target.getAttribute("id"));
    console.log(squareid, " dlb clicked");
    // event.target.style.backgroundColor = noboxColor;
    let all_connected_ns = find_all_4_connected_squares_with_color(squares, squareid);
    //format is a dictionary with columns as keys and rows as list elements
    update_squares(all_connected_ns, squares);
}

function click_grid_square(event) {
    let squareid = parseInt(event.target.getAttribute("id"));
    console.log(squareid, " clicked");
    find_all_4_connected_squares_with_color(squares, squareid);
}

function hover_square(event) {
    let squareid = parseInt(event.target.getAttribute("id"));
    let square_row = get_square_row(squareid);
    let square_col = get_square_col(squareid);

    console.log("square", squareid, ": ", square_row, square_col, " computed ", get_square_id(square_row, square_col));
    console.log(squareid, " hovered");
}

function create_grid_squares(parent_elem) {
    let squares = []
    for (let i = 0; i < num_cols_max * num_cols_max; i++) {
        const square = document.createElement("div");
        square.classList.add("dbox");
        // let colornum = i%possibleColors.length;
        let colornum = Math.floor(Math.random() * possibleColors.length);
        square.style.backgroundColor = possibleColors[colornum];
        // square.innerText = "(" + i + ":" + colornum + ")";

        square.setAttribute('id', i);
        square.addEventListener('dblclick', dblclick_grid_square);
        // square.addEventListener('click',click_grid_square);
        // square.addEventListener('mouseover',hover_square);
        if (parent_elem != null) {
            parent_elem.appendChild(square);
        }
        squares.push(square);

    }
    return squares;
}

function clone_gamebox(parent_elem, squares_to_clone) {
    for (let i = 0; i < squares_to_clone.length; i++) {
        const square = document.createElement("div");
        square.classList.add("dbox");

        square.style.backgroundColor = squares_to_clone[i].style.backgroundColor;
        square.innerText = squares_to_clone[i].innerText;

        square.setAttribute('id', "cbox" + i);
        // square.addEventListener('dblclick',dblclick_grid_square);
        // square.addEventListener('click',click_grid_square);
        // square.addEventListener('mouseover',hover_square);
        if (parent_elem != null) {
            parent_elem.appendChild(square);
        }

    }
}

function load_game(event) {
    console.log(event);
    console.log(event.target);
// lets popuplate the gamebox div
    const gamebox = document.getElementById("gamebox");
    squares = create_grid_squares(gamebox);
    // let gameboxclone = document.getElementById("gamebox_clone");
    // clone_gamebox(gameboxclone, squares);
    gamebox.style.gridTemplateColumns = "repeat(" + num_cols_max + ",1fr)";
    gamebox.style.gridTemplateRows = "repeat(" + num_cols_max + ",1fr)";
    // gameboxclone.style.gridTemplateColumns = "repeat(" + num_cols_max + ",1fr)";
    // gameboxclone.style.gridTemplateRows = "repeat(" + num_cols_max + ",1fr)";


}

document.addEventListener('DOMContentLoaded', load_game);

// document.addEventListener('DOMContentLoaded', () => {
//
// 	const grid = document.querySelector('.grid')
// 	const width = 8
// 	const squares = []
// 	const backgroundColor = 'white'
//
//
// 	const boulderColors = [
// 		'red',
// 		'yellow',
// 		'orange',
// 		'purple',
// 		'green',
// 		'blue'
//
// 	]
//
// 	// create board
//
// 	function createBoard() {
// 		for (let i = 0; i < width * width; i++) {
// 			const square = document.createElement('div')
// 			square.setAttribute('draggable', true)
// 			square.setAttribute('id', i)
//
// 			let randomColor = Math.floor(Math.random() * boulderColors.length)
// 			square.style.backgroundColor = boulderColors[randomColor]
//
//
// 			grid.appendChild(square)
// 			squares.push(square)
// 		}
// 	}
//
// 	createBoard()
//
//
// 	squares.forEach(square => square.addEventListener('dblclick', doubleClick))
//
//
// 	function doubleClick() {
// 		console.log(this.id, 'doubleclick')
//
// 		// get all the squares to remove
// 		squaresToRemove = canDestroy(this.id)
// 		if (squaresToRemove != null) {
// 			//for each square in squares to remove, swap the colors till you get to the last
// 			for (let i = 0; i < squaresToRemove.length; i++) {
// 				currentSquare = parseInt(squaresToRemove[i])
// 				removeSquare(currentSquare)
// 			}
// 		}
// 	}
//
// 	function removeSquare(squareId) {
// 		let currentSquare = parseInt(squareId)
//
//
// 		previousSquare = currentSquare - width
// 		while (previousSquare >= 0) {
// 			// move the colors down
// 			squares[currentSquare].style.backgroundColor = squares[previousSquare].style.backgroundColor
// 			currentSquare = previousSquare
// 			previousSquare = currentSquare - width
//
// 		}
// 		// so now we add an empty color
// 			squares[currentSquare].style.backgroundColor = backgroundColor
// 	}
//
//
// 	function canDestroy(squareId) {
// 		//find all connected squares
// 		// visited
// 		let visited = []
// 		let tovisit = [parseInt(squareId)]
// 		let toDestroy = [parseInt(squareId)]
// 		let colorToMatch = squares[squareId].style.backgroundColor
//
// 		while (tovisit.length != 0) {
//
// 			let currentSquareId = parseInt(tovisit.pop())
// 			if (!visited.includes(currentSquareId))
// 				visited.push(currentSquareId)
// 			else
// 				continue
//
// 			console.log(currentSquareId, "visiting")
// 			children = [currentSquareId - 1, currentSquareId - width, currentSquareId + 1, currentSquareId + width]
// 			for (let i = 0; i < children.length; i++) {
// 				let child = parseInt(children[i])
// 				if (child >= 0 && child < (width * width)) {
// 					console.log(child, "child")
//
// 					if (squares[child].style.backgroundColor == colorToMatch) {
// 						console.log(child, "colormatch")
// 						if (!toDestroy.includes(child)) { toDestroy.push(child) }
// 						if (!visited.includes(child)) {
//
// 							tovisit.push(child)
// 						}
// 					}
// 				}
// 			}
//
//
// 		}
// 		console.log(toDestroy.length, "todestroy")
// 		for (td in toDestroy) {
// 			console.log(toDestroy[td])
//
// 		}
// 		if (toDestroy.length == 1)
// 			return null
// 		else
// 			return toDestroy
//
//
// 	}
//
//
//
//
// })
