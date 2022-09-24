
<template>
    <div style="display:block;height:inherit;">
        <canvas :id="symbolc" width="302" height="121" class="chartjs-size-monitor"></canvas>
    </div>
</template>
<script>
import "@/assets/js/Chart.min.js"
export default {
    name:"HIndexChart",
    // props:[],
    data () {
        return {

        }
    },
    computed: {
        symbolc(){
            return this.symbol
        },
		klineData() {
			return this.kline
		}
    },
    props:{
        kline:{
            type:Array,
            default: () => {
                return []
            }
        },
        symbol:{
            type:String,
            default:''
        },
        backgroundColor:{
            type:String,
            default:'#eef5fa'
        },
        borderColor:{
            type:String,
            default:'#93c5e8'
        },
        themeType: ''
    },
    mounted () {
        Chart.defaults.line.label = false;
        Chart.defaults.line.bezierCurve = true;
        this.init()
        // this.renderChart(this.dataOp(this.kline), this.makeOp(this.kline))
    },
    methods: {
        makeOp: function (klinedata) {
            var mymax = this.getMaximin(klinedata, "max");
            var mymin = this.getMaximin(klinedata, "min");
            var avgMinMax = (this.getMaximin(klinedata, "max") - this.getMaximin(klinedata, "min")) / 2;
            var nowbottom;
            var nowtop;
            var nowstep;
            var nowstep = (mymax - mymin) / 10;
            nowtop = mymax + nowstep;
            nowbottom = mymin - nowstep;

            var a = {
                legend: {
                    display: false,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                },
                scaleLabel: {
                    display: false
                },
                scaleShowLabels: false,
                scales: {
                    display: false,
                    xAxes: [{
                        display: false
                    }],
                    // yAxes: [{
                    //     display: false
                    // }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            //maxTicksLimit:200,
                            max: nowtop,
                            min: nowbottom,
                            stepSize: nowstep,
                            beginAtZero: false
                        }
                    }]
                },
            }
            return a
        },
        dataOp (klinedata) {
            var a = {
                //折线图需要为每个数据h点设置一标签。这是显示在X轴上。
                labels: klinedata,
                // //这边的thisId分别对应labels的id
                //  thisIds : [12,22,50,44,99,3,67],
                //数据集（y轴数据范围随数据集合中的data中的最大或最小数据而动态改变的）
                datasets: [{
                    borderWidth: 1,
                    scaleShowLabels: false,
                    backgroundColor: this.backgroundColor, //背景填充色
                    borderColor: this.borderColor,
                    pointRadius: 0,
                    // pointColor: "rgba(151,187,205,1)",
                    // pointStrokeColor: "#fff",
                    data: klinedata
                }]
            };
            return a
        },
        //获取数组最大或最小
        getMaximin (arr, maximin) {
            if (arr.length > 0) {
                if (maximin == "max") {
                    return Math.max.apply(Math, arr);
                } else if (maximin == "min") {
                    return Math.min.apply(Math, arr);
                }
            } else {
                return 0
            }
        },

		init() {
            if(!this.symbolc) {
                return
            }
			this.$nextTick(function(){
	            var canvas = document.getElementById(this.symbolc);
	            var ctx = canvas.getContext("2d");
	            var MyNewChart = new Chart(ctx, {
	                type: 'line',
	                data: this.dataOp(this.klineData),
	                options: this.makeOp(this.klineData)
	            });
	        })
		}
    },
	watch: {
		klineData(val) {
			this.init()
		},
        themeType:{
		    handler(val){
                this.init()
            },
            immediate: true
        }
	}
}
</script>

