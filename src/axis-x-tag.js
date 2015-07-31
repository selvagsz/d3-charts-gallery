xtag.register('x-axis', {
  lifecycle: {
    created: function(){
      console.log('super element created');
      this.innerHTML = '<div id="bar-viz"></div>';
      var XAxisChart = d3.select('#bar-viz')
        .append('svg')
        .chart('XAxis', {
          data: this.points
        })
        .width(600)
        .height(500);

      XAxisChart.draw(JSON.parse(this.points));
      console.log(JSON.parse(this.points));
    }
  },
  accessors: {
    points: {
      attribute: {},
      get: function() {
        return this.getAttribute('points') || '[]'
      },
      set: function(value){
        this.xtag.data.points = value;
      }
    }
  }
});
