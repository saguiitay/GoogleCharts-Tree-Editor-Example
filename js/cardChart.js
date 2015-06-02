var cardTemplate = require('./templates/card.handlebars');

var _data, _chart, _charOptions;
function refreshChart() {
	_chart.draw(_data, _chartOptions);
	
	_chart.setSelection([]);
}


exports.attach = function(data, chart, chartOptions) {
	_data = data;
	_chart = chart;	
	_chartOptions = chartOptions;
}

exports.addChild = function() {
	var selectedRows = _chart.getSelection();
	var selected = selectedRows[0];
	
	var parentId = _data.getValue(selected.row, 0);
	var parentProperties = _data.getProperties(selected.row, 0);
	
	var view = new google.visualization.DataView(_data);
	view.setRows(view.getFilteredRows([{column: 1, value: parentId}]));

	var parentNumChildren = view.getNumberOfRows();

	var newNodeProperties = { title: 'New Child ' + parentNumChildren, numChildren: 0 };
	var newRow = [{
			v : parentId + '/New Child ' + parentNumChildren,
			p: newNodeProperties,
			f : cardTemplate(newNodeProperties)
		},
		parentId];

	_data.addRow(newRow);
	
	parentProperties.numChildren = parentNumChildren+1;
	
	_data.setFormattedValue(selected.row, 0, cardTemplate(parentProperties));

	refreshChart();
}


exports.removeNode = function() {
	var selectedRows = _chart.getSelection();
	var selected = selectedRows[0];
	
	var nodeId = _data.getValue(selected.row, 0);
	var parentId = _data.getValue(selected.row, 1);
	
	var view = new google.visualization.DataView(_data);
	var parentRowIndex = view.getFilteredRows([{column: 1, value: parentId}])[0];
	
	view.setRows(view.getFilteredRows([{column: 1, value: parentId}]));
	var parentNumChildren = view.getNumberOfRows();
	
	var parentProperties = _data.getProperties(parentRowIndex, 0);
	parentProperties.numChildren = parentNumChildren-1;
	
	_data.setFormattedValue(parentRowIndex, 0, cardTemplate(parentProperties));

	_data.removeRow(selected.row);
	
	refreshChart();
}