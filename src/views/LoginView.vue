<template>
    <div class="w-full h-full flex justify-center items-center">
        <div class="flex flex-col items-center w-[800px]">
            <label class="flex justify-between items-center w-full">
                아이디
                <input type="text" />
            </label>
            <label class="flex justify-between items-center w-full">
                비밀번호
                <input type="text" />
            </label>
            <label class="flex justify-between items-center w-full">
                이름
                <input type="text" />
            </label>
            <label class="flex justify-between items-center w-full">
                이미지 선택
                <input type="file" accept=".png,.jpg,.jpeg" @change="changeFile" />
            </label>

            <button @click="register">회원가입</button>

            <img :src="tmp" alt="" />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const tmp = ref('');

async function register() {
    // const {
    //     data: {
    //         data: { profileImage },
    //     },
    // } = await axios.post('/api/member/login', {
    //     loginId: 'asde',
    //     password: 'asde',
    // });

    // tmp.value = `data:image/png;base64,${profileImage}`;
    axios
        .post('/api/member/login', {
            loginId: 'asde',
            password: 'asde',
        })
        .then((res) => {
            tmp.value = `http://waktfolio.kro.kr:28081${res.data.data.profileImagePath}`;
        });
}

function changeFile($e) {
    console.log($e.target.files);
}
</script>

<style lang="scss" scoped></style>
