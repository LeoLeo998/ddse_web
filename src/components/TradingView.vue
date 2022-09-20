<template>
  <div class="exchage" id="tv_chart_container"></div>
</template>
  
  <script>
import { widget } from '../../static/custom_scripts/chart_main/charting_library.min';
import Datafeed from '@/util/datafeed';
import { mapGetters, mapActions } from 'vuex';
import bus from '@/util/bus';
  
  // 定义变量读取参数
  
  export default {
    data(){
      return {
        // 定义参数接收接受图表
        tvWidget: null,
        datafeed:null
      }
    },
    computed:{
        ...mapGetters([
            "getMarketData",
            "getSelectMarket"
        ]),
        
    },
    mounted(){
      bus.$on('updateData',(data) => {
        this.datafeed.formatData(data)
      })
      this.datafeed = new Datafeed(this)
      //基本配置
      const widgetOptions = {
		debug: false, // uncomment this line to see Library errors and warnings in the console
		fullscreen: false, // 是否全屏
		symbol: "BTCUSDm", // 默认商品标识
		interval: '1', // 初始化显示时间范围
		container_id: "tv_chart_container", // 容器的id名
		// 调用接口API hrc_usdt
		datafeed: this.datafeed,
		library_path: "static/custom_scripts/chart_main/",
		// 语言 en英文 zh 中文
		locale: "zh",
		//enabled_features: ["study_templates"],
		charts_storage_url: '',
		charts_storage_api_version: "1.1",
		client_id: 'tradingview.com',
		user_id: 'public_user_id',
		//theme: getParameterByName('theme'),
		timeframe:'1440',
		timezone:'Asia/Shanghai',
		autosize:true,
		
		toolbar_bg:'#f0f0f0',
		loading_screen:{backgroundColor:'#fff',foregroundColor:'#fff'},
		
		linetoolicon: {
			singleChartOnly: true,
			color: '#ff0000',
			size: 40,
			icon: 0x263A,
			angle: Math.PI * 0.5,
			scale: 1.0
		},
		
		disabled_features: [
			//"use_localstorage_for_settings"
			'header_symbol_search',//头部搜索
			//'header_widget_dom_node',//隐藏头部组件
			//'source_selection_markers',//禁用系列和指示器的选择标记
			//'header_indicators',//图标指标
			'adaptive_logo',//移动端可以隐藏logo
			//'constraint_dialogs_movement',
			//'header_interval_dialog_button',
			//'show_interval_dialog_on_key_press',
			//'symbol_search_hot_key',
			//'study_dialog_search_control',
			'display_market_status',
			//'header_chart_type',// k线样式
			//'header_compare',//图表对比
			'header_undo_redo',//撤销返回
			'header_screenshot',//截图
			//'volume_force_overlay',//防止他们重叠
			'header_settings',//设置
			//'property_pages',//禁用所有属性页
			'header_fullscreen_button',//全屏
			'header_saveload',
			'edit_buttons_in_legend',
			'timeframes_toolbar',//下面的时间
			'symbol_info',
			'border_around_the_chart',
			'main_series_scale_menu',
			'star_some_intervals_by_default',
			'datasource_copypaste',
			'right_bar_stays_on_scroll',
			'context_menus',
			'go_to_date',
			'compare_symbol',
			'border_around_the_chart',
			'timezone_menu',
			//'header_resolutions',// todo：przetestowac //头部的时间
			'control_bar',// todo：przetestowac
			'edit_buttons_in_legend',// todo：przetestowac
			'remove_library_container_border',		
			'widget_logo'
		],
		theme: "light",
		overrides: {
			"paneProperties.background": "#fff",
			"paneProperties.horzGridProperties.color": "#eee", //水平网格线颜色，默认：#313131
			"paneProperties.vertGridProperties.color": "#eee", //垂直网格线颜色，默认：#313131
			
			'symbolWatermarkProperties.color' : 'rgba( 85, 85, 85, 0)',
			//'paneProperties.topMargin': 10,
			'paneProperties.crossHairProperties.color': '#19191e',
			//'paneProperties.legendProperties.showLegend': false,

			//K线图的颜色
			'mainSeriesProperties.candleStyle.upColor':'#26A69A',
			'mainSeriesProperties.candleStyle.downColor':'#EF5350',
			'mainSeriesProperties.candleStyle.drawWick':true,
			'mainSeriesProperties.candleStyle.drawBorder':true,
			
			//涨的最高最低线颜色
			'mainSeriesProperties.candleStyle.wickUpColor':'#26A69A',
			//跌的最高最低线颜色
			'mainSeriesProperties.candleStyle.wickDownColor':'#EF5350',
			//涨的外边线
			'mainSeriesProperties.candleStyle.borderUpColor': "#26A69A",
			//跌的外边线
			'mainSeriesProperties.candleStyle.borderDownColor': "#EF5350",
			
			"scalesProperties.textColor" : "#ffbe40",
			}
					
      	}

      this.tvWidget = new widget(widgetOptions);
    },
    methods:{
      ...mapActions([
          "marketListFetch"
      ]),
    },
    watch:{
      getSelectMarket (v) {
          this.tvWidget.setSymbol(v,1,null);
      }
    }
  }
  </script>
  
  <style scoped>
  .exchage{
    position: relative;
    z-index: 100;
    width: 100%;
    height: 484px;
    background-color: #fff;
  }
  </style>
  