'use strict';

define(
  'sf.b2c.mall.widget.region',
  [
    'zepto',
    'can',
    'sf.b2c.mall.business.config',
  	'sf.b2c.mall.adapter.regions',
  	'text!json_regions',
    'text!template_widget_region'
  ],

  function($, can, SFConfig, RegionsAdapter,
  	json_regions, template_widget_region) {

    return can.Control.extend({

	    adapter: {},
	    renderData: null,

 			helpers: {
	    },

      init: function() {
      	this.request();
      	this.initRenderData();
      	this.render();
      },

      initRenderData:function() {
	      var that = this;

	      this.renderData = new can.Map({
          provinces: { 
          	data: this.adapter.regions.findGroup(0),
          	selected: {
          		data: null,
          		tapItem: _.bind(function(context, targetElement, event){
	          		this.renderData.attr("provinces.selected.data", null);
	          		this.changeCity(0);
      					this.changeRegion(0);
	          	}, that)
          	},
          	tapItem: _.bind(function(context, targetElement, event){
          		this.renderData.attr("provinces.selected.data", context);
          		this.changeCity(context.id);
      				this.changeRegion(0);
          	}, that)
          },
          cities: {
          	data: null,
          	selected: {
          		data: null,
          		tapItem: _.bind(function(context, targetElement, event){
	          		this.renderData.attr("cities.selected.data", null);
	      				this.changeRegion(0);
	          	}, that)
          	},
          	tapItem: _.bind(function(context, targetElement, event){
          		this.renderData.attr("cities.selected.data", context);
      				this.changeRegion(context.id);
          	}, that)
          },
          regions: {
          	data: null,
          	selected: {
          		data: null,
          	},
          	tapItem: _.bind(function(context, targetElement, event){
          		this.renderData.attr("regions.selected.data", context);
      				this.regionFinish();
          	}, that)
          }
        });

				this.initDefaultData();
      },

      initDefaultData: function() {
	      var that = this;
				if (this.options.data
					&& this.options.data.provinceName
					&& this.options.data.cityName
					&& this.options.data.regionName) {
					var provinceName = this.options.data.provinceName;
					var cityName = this.options.data.cityName;
					var regionName = this.options.data.regionName;

      		this.renderData.attr("provinces.selected.data", {name : provinceName});
      		this.renderData.attr("cities.selected.data", {name : cityName});
      		this.renderData.attr("regions.selected.data", {name : regionName});


	        var cities = this.adapter.regions.getGroupByName(provinceName);
	        this.renderData.attr('cities.data', cities);

	        var regions = this.adapter.regions.getGroupByName(cityName);
	        this.renderData.attr('regions.data', regions);
				}
      },

      render: function() {
        var renderFn = can.mustache(template_widget_region);
        var html = renderFn(this.renderData, this.helpers);
        this.element.html(html).show();;
      },

			request: function() {
	      var cities = JSON.parse(json_regions);

	      this.adapter.regions = new RegionsAdapter({
	          cityList: cities
	      });
	    },

	    regionFinish: function() {
	    	var result = {
	    		nationName: "中国",
	    		provinceName: this.renderData.provinces.selected.data.name,
	    		cityName: this.renderData.cities.selected.data.name,
	    		regionName: this.renderData.regions.selected.data.name
	    	};

	    	this.options.onFinish(result);
	    	this.element.html("").hide();
	    },

			changeCity: function(pid) {
	      if (pid == 0) {
	        this.renderData.attr('cities.data', null);
	      }else {
	        var cities = this.adapter.regions.findGroup(window.parseInt(pid, 10));
	        this.renderData.attr('cities.data', cities);
	      }
	    },

	    changeRegion: function(cid) {
	      if (cid == 0) {
	        this.renderData.attr('regions.data', null);
	      }else{
	        var regions = this.adapter.regions.findGroup(window.parseInt(cid, 10));
	        this.renderData.attr('regions.data', regions);
	      }
	    }
    });
  })