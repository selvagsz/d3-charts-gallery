var data = [
  {
    name: 'tom',
    value: 200
  },
  {
    name: 'yehuda',
    value: 250
  },
  {
    name: 'iamstef',
    value: 300
  },
  {
    name: 'machty',
    value: 150
  },
  {
    name: 'rwjblue',
    value: 378
  },
  {
    name: 'kris',
    value: 123
  },
  {
    name: 'selvagsz',
    value: 10
  }
];

var XAxisChart = d3.select('#bar-viz')
  .append('svg')
  .chart('XAxis')
  .width(600)
  .height(500);

XAxisChart.draw(data);


var BarChart = d3.select('#bar-viz')
  .append('svg')
  .chart('Bars', {
    margin: {
      left: 25,
      right: 25,
      top: 50,
      bottom: 50
    },

    colors: ['#ccc', '#999', "#aaa", '#dad'],

    rangeRoundBand: 0.05
  })
  .width(600)
  .height(500);

BarChart.draw(data);
