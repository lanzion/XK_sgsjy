<template>
	<div class="region_select">
		<el-cascader
			:options="datas"
			placeholder="请选择区域"
			:change-on-select="true"
            :disabled="disabled"
			v-model="checkedItems"
			@change="changeRegion"
			style="width: 100%;"
			:props="{value:'code', label: 'name', children: 'children'}">
		</el-cascader>
	</div>
</template>

<script>
import { requestRegion } from '@/service/common.js'
	export default {
		name:'region_select',
		data(){
			return {
				datas: [],
				checkedItems: [],
                checkedItemsFull: [null, null, null]
			}
		},
		props: {
			'defaultItems': {
				type: Array,
				default() {
					return []
				}
			},
			'rangeItems': {
				type: String,
				default() {
					return 'all'
				}
			},
            'disabled': {
                type: Boolean,
                default() {
                    return false
                }
            }
		},
		mounted() {
			this.getData()
		},
        watch: {
            defaultItems: {
                handler: function (val, oldVal) {
                    if (val.length) {
                        this.$set(this.$data, 'checkedItems', val)
       //              	getDefaultData(val).then(list => {
       //              		list.unshift(this.datas)
       //              		for (var i = val.length - 1; i > 0; i--) {
       //              			let _index = list[i-1].findIndex( (data) => { return data.code.toString() == val[i-1].toString() })
       //              			if (_index >=0 && i > 0) {
       //              				list[i-1][_index].children = list[i]
       //              			}
       //              		};
       //              		this.datas = list[0]
       //                  	this.$set(this.$data, 'checkedItems', val)
       //                      this.changeRegion(val)
       //              	})
       //              	async function getDefaultData(val) {
       //              		let arr = []
       //              		for (let i = 0; i < val.length; i++) {
       //              			arr[i] = await requestRegion({code: val[i]}).then( repsonse => {
							// 		let _data = repsonse.data.entity;
							// 		return _data
							// 	})
       //              		};
							// return arr.filter(x => x);
       //              	}
                    }
                },
                deep: true
            },
            checkedItems: {
                handler: function (val) {
                    this.changeRegion(val)
                },
                deep: true
            }
        },
		methods: {
			getData(params, datas) {
				params = params == undefined ? {code: this.rangeItems} : params;
				return requestRegion(params).then( repsonse => {
					let _data = repsonse.data.entity;
					let _checkedItem = this.checkedItemsFull.filter(x => x)
					if (_checkedItem.length < 2 && _data.length) {
						_data.forEach(x => {
							if (x.children == undefined) {
								x.children = [];
							}
						});
					}
					if (arguments.length < 2) {
						this.datas = _data;
					} else if (_checkedItem.length < 3) {
						datas.children = _data;
					}
                    return _data
				});
			},
			async changeRegion(val) {
				let datas = this.datas;

                this.checkedItemsFull = [null, null, null];
				for (let i = 0; i < val.length; i++) {
					let itemIndex = datas.findIndex( (data) => { return data.code.toString() == val[i].toString() })
                    this.$set(this.$data.checkedItemsFull, i, val[i])

					if (i < 2 && (datas[itemIndex].children === undefined || (datas[itemIndex].children && !datas[itemIndex].children.length))) {
						datas = await this.getData({ code: val[i]}, datas[itemIndex])
					} else {
						datas = datas[itemIndex].children
					}
				}
				this.$emit('region', this.checkedItemsFull);
			}
		}
	}
</script>
