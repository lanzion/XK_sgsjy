<template>
    <figure>
        <v-echarts :options="charts" :theme="theme" :auto-resize="autoResize"></v-echarts>
    </figure>
</template>

<script>
    import lightblue from '@/assets/echarts/lightBlue.project.json'
    import chart from 'vue-echarts/components/ECharts.vue'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/toolbox'
    chart.registerTheme('lightblue', lightblue.theme)

    export default {
        name: 'pieSimpleChart', // 饼状图
        components: {
            'v-echarts': chart
        },
        data () {
            return {
                charts: {
                    title: {
                        text: '分布',     // props - title
                        subtext: ''       // props - datas: subtext
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
                            name: '分布',     // props - title
                            type: 'pie',
                            selectedMode: 'single',
                            radius: '60%',
                            center: ['50%', '55%'],
                            data:[]           // props - datas: data
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
                        this.charts.legend.data = val.legend
                        this.charts.series[0].data = val.data
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
