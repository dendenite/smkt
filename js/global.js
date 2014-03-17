function createGrid() {
	var board_size = document.getElementById('board_size');
	var size = parseInt(board_size.value);
	var grid = document.getElementById('grid');

	board_size.style.display = 'none';
	document.getElementById('view_grid_button').style.display = 'none';
	document.getElementById('upload_conf_button').style.display = 'none';

	for (var i = 0; i < size + 1; i++) {
		var row = document.createElement('TR');
		for (var j = 1; j < size + 2; j++) {
			var def = document.createElement('TD');
			if (i != 0 && j != size + 1) {
				def.classList.add('grid_button');
				def.classList.add('grid_' + i + '-' + j);
				def.setAttribute('onclick', '');
			}
			if (i == 0) {
				def.classList.add('row_sum');
			}
			if (j == size + 1) {
				def.classList.add('col_sum');
			}
			row.appendChild(def);
			grid.appendChild(row);
		}
	}
}

function uploadConfig(evt) {
	// document.getElementById('board_size').style.display = 'none';
	// document.getElementById('view_grid_button').style.display = 'none';

	var files = evt.target.files;
	if (files.length == 0) {
		alert('Please select a file');
		return;
	}
	if (files[0].name.substr(files[0].name.lastIndexOf('.') + 1) != 'txt') {
		document.getElementById('upload_conf_button').value = '';
		alert('Text file only');
		return;
	}
	var reader = new FileReader();
	reader.onloadend = function(evt) {
		if (evt.target.readyState == FileReader.DONE) {
			populateGrids(evt.target.result);
		}
	};
	reader.readAsBinaryString(files[0].slice(0, files[0].size));
}

function populateGrids(config) {
	var grids = document.getElementById('grids');
	while (grids.hasChildNodes()) {
		grids.removeChild(grids.lastChild);
	}
	var config_arr = config.split('\n');
	var config_size = parseInt(config_arr[0]);
	var curr_idx = 1;
	for (var i = 0; i < config_size; i++) {
		var N = parseInt(config_arr[curr_idx++]);
		var init_moves = config_arr[curr_idx++];
		initGrid(N, i);
		for (var j = 0; j < init_moves; j++) {
			var index = config_arr[curr_idx].split(' ');
			var row = parseInt(index[0]) + 1;
			var col = parseInt(index[1]) + 1;
			var td = document.getElementsByClassName('grid-' + i + '_' + row + '-' + col)[0];
			td.classList.add('init_move');
			td.textContent = j + 1;
			var col_sum = document.getElementsByClassName('grid-' + i + '_0-' + col)[0];
			var row_sum = document.getElementsByClassName('grid-' + i + '_' + row + '-' + (N + 1))[0];
			col_sum.textContent = parseInt(col_sum.textContent) + j + 1;
			row_sum.textContent = parseInt(row_sum.textContent) + j + 1;
			curr_idx++;
		}
	}
}

function initGrid(N, i) {
	var div = document.createElement('DIV');
	var start_button = document.createElement('INPUT');
	var table = document.createElement('TABLE');
	var tbody = document.createElement('TBODY');
	for (var row = 0; row < N + 1; row++) {
		var tr = document.createElement('TR');
		for (var col = 1; col < N + 2; col++) {
			var td = document.createElement('TD');
			td.classList.add('grid-' + i + '_' + row + '-' + col);
			if (row == 0) {
				td.classList.add('row_sum_small');
				td.textContent = '0';
			}
			if (col == N + 1) {
				td.classList.add('col_sum_small');
				td.textContent = '0';
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	div.appendChild(table);
	start_button.setAttribute('type', 'button');
	start_button.setAttribute('value', 'Start');
	div.appendChild(start_button);
	div.classList.add('div_table');
	div.classList.add('grid-' + i);
	grids.appendChild(div);
}