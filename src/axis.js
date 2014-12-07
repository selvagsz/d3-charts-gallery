d3.chart('XAxis', {
  initialize: function(options) {
    options = options || {};
    var chart = this;

    var margin = options.margin || { top: 0, right: 1, bottom: 50, left: 1 };

    var x = chart.x = options.scale || d3.scale.ordinal();


    var xAxis = d3.svg.axis()
      .scale(x);

    var xAxisBase = this.base.append('g')
      .classed('xaxis-container', true)
      .attr('transform', 'translate(' + margin.left + ',' + -(margin.bottom) + ')');

    chart.on('change:width', function(newWidth){
      var newWidth = chart.width - margin.left - margin.right;
      x.rangeRoundBands([0, newWidth], 0.05);
    });

    chart.layer('xaxis', xAxisBase, {
      dataBind: function() {
        var chart = this.chart();

        chart.x.domain(data.map(function(d){ return d.name; }));

        return this.selectAll('g.axis')
          .data([data]);
      },

      insert: function() {
        return this.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + chart.height + ")")
          .call(xAxis);
      }
    });
  },

  width: function(_) {
    if(!arguments.length) {
      return this.width;
    }
    this.width = _;

    // adjust the base width
    this.base.attr('width', this.width);
    this.trigger("change:width");

    if (this.data) this.draw(this.data);

    return this;
  },

  height: function(_) {
    if(!arguments.length) {
      return this.height;
    }
    this.height = _;

    // adjust the base width
    this.base.attr('height', this.height);
    this.trigger("change:height");

    if (this.data) this.draw(this.data);

    return this;
  }
});
