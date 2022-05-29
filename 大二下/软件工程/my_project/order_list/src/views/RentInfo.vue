<template>
    <Menu>
        <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href=".#/center">订单中心</a></el-breadcrumb-item>
        <el-breadcrumb-item>订单信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>

        </el-card>
    </Menu>
</template>

<script>
import Menu from '../components/Menu'
export default {
    name: "RentInfo",
    components: {
        Menu,
    },
}
</script>

<style>
.el-card {
    margin-top: 15px;
    box-shadow: 0 1px 1px rgb(0, 0, 0, 0.15) !important;
}
</style>