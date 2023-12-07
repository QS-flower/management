<template>
    <div class="main">
        <div class="form">
            <div class="title">手动上传</div>
            <el-form label-position="right" label-width="100px" :model="grade">
                <el-form-item label="学号">
                    <el-input v-model="grade.Stunum" />
                </el-form-item>
                <el-form-item label="考试">
                    <el-input v-model="grade.exam" />
                </el-form-item>
                <el-form-item label="学科">
                    <el-input v-model="grade.subject" />
                </el-form-item>
                <el-form-item label="分数">
                    <el-input v-model="grade.score" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                    <el-button @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="file">
            <div class="title">文件上传</div>
            <el-upload class="upload-demo" drag :before-upload="beforeUpload" action="http://127.0.0.1:3000/api/uploadfile" multiple :on-success="on_success" :headers="customHeaders">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    将文件拖动到这里或<em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        请上传 .xlsx 或 .xls 文件，并请注意文件的格式（从左到右）为：分数，考试名称，科目，学生学号，否则会导致上传出错！
                    </div>
                    <div class="download"><a href="http://127.0.0.1:3000/api/download">点击下载标准模板</a></div>
                </template>
            </el-upload>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { post } from '../axios_setting/index'
import {useStore} from 'vuex'
const store=useStore();
const grade = ref({
    Stunum: '',
    exam: '',
    score: '',
    subject:'',
})
const handleReset = () => {
    grade.value.Stunum = '';
    grade.value.exam = '';
    grade.value.score = '';
    grade.value.subject='';
}
const customHeaders = {
  Authorization: store.getters.getAut, // 设置自定义的 Authorization 头信息
};
const handleSubmit = () => {
    ElMessageBox.confirm(
        '确定提交成绩吗',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        const data = { Stu: grade.value.Stunum, exam: grade.value.exam, score: grade.value.score ,subject:grade.value.subject}
        post('/api/upload', data).then((response) => {
            ElMessage({
                message: '提交成功',
                type: 'success',
            })
            handleReset();
        }).catch((err) => {
            console.log(err)
            ElMessage({
                message: '提交失败',
                type: 'warning',
            })
        })
    }).catch(() => {
    })
}
const on_success=()=>{
    ElMessage.success('上传成功')
}
const beforeUpload = (file) => {
  // 检查文件类型
  if (!checkFileType(file)) {
    ElMessage.error('请上传 .xlsx 或 .xls 文件');
    return false; // 阻止上传
  }
  // 文件类型检查通过，可以继续上传
  return true;
};

const checkFileType = (file) => {
    // 根据文件类型进行检查
    const allowedTypes = ['.xlsx', '.xls'];
    const fileType = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    return allowedTypes.includes(fileType);
};


</script>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.form {
    min-width: 90%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
}

.file {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccdada;
    min-width: 90%;
    margin-top: 20px;
}

.el-form {
    min-width: 500px;
}

.title {
    font-size: larger;
    margin-bottom: 10px;
}

.download {
    font-size: small;
}
</style>