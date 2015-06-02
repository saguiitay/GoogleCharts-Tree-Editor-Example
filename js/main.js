$ = jQuery =  require('jquery');
var bootstrap = require('bootstrap');
var handlebars = require('handlebars');
var cardTemplate = require('./templates/card.handlebars');
var cardChart = require('./cardChart');
	
google.load("visualization", "1", {
	packages : ["orgchart"]
});
google.setOnLoadCallback(drawChart);

function drawChart() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'id');
	data.addColumn('string', 'parentId');

	var rootRowProperties =  { title: 'Root', numChildren: 0 };
	data.addRows([
			[{
			    v : 'Root',
                p: rootRowProperties,
				f : cardTemplate(rootRowProperties)
			}, '']
		]);

	var chartOptions = {
		allowHtml : true,
        nodeClass: 'none',
        selectedNodeClass: 'none',
		width: '800px'
	};
	var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
	
	cardChart.attach(data, chart, chartOptions);

	$('#chart_div').on('click', '.add', cardChart.addChild);
	$('#chart_div').on('click', '.remove', cardChart.removeNode);

	chart.draw(data, chartOptions);
}