<template>
    <figure>
        <v-echarts :options="charts" :theme="theme" :auto-resize="autoResize"></v-echarts>
    </figure>
</template>

<script>
    import lightblue from '@/asset/echarts/lightBlue.project.json'
    import chart from 'vue-echarts/components/ECharts.vue'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/toolbox'
    chart.registerTheme('lightblue', lightblue.theme)

    export default {
        name: 'lineChart', // 饼状图
        components: {
            'v-echarts': chart
        },
        data () {
            return {
                charts: {
                    title: {
                        text: '近一周活动发布'     // prop - title
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '14',
                        right: '14',
                        bottom: '14',
                        containLabel: true
                    },
                    xAxis: {
                        type : 'category',
                        boundaryGap : false,
                        data : []
                    },
                    yAxis: {
                        minInterval: 1
                    },
                    series: [
                        {
                            name: '',
                            type: 'line',
                            smooth: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data:[]
                        }
                    ]
                }
            }
        },
        props: {
            title: String,
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
                        this.charts.title.subtext = val.subtext
                        this.charts.xAxis.data = val.xAxis
                        val.data.forEach((x, i) => {
                            this.charts.series[i].data = x
                        })
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.charts.title.text = this.title
        }
    }
</script>
