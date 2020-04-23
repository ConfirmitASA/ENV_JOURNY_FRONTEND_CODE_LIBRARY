function createLineList(parameters, sorting) {
	var container = parameters.container;
	var greyColor = parameters.greyColor;
	var values = parameters.values;
	var svgSettings = parameters.svgSettings;
	// sorting parameter can only be 'descending' or 'ascending'	
	
	var svgNamespace = "http://www.w3.org/2000/svg";	
	
	var lineListDiv = document.createElement('div');
	lineListDiv.classList.add('card__line-list');
	lineListDiv.classList.add('line-list');
	
	if (!Array.isArray(values)) {
		lineListDiv.innerText = values;
		container.appendChild(lineListDiv);
		return;
	}
	
	if (sorting) {
		values.sort(function(a, b) {
			if (sorting === 'ascending') {
				return a.value - b.value;
			}
			if (sorting === 'descending') {
				return b.value - a.value;
			}
		});
	}
	
	for (var i = 0; i < values.length; i++) {
		var listItemDiv = document.createElement('div');
		listItemDiv.classList.add('line-list__item');
		
		var itemHeaderDiv = document.createElement('div');
		itemHeaderDiv.classList.add('line-list__item__header');
		
		var nameLabel = document.createElement('label');
		nameLabel.innerHTML = values[i].name;
		
		var valueLabel = document.createElement('label');
		valueLabel.innerText = values[i].value;
		
		var itemLineDiv = document.createElement('div');
		itemLineDiv.classList.add('line-list__item__line');
		
		var svg = document.createElementNS(svgNamespace, 'svg');
		svg.setAttribute('width', '100%');
		svg.setAttribute('viewBox', '0 0 100 4');
		
		var backgroundLine = document.createElementNS(svgNamespace, 'line');
		backgroundLine.setAttribute('x1', svgSettings.x);
		backgroundLine.setAttribute('y1', svgSettings.y);
		backgroundLine.setAttribute('x2', (100 - svgSettings.x));
		backgroundLine.setAttribute('y2', svgSettings.y);
		backgroundLine.setAttribute('stroke', greyColor);
		backgroundLine.setAttribute('stroke-linecap', 'round');
		backgroundLine.setAttribute('stroke-width', svgSettings.strokeWidth);
		
		var valueLine = document.createElementNS(svgNamespace, 'line');
		valueLine.setAttribute('x1', svgSettings.x);
		valueLine.setAttribute('y1', svgSettings.y);
		valueLine.setAttribute('x2', ((100 - svgSettings.x) / 100) * values[i].value);
		valueLine.setAttribute('y2', svgSettings.y);
		valueLine.setAttribute('stroke', values[i].color);
		valueLine.setAttribute('stroke-linecap', 'round');
		valueLine.setAttribute('stroke-width', svgSettings.strokeWidth);
		
		itemHeaderDiv.appendChild(nameLabel);
		itemHeaderDiv.appendChild(valueLabel);
		
		svg.appendChild(backgroundLine);
		svg.appendChild(valueLine);
		
		itemLineDiv.appendChild(svg);
		
		listItemDiv.appendChild(itemHeaderDiv);
		listItemDiv.appendChild(itemLineDiv);
		
		lineListDiv.appendChild(listItemDiv);
	}
	
	container.appendChild(lineListDiv);
}

function createSortBtn(container, clickFunc) {	
	var sortIcon = document.createElement('span');
	sortIcon.title = ReportTemplateConfig.translations.Sorting;
	sortIcon.classList.add('card__sort-btn');
	
	sortIcon.addEventListener('click', clickFunc);
	container.parentNode.insertBefore(sortIcon, container);
}