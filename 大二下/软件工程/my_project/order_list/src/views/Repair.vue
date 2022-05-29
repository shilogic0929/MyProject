<template>
  <Menu>
    <el-breadcrumb separator=">">
    <el-breadcrumb-item :to="{ path: '/login' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href=".#/center">订单中心</a></el-breadcrumb-item>
    <el-breadcrumb-item>故障上报</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row class="input-area">
            <el-col :span="10">
                <el-input placeholder="请输入房间号"
                v-model="input"
                clearable>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="text-area">
            <el-col :span="20">
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容..."
                v-model="textarea">
                </el-input>
            </el-col>
            <el-col :span='4'>
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    上传图片
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-col>
        </el-row>
        <el-button type="info" size="small">提交</el-button>
    </el-card>
  </Menu>
</template>

<script>
import Menu from '../components/Menu'

export default {
    name: "Repair",
    components: {
        Menu,
    },
    data() {
        return {
            input: '', // 房间号
            textarea: '', // 上报信息
            imageUrl: '', // 上传图片
        };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>

<style scoped>
.el-breadcrumb {
    margin-bottom: 15px;
    font-size: 12px;
}
.el-card {
    box-shadow: 0 1px 1px rgb(0, 0, 0, 0.15) !important;
}
.input-area {
    margin-bottom: 15px;
}
.text-area {
    margin-bottom: 15px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
    display: block;
  }
</style>