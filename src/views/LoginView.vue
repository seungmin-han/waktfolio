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
            <button @click="temp2">임시버튼</button>

            <img :src="tmp" alt="" />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import AWS from 'aws-sdk';
import { ref } from 'vue';

const tmp = ref('');

async function register() {
    axios
        .post('/api/member/login', {
            loginId: 'asde',
            password: 'asde',
        })
        .then((res) => {
            // tmp.value = `${res.data.data.profileImagePath}`;
        });
}

function temp2() {
    const s3 = new AWS.S3({
        accessKeyId: 'accessKey1',
        secretAccessKey: 'verySecretKey1',
        endpoint: 'localhost:5173',
        sslEnabled: false,
        s3ForcePathStyle: true,
        signatureVersion: 'v2',
    });

    console.log(s3);

    s3.getObject(
        {
            Bucket: 'waktfolio',
            Key: '42f3b496-b481-450b-8ad6-cd77c946ec11profileImage/profileImage.jpg',
        },
        (err, data) => {
            console.log(err, data);
            const blob = new Blob([data.Body], { type: data.ContentType });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                tmp.value = reader.result;
            };
        },
    );
}

function changeFile($e) {
    console.log($e.target.files);
}
</script>

<style lang="scss" scoped></style>
