<template>
	<section id="works_review" class="">
		<el-table
      	  :data="indexList"
      	  border
      	  style="width: 100%">
      		<el-table-column prop="name" label="评审要素" width="258">
      		</el-table-column>
      		<el-table-column prop="description" label="评审标准">
      		</el-table-column>
      		<el-table-column prop="score" label="分值">
      		</el-table-column>
      		<el-table-column prop="score" label="评分" width="258">
      			<template slot-scope="scope">
          			<el-input-number v-model="scope.row.scoreInput" :min="1" :max="scope.row.score" size="small"/>
        		</template>
      		</el-table-column>
    	</el-table>
    	<dl class="total-score clearfix">
    		<dt class="total-tit fl">总分</dt>
    		<dd class="total-num fr">
    			<el-input-number v-model="score" :min="0" :max="100" disabled size="small"/>
    		</dd>
    	</dl>
    	<dl class="comment clearfix">
    		<dt class="comment-tit fl">评语</dt>
    		<dd class="comment-content fr">
    			<el-input
  					type="textarea"
                    autosize
                    :maxlength="500"
  					placeholder="请输入评语"
  					v-model="remark">
				</el-input>
    		</dd>
    	</dl>
        <div class="btn-box">
            <button class="submit-btn btn" @click="reviewWorks">提交</button>
            <button class="cancel-btn btn" @click="cancelOperate">取消</button>
        </div>
	</section>
</template>

<script>
    import { worksReview } from '@/service/works.js'

    export default {
        name: 'works_review',
        data() {
            return {
                score: 0,
                remark: ''
            }
        },
        props: {
            indexList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        watch: {
            indexList: {
                handler: function (val) {
                    this.score = 0
                    for (let i = 0; i < val.length; i++) {
                        this.score = this.score + val[i].scoreInput
                    }
                },
                deep: true
            }
        },
        methods: {
            // 取消操作
            cancelOperate() {
                this.$router.go(-1)
                for (let i = 0; i < this.indexList.length; i++) {
                    this.indexList[i].scoreInput = 0
                }
            },
            doReview() {
                const params = {
                    id: this.$route.query.reviewId,
                    score: this.score,
                    remark: this.remark,
                    evaluationItemList: []
                }
                for (let i = 0; i < this.indexList.length; i++) {
                    params.evaluationItemList.push({ evaluationId: this.$route.query.reviewId, evaluationIndexId: this.indexList[i].id, score: this.indexList[i].scoreInput })
                }
                worksReview(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '评审成功')
                        this.$router.push({ path: '/contest/review/pending', query: { id: this.$route.query.id } })
                    } else {
                        this.showMessage('success', res.data.msg)
                    }
                })
            },
            // 作品评审
            reviewWorks() {
                if (this.score === 0) {
                    this.showMessage('info', '您好像还没评分哦')
                } else {
                    this.doReview()
                }
                // else if (this.remark === '') {
                //     this.showMessage('info', '请输入评语')
                // }
            }
        }
    }
</script>

<style lang="scss">
	#works_review {
		.el-input-number {
			display: block;
			width: 100%;
		}
		.el-table {
			.cell {
				text-align: center;
			}
		}
		.comment-content {
			.el-textarea__inner {
				min-height: 43px!important;
			}
			.el-textarea {
				vertical-align: middle;
			}
		}
	}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
	#works_review {
		padding: 20px 15px;
		.total-score {
			border: 1px solid #dfe6ec;
			border-top: none;
			height: 40px;
			line-height: 40px;
			text-align: center;
			.total-tit {
				width: 686px;
				font-size: 16px;
				font-weight: 600;
				color: #000;
			}
			.total-num {
				box-sizing: border-box;
				width: 259px;
				height: 100%;
				padding: 5px 18px;
				border-left: 1px solid #dfe6ec;
			}
		}
		.comment {
			border: 1px solid #dfe6ec;
			border-top: none;
			// height: 64px;
			text-align: center;
			.comment-tit {
                line-height: 50px;
				box-sizing: border-box;
				width: 260px;
				height: 100%;
				font-size: 16px;
				font-weight: 600;
                margin-top: 5px;
				color: #000;
			}
			.comment-content {
				width: 686px;
				height: 100%;
				box-sizing: border-box;
				padding: 10px 18px;
                border-left: 1px solid #dfe6ec;
			}
		}
        .btn-box {
            margin-top: 20px;
            .btn {
                border: none;
                box-sizing: border-box;
                width: 60px;
                height: 32px;
                line-height: 31px;
                font-size: 14px;
                vertical-align: middle;
                border-radius: 3px;
            }
            .submit-btn {
                background-color: $theme-color;
                color: #fff;
                margin-right: 10px;
                &:hover {
                    opacity: 0.75
                }
            }
            .cancel-btn {
                border: 1px solid $theme-color;
                color: $theme-color;
                &:hover {
                    background-color: $theme-color;
                    color: #fff;
                }
            }
        }
	}
</style>
