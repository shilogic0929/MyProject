<template>
    <el-container class="home-container">
        <!--头部区域-->
        <el-header>
            <ElCol :span="6" class="logo-container">
              <img src="../assets/houselogo.png" class="logo" alt="">
              <span class="title"> 订单中心</span>
            </ElCol>
            <router-link to="/login">
                <el-button type="info" round v-if="this.$store.state.isLogin">退出</el-button>
            </router-link>
        </el-header>
        <!--页面主体区域-->
        <el-container>
            <!--侧边栏-->
            <el-aside :width="isCollapse ? '67' : '200'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!--侧边栏菜单区-->
                <el-menu background-color="rgb(224, 224, 224)" text-color="rgba(23, 19, 46, 0.74)" active-text-color="#ffd04b"
                unique-opened :collapse="isCollapse" :collapse-transition="false">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-circle-plus"></i>
                            <span>选项</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">分组一</template> -->
                            <router-link to="/login/">
                                <el-menu-item index="1-1">
                                    <i class="el-icon-menu"></i>
                                    返回主页

                                </el-menu-item>
                            </router-link>
                            <router-link to="/center/">
                                <el-menu-item index="1-2">
                                    <i class="el-icon-user"></i>
                                    个人中心

                                </el-menu-item>
                            </router-link>
                            <router-link to="/repair/">
                                <el-menu-item index="1-3">
                                    <i class="el-icon-s-tools" :to="{ path: '/repair' }"></i>
                                    故障上报

                                </el-menu-item>
                            </router-link>
                        </el-menu-item-group>

                        <el-submenu index="1-4">
                            <template slot="title">
                            <i class="el-icon-plus"></i>
                                我要订房


                            </template>
                            <el-menu-item index="1-4-1">
                            <i class="el-icon-s-promotion"></i>
                                申请新订单
                            </el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--右侧内容主体-->
            <el-main>  
                <div>
                    <slot></slot>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
export default {
    name: "Menu", 
    data() {
        return {
            //是否折叠
            isCollapse: true
        }
    },
    methods: {
        //点击展开/折叠菜单栏
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
    },
}
</script>


<style scoped>
.home-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 10px;
}
.el-header {
    background: linear-gradient(#8f8f8f, rgb(109, 108, 108));
    box-shadow: 0 0 10px 10px rgb(91, 91, 90);
    display: flex;
    justify-content: space-between; /**左右贴边对齐 */
    padding-left: 5px;
    align-items: center;
    color: rgba(255, 255, 255, 0.74);
    font-weight: bold;
    font-size: 20px;
}

.el-button {
    background: linear-gradient(rgb(175, 175, 175), #c8c9c9);
    box-shadow: 0 0 1.5px 1.5px rgb(91, 92, 89);
    height: 20px;
    width: 50px;
    font-size: 7px;
    letter-spacing: 0.2em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(23, 19, 46, 0.74);
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}

.el-aside {
    background: linear-gradient(rgb(224, 224, 224), #eff3f3);
}
.el-main {
    background: linear-gradient(#f9f6f6, #e8f5f8);
}

.toggle-button {
    background: linear-gradient(rgb(224, 224, 224), rgb(224, 224, 224));
    font-size: 7px;
    line-height: 24px;
    color: rgb(184, 184, 184);
    font-weight: bolder;
    text-align: center;
    letter-spacing: 0.9em;
    cursor: pointer;
}

</style>