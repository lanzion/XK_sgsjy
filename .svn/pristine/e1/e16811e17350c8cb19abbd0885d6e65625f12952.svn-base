<template>
    <figure>
        <v-echarts :options="charts" :theme="theme" :auto-resize="autoResize"></v-echarts>
    </figure>
</template>

<script>

    import lightblue from '@/asset/echarts/lightBlue.project.json'
    import chart from 'vue-echarts/components/ECharts.vue'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/toolbox'
    import 'echarts/lib/component/legend'
    chart.registerTheme('lightblue', lightblue.theme)

    export default {
        name: 'pieDoughnutChart', // 环状图
        components: {
            'v-echarts': chart
        },
        data () {
            return {
                charts: {
                    title: [{
                        text: '分类'      // props - title
                    }, {
                        text: 0,        // props - datas: center
                        left: '50%',
                        top: '54%',
                        textAlign: 'center',
                        textBaseline: 'bottom',
                        textStyle: {
                            color: '#333',
                            fontWeight: 'normal',
                            fontSize: 28
                        }
                    }, {
                        text: '单位(个)',  // props - centerTitle
                        left: '50%',
                        top: '56%',
                        textAlign: 'center',
                        textBaseline: 'top',
                        textStyle: {
                            color: '#999',
                            fontWeight: 'normal',
                            fontSize: 14
                        }
                    }],
                    grid: {
                        left: 14,
                        right: 14,
                        bottom: 14,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        right: 'right',
                        top: '26',
                        data: []        // props - datas: legend
                    },
                    series: [
                        {
                            name: '分类',     // props - title
                            type: 'pie',
                            radius: ['50%', '60%'],
                            center: ['50%', '55%'],
                            data: []          // props - datas: data
                        }
                    ]
                }
            }
        },
        props: {
            title: String,
            centerTitle: String,
            datas: {
                type: Object,
                default () {
                    return null
                }
            },
            theme: {
                type: String,
                default () {
                    return 'lightblue'
                }
            },
            autoResize: {
                type: Boolean,
                default () {
                    return true
                }
            }
        },
        watch: {
            datas: {
                handler: function (val, oldVal) {
                    if (val) {
                        this.charts.legend.data = val.legend
                        this.charts.series[0].data = val.data
                        this.charts.title[1].text = val.center
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.charts.title[0].text = this.title
            this.charts.title[2].text = this.centerTitle
            this.charts.series[0].name = this.title
        }
    }
</script>
