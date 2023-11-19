<template>
    <div class="welcome">
        <small>欢迎，{{ getName }}{{ getAut.length===10?'同学':'老师' }}</small>
    </div>
    <div class="right">
        <el-badge :value="num" :hidden="showbadge">
                <el-button @click="showdialog">
                    <el-icon :size="30" color="DodgerBlue">
                        <Message />
                    </el-icon>
                </el-button>
            </el-badge>
        <span class="head_img">
            <el-avatar :size="45">{{ getName }}</el-avatar>
        </span>
    </div>
    <el-dialog v-model="dialogVisible" title="">
        <el-table :data="getMsg" :show-header="false" @row-click="handclick" class="abc">
            <el-table-column prop="msg" label="msg" align="center" />
        </el-table>
    </el-dialog>
</template>

<script >
import { Message } from '@element-plus/icons-vue'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            dialogVisible: false,
            showbadge: false,
        }
    },
    computed: {
        ...mapGetters(['getName','getMsg','getAut']),
        num() {
            return this.getMsg.length;
        },
    },
    components: {
        Message,
    },
    methods: {
        showdialog() {
            this.dialogVisible = true;
            this.showbadge = true;
        },
        handclick() {
            this.$router.push('/student/apply')
            this.dialogVisible = false;
        }
    }
}
</script>

<style scoped>
.el-badge{
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
.right{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>