<template>
    <figure>
        <v-echarts :options="charts" :theme="theme" :auto-resize="autoResize"></v-echarts>
    </figure>
</template>

<script>

    import lightblue from '@/assets/echarts/lightBlue.project.json'
    import chart from 'vue-echarts'
    // import chart from 'vue-echarts/components/ECharts.vue'
    // import 'echarts/lib/chart/bar'
    // import 'echarts/lib/component/title'
    // import 'echarts/lib/component/tooltip'
    // import 'echarts/lib/component/toolbox'

    chart.registerTheme('lightblue', lightblue.theme)

    export default {
        name: 'barChart', // 柱状图
        components: {
            'v-echarts': chart,
        },
        data() {
            return {
                charts: {
                    title: {
                        text: '分布',     // props - title
                        subtext: ''       // props - datas: subtext
                    },
                    legend: {
                        top: '26',
                        left: 'right',
                        data: []            // props - datas: legend
                    },
                    tooltip: {},
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: { readOnly: false },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: 14,
                        right: 14,
                        bottom: 14,
                        containLabel: true
                    },
                    xAxis: {
                        data: []        // props - datas: xAxis
                    },
                    yAxis: {
                        minInterval: 1
                    },
                    series: [{
                        name: '分布', // props - title
                        type: 'bar',
                        barMaxWidth: 180,
                        data: []      // props - datas: data
                    }]
                }
            }
        },
        props: {
            title: String,  // 标题
            datas: {    // 数据
                type: Object,
                default() {
                    return null
                }
            },
            theme: {    // 主题
                type: String,
                default() {
                    return 'lightblue'
                }
            },
            autoResize: {
                type: Boolean,
                default() {
                    return true
                }
            },
            isSimple: { // 是否多维数组
                type: Boolean,
                default() {
                    return true
                }
            }
        },
        watch: {
            datas: {
                handler: function (val) {
                    if (val) {
                        this.charts.title.subtext = val.subtext || ''
                        this.charts.xAxis.data = val.xAxis
                        const _series = []
                        val.data.forEach((x, i) => {
                            if (this.isSimple) {
                                this.$set(this.charts.series[i], 'data', x)
                            } else {
                                const seriesTmpl = Object.assign({}, this.charts.series[0], { name: val.legend[i], data: x })
                                _series.push(seriesTmpl)
                            }
                        })
                        if (!this.isSimple) {
                            this.charts.legend.data = val.legend
                            this.charts.series = _series
                        }
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.charts.title.text = this.title
            this.charts.series[0].name = this.title
        }
    }
</script>
