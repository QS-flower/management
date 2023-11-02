<!-- 正式版本1 -->

<template>
    <div class="container">
        <div class="main">
            <form class="form" @submit.prevent="handleSubmit">
                <h2>Login in</h2>
                <div class="form-control">
                    <label for="username">Username</label>
                    <input v-model="username" type="text" name="username" id="username" placeholder="enter name" />
                    <small class="username" v-show="errors.username"> {{ errors.username }} </small>
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" name="password" id="password" placeholder="enter password" />
                    <small class="password" v-show="errors.password"> {{ errors.password }} </small>
                </div>
                <div class="button">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import {get,post} from '../axios_setting/index'
export default {
    data() {
        return {
            username: '',
            password: '',
            errors: {
                username: '',
                password: '',
            }
        };
    },
    methods: {
        test1() {
            //console.log("test1")
            const reg1 = /^\d{6,15}$/;
            if (!this.username.length) {
                this.errors.username = 'empty!';
            } else if (!reg1.test(this.username)) {
                this.errors.username = '用户名是6-15位的纯数字学号';
            } else {
                this.errors.username = '';
            }
        },
        test2() {
            //console.log("test2");
            const reg2 = /^[0-9a-zA-Z]{6,20}$/;
            if (!this.password.length) {
                this.errors.password = 'empty!';
            } else if (!reg2.test(this.password)) {
                this.errors.password = '密码必须是6-20位';
            } else {
                this.errors.password = '';
            }
        },
        test() {
            this.test1();
            this.test2();
        },
        handleSubmit() {
            this.test();
            //console.log(this.password+this.username);
            if (!this.errors.password && !this.errors.username) {
                post('api/login', {
                    username: this.username,
                    password: this.password
                }).then(function (respose) {
                    alert("登录成功" + respose.data.message)
                    this.$router.push('/');
                }).catch(function (error) {
                    alert("登录失败" + error)
                })
            }
        }
    }
};
</script>
  
<style scoped>
.container {
    background: url("../assets/background_login.jpg"), no-repeat;
    background-position: center, center;
    background-attachment: fixed;
    background-size: cover;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;
}

* {
    box-sizing: border-box;
}

.main {
    background-color: rgba(177, 172, 172, 0.2);
    width: 400px;
}

h2 {
    text-align: center;
    margin: 0 0 20px;
    color: aliceblue;
    font-size: 30px;
}

.form {
    padding: 30px 40px;
}

.form-control {
    margin-bottom: 10px;
    padding-bottom: 20px;
    position: relative;
}

.form-control label {
    display: block;
    color: aliceblue;
    margin-bottom: 5px;
    font-size: 20px;
}

.form-control input {
    border: 2px solid #f0f0f0;
    display: block;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    width: 100%;
}

.form button {
    cursor: pointer;
    border: 2px solid #56758a;
    background-color: #3498db;
    color: aliceblue;
    display: block;
    width: 100%;
    margin-top: 20px;
    border-radius: 4px;
    padding: 10px;
    font-size: 16px;
}

small {
    position: absolute;
    color: red;
    bottom: 0;
    left: 0;
}
</style>
  