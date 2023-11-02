<template>
    <div class="welcome">
        <small>欢迎，{{ name }}同学</small>
    </div>
    <div class="right">
        <span class="email">
            <el-badge :value="num">
                <el-button @click="showdialog">
                    <el-icon :size="30" color="DodgerBlue">
                        <Message />
                    </el-icon>
                </el-button>
            </el-badge>
        </span>
        <span class="head_img">
            <el-avatar :size="45">{{ name }}</el-avatar>
        </span>
    </div>
    <el-dialog v-model="dialogVisible" title="">
        <el-table :data="message" :show-header="false" @row-click="handclick" class="abc">
            <el-table-column prop="msg" lable="msg" align="center" />
        </el-table>
    </el-dialog>
</template>

<script >
import { Message } from '@element-plus/icons-vue'
export default {
    data() {
        return {
            dialogVisible: false,
            name: '李哲',
            message: [
                { msg: "王老师处理了你的查分申请，点击查看详情" },
                { msg: "黎老师处理了你的查分申请，点击查看详情" }
            ],
        }
    },
    computed: {
        num() {
            return this.message.length;
        },
    },
    components: {
        Message,
    },
    methods: {
        showdialog() {
            this.dialogVisible = true;
        },
        handclick() {
            this.$router.push('/apply')
            this.dialogVisible = false;
        }
    }
}
</script>

<style scoped>
.email {
    margin-top: 15px;
    margin-right: 15px;
}

.el-button {
    border-style: none;
    padding: 0px;
}

.abc ::v-deep .el-table__body tr:hover>td {
    background-color: rgb(250, 217, 222) !important;
    cursor: pointer;
}
</style>