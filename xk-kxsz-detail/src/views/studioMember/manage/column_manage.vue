<template>
    <div id="column_manage" class="bgw">
        <h5 class="head-txt">栏目管理</h5>
        <section class="table-box">
            <el-table :data="columnData" border style="width: 100%">
                <el-table-column prop="name" label="栏目名称"></el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <!-- <a class="operate-btn" href="javaScript:;" title="编辑" @click="showDialog(scope.row.id,scope.row.name,scope.$index)"><i class="icon-btn-edit2"></i></a> -->
                        <a class="operate-btn" href="javaScript:;" title="上移" v-if="scope.$index != 0" @click.prevent="moveColumn(scope.$index,scope.$index-1)"><i class="icon-btn-up"></i></a>
                        <a class="operate-btn" href="javaScript:;" title="下移" v-if="scope.$index != listLen" @click.prevent="moveColumn(scope.$index,scope.$index+1)"><i class="icon-btn-down"></i></a>
                    </template>
                </el-table-column>
              </el-table>
        </section>
        <el-dialog :visible.sync="visible" class="modify-column">
            <header class="head">栏目修改</header>
            <section class="input-box">
                <el-input v-model="modifyName" placeholder="请输入栏目名称"></el-input>
            </section>
            <div class="btn-box">
                <button class="close-btn" @click="visible = false">取消</button>
                <button class="confirm-btn" @click="modifyColumn">确定</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { requestColumnList, modifyColumn, moveupColumn, movedownColumn } from '@/service/studio.js'

    export default {
        name: 'column_manage',
        data() {
            return {
                visible: false,
                columnData: [],
                listLen: 0,
                modifyName: null,        // 要修改的栏目名称
                modifyId: null,          // 要修改的栏目id
                currIndex: null          // 当前修改项的索引
            }
        },
        mounted() {
            this.getColumnList()
        },
        methods: {
            // 获取栏目数据
            getColumnList() {
                requestColumnList({ studioId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.columnData = res.data.entity
                        this.listLen = this.columnData.length - 1
                    }
                })
            },
            // 交换数组元素的位置
            swapArr(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0]
            },
            // 栏目移动
            moveColumn(index1, index2) {
                const params = {
                    id: this.columnData[index1].id,
                    newId: this.columnData[index2].id
                }
                const isUp = index1 > index2
                const handler = isUp ? moveupColumn : movedownColumn
                const msg = isUp ? '上移成功' : '下移成功'
                handler(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', msg)
                        this.swapArr(this.columnData, index1, index2)
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            },
            // 修改栏目
            showDialog(id, name, index) {
                this.modifyName = name
                this.modifyId = id
                this.currIndex = index
                this.visible = true
            },
            modifyColumn() {
                const params = {
                    id: this.modifyId,
                    name: this.modifyName,
                    studioId: this.$route.query.id
                }
                modifyColumn(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '修改成功')
                        this.$set(this.$data.columnData[this.currIndex], 'name', this.modifyName)
                        this.visible = false
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #column_manage{
        min-height: 445px;
        .head-txt{
            padding: 13px 15px;
            font-size: 16px;
            border-bottom: 1px solid #c9c9c9;
        }
        .table-box{
            padding: 15px;
            .operate-btn{
                margin-right: 10px;
                i{
                    font-size: 18px;
                }
            }
        }
    }
    .modify-column{
        .head{
            font-size: 18px;
            margin-bottom: 20px;
        }
        .input-box{
            margin: 20px;
        }
        .btn-box{
            margin-top: 20px;
            text-align: right;
            button{
                font-size: 14px;
                border-radius: 3px;
            }
            .confirm-btn{
                border: none;
                padding: 6px 15px;
                color: #fff;
                background-color: #ff7200;
                &:hover{
                    opacity: 0.75;
                }
            }
            .close-btn{
                border:1px solid #ff7200;
                color: #ff7200;
                padding: 5px 14px;
                margin-right: 10px;
                &:hover{
                    background-color: #ff7200;
                    color: #fff;
                }
            }
        }
    }
</style>

<style lang="scss">
    #column_manage{
        .table-box{
            .el-table{
                .cell{
                    text-align: center;
                    white-space: nowrap;
                }
            }
        }
    }
    .modify-column{
        .el-dialog{
            width: 450px;
        }
    }
</style>