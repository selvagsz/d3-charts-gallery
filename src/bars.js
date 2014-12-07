d3.chart('Bars', {
  initialize: function(options) {
    var chart = this;
    options = options || {};

    var margin = options.margin || { top: 0, right: 0, bottom: 0, left: 0 };
    var colorsRange = options.colors || d3.scale.category20().range();
    var rangeRoundBand = options.rangeRoundBand || 0.05;

    var x = chart.x = d3.scale.ordinal();
    var y = chart.y = d3.scale.linear();
    var colors = chart.colors = d3.scale.ordinal().range(colorsRange);

    chart.on('change:width', function(newWidth){
      var newWidth = chart.width - margin.left - margin.right;
      x.rangeRoundBands([0, newWidth], rangeRoundBand);
    });

    chart.on('change:height', function(newHeight) {
      var newHeight = chart.height - margin.top - margin.bottom;
      y.range([newHeight, 0]);
    });

    var barBase = chart.base.append('g')
      .classed('bars-container', true)
      .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')');

    chart.layer('bars', barBase, {
      dataBind: function(data) {
        var chart = this.chart();

        chart.x.domain(data.map(function(d){ return d.name; }));
        chart.y.domain([
          d3.min(data, function(d) { return d3.min([d.value, 0]); }),
          d3.max(data, function(d) { return d.value; })
        ]);

        return this.selectAll('rect')
          .data(data, function(d) { return d.name; });
      },

      insert: function() {
        return this.append('rect')
          .classed('bar', true)
          .attr('fill', function(d) { return colors(d.name); });
      },

      events: {
        exit: function() {
          this.remove();
        }
      }
    });

    var onEnter = function() {
      this
        .attr('x', function(d) { return chart.x(d.name); })
        .attr('y', function(d) { return chart.y(d3.max([0, d.value])); })
        .attr('height', function(d) { return Math.abs(chart.y(0) - chart.y(d.value)); })
        .attr('width', chart.x.rangeBand());
    }

    chart.layer('bars').on('enter', onEnter);
    chart.layer('bars').on('update', onEnter);
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
