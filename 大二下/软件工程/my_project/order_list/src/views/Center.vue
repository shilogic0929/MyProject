<template>
  <Menu>
    <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单中心</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-form :inline="true" ref="add_data" :model="search_data">
            <el-form-item label="房号：">
                <el-input prefix-icon="el-icon-search" v-model="search_data.search_house_id" clearable></el-input>
            </el-form-item>
            <el-form-item label="状态：">
                <el-select v-model.trim="search_data.search_status">
                    <el-option v-for="(formteam,index) in format_status_list" :key="index" :label="formteam" :value="formteam"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="btnSearch">
                <el-button type="primary " size="small" icon="el-icon-search" @click="handleSearch()">筛选</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="table-area">
        <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column 
        type="index"
        label="#">
        </el-table-column>
        <el-table-column
            prop="rent_id"
            label="订单号"
            width="130">
        </el-table-column>
        <el-table-column
            prop="house_id"
            label="房间号"
            width="130">
        </el-table-column>
        <el-table-column
            prop="rent_type"
            label="类型"
            width="130">
        </el-table-column>
        <el-table-column
            prop="rent_state"
            label="状态"
            width="130">
        </el-table-column>
        <el-table-column
            prop="start_date"
            label="起始日期"
            width="130">
        </el-table-column>
        <el-table-column
            prop="lease"
            label="租期/天"
            width="130">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <!-- <el-button type="primary" 
                icon="el-icon-check" size="small" 
                @click="addDialogVisible = true">缴费</el-button> -->
                <el-button type="primary" 
                icon="el-icon-edit" size="small"
                @click="addDialogVisible = true">续约</el-button>
            </template>
        </el-table-column>
        </el-table>
        <!--分页区-->
        <el-pagination
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
            :current-page.sync='paginations.page_index'
            @current-change='handleCurrentChange'
            @size-change='handleSizeChange'>
        </el-pagination>
    </el-card>
    <!--添加续约对话框-->
    <el-dialog title="添加续约" :visible.sync="addDialogVisible"
    width="60%"
    :before-close="handleClose">
    <el-form :model="renewalForm" :rules="renewalFormRules" ref="renewalFormRef" 
    label-width="70px">
        <el-form-item label="订单号" prop="rent_id">
            <el-col :span="15">
                <el-input v-model="renewalForm.rent_id"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="新期限" required>
        <el-col :span="17">
            <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="renewalForm.date" style="width: 70%;"></el-date-picker>
            </el-form-item>
        </el-col>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确定</el-button>
    </span>
    </el-dialog>
  </Menu>
</template>

<script>
import Menu from '../components/Menu'
import axios from 'axios'
export default {
    name: "Center",
    components: {
        Menu,
    },
    data() {
        return {
            orderList: [],
            count: 0,

            tableData: [{  // 临时数据, 仅用于测试
                rent_id: '4131',
                house_id: '10001',
                rent_type: '短租',
                rent_state: '已缴费',
                start_date: '2022-05-20',
                lease: 1
            }, {
                rent_id: '2192',
                house_id: '10002',
                rent_type: '短租',
                rent_state: '未缴费',
                start_date: '2022-05-21',
                lease: 1
            }, {
                rent_id: '7574',
                house_id: '10003',
                rent_type: '短租',
                rent_state: '已缴费',
                start_date: '2022-05-20',
                lease: 1
            }, {
                rent_id: '6356',
                house_id: '10004',
                rent_type: '长租',
                rent_state: '已缴费',
                start_date: '2022-05-20',
                lease: 120
            }, {
                rent_id: '1376',
                house_id: '10005',
                rent_type: '长租',
                rent_state: '未缴费',
                start_date: '2022-05-21',
                lease: 60
            }, {
                rent_id: '4356',
                house_id: '10006',
                rent_type: '长租',
                rent_state: '已缴费',
                start_date: '2022-05-20',
                lease: 120
            },],
            selected_table_data: [], 
            all_table_data: [],
            //筛选条件数据
            search_data:{
                search_house_id:'',
                search_status:'全部'
            },
            format_status_list:['全部','已缴费','未缴费'],
            // 分页属性
            paginations: {
                page_index: 1, // 当前位于哪页
                total: 0, // 总数
                page_size: 0, // 1页显示多少条
                page_sizes: [1, 2, 3, 4, 6], //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
            },
            //对话框属性，隐藏对话框
            addDialogVisible: false,
            // 添加续约信息的表单数据
            renewalForm: {
                rent_id: '',
                date: '',
            },
            // 添加表单的验证规则对象
            renewalFormRules: {
                rent_id: [
                    {required: true, message: '请输入订单号', trigger: 'blur'},
                ],
            },
        }
    },
    created() { //在创建vue对象时，当html渲染之前就触发；但是注意，只会触发一次
        this.getOrderList(); 
        this.paginations.total = this.tableData.length;
        this.paginations.page_size = this.tableData.length;
    },
    methods: {
        handleCurrentChange(page) {
            if(this.all_table_data.length == 0) {
                this.all_table_data = this.tableData;
            }
            // 当前页
            let sortnum = this.paginations.page_size * (page - 1);
            let table = this.all_table_data.filter((item, index) => {
                return index >= sortnum;
            });
            // 设置默认分页数据
            this.tableData = table.filter((item, index) => {
                return index < this.paginations.page_size;
            });
        },
        handleSizeChange(page_size) {
            if(this.all_table_data.length == 0) {
                this.all_table_data = this.tableData;
            }
            // 切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            this.tableData = this.all_table_data.filter((item, index) => {
                return index < page_size;
            });
         },
        setPaginations() {
            if(this.all_table_data.length == 0) {
                this.all_table_data = this.tableData;
            }
            // 总页数
            this.paginations.total = this.all_table_data.length;
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            // 设置默认分页数据
            this.tableData = this.all_table_data.filter((item, index) => {
                return index < this.paginations.page_size;
            });
        },
        // 获取订单信息
        async getOrderList() {
            const {data : res} = await axios.get('orders', {
                params: this.queryInfo,
            });
            //console.log(res);
            if(res.meta.status !== 200) {
                return this.$message.error('获取用户订单失败')
            }
            this.orderList = res.data.orderList;
            this.count = res.data.count;
        },
        //筛选
        handleSearch() {
            if(this.all_table_data.length == 0) {
                this.all_table_data = this.tableData;
            }
            let pojo;
            this.selected_table_data = [];
            pojo = {
                house_id: this.search_data.search_house_id,  
                status: this.search_data.search_status             
            }
            //console.log(pojo.house_id + ' ' + pojo.status)
            for(let item of this.all_table_data) {
                if((pojo.house_id === '' || item.house_id === pojo.house_id) && (pojo.status === "全部" || item.rent_state === pojo.status)) {
                    this.selected_table_data.push(item);
                }
            }
            this.tableData = this.selected_table_data;
            console.log(this.tableData)
        },
    },
}
</script>

<style scoped>
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}

.table-area {
    margin-top: 7px;
    box-shadow: 0 1px 1px rgb(0, 0, 0, 0.15) !important;
}

.el-pagination {
    margin-top: 15px;
}
</style>