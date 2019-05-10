<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.user" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label>
                <el-button @click="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login } from "../api.js";
export default {
    data() {
        return {
            form: {
                user: "",
                password: ""
            }
        };
    },
    methods: {
        submit() {
            this.$http.post(login.login, this.form).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<style lang="less" scoped>
</style>
