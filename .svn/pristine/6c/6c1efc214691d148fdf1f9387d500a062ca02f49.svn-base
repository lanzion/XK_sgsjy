<template>
    <figure>
        <v-echarts :options="charts" :theme="theme" :auto-resize="autoResize" @legendselectchanged="legendChange"></v-echarts>
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
    // import 'echarts/lib/component/grid'
    // import 'echarts/lib/component/legendScroll'

    chart.registerTheme('lightblue', lightblue.theme)

    export default {
        name: 'barTabChart', // 柱状图(含切换)
        components: {
            'v-echarts': chart,
        },
        data() {
            return {
                subText: [],
                xAxis: [],
                charts: {
                    title: {
                        text: '分布',     // props - title
                        subtext: ''       // props - datas: subtext
                    },
                    legend: {
                        top: '26',
                        left: 'right',
                        selectedMode: 'single',
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
                },
                tabs: {}
            }
        },
        props: {
            title: String,
            datas: {
                type: Array,
                default() {
                    return []
                }
            },
            legend: {
                type: Array,
                default() {
                    return []
                }
            },
            theme: {
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
            }
        },
        watch: {
            datas: {
                handler: function (val) {
                    if (val.length) {
                        val.forEach((x, i) => {
                            // this.charts.title.subtext = x.subtext
                            // this.charts.xAxis.data = x.xAxis
                            this.charts.series[i].data = x.data
                            this.subText[i] = x.subtext
                            this.xAxis[i] = x.xAxis
                        })
                        const _selected = {}
                        this.legend.filter((x, i) => {
                            if (i === 0) {
                                _selected[x] = true
                            }
                            _selected[x] = false
                        })
                        this.legendChange({ name: this.legend[0], selected: _selected })
                    }
                },
                deep: true
            }
        },
        mounted() {
            this.charts.title.text = this.title
            this.charts.series[0].name = this.title
            this.charts.legend.data = this.legend

            const seriesTmpl = Object.assign({}, this.charts.series[0])
            const _series = []
            this.legend.filter((x, i) => {
                const _seriesTmpl = Object.assign({}, seriesTmpl, { name: x })
                _series.push(_seriesTmpl)
                this.tabs[x] = i
            })
            this.charts.series = _series
        },
        methods: {
            legendChange(item) {
                this.$set(this.charts.title, 'subtext', this.subText[this.tabs[item.name]] || '')
                this.$set(this.charts.xAxis, 'data', this.xAxis[this.tabs[item.name]] || [])
                this.$set(this.charts.legend, 'selected', item.selected)
            }
        }
    }
</script>
