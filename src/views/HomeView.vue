<template>
    <!-- <div class="pt-4 max-w-[1100px] w-full mx-auto">
        <div
            class="rounded-[24px] bg-[url(/assets/nakagin.JPG)] bg-center h-[780px] relative overflow-hidden gradient flex flex-col justify-end tracking-[-0.057em]"
        >
            <div class="p-5 relative z-10 flex justify-between">
                <div class="flex flex-col leading-[1.5] text-[white]">
                    <h1 class="text-[28px]">TitleTitleTitleTitle</h1>
                    <span class="text-[18px]">User</span>
                </div>
                <div class="button-wrap big">
                    <div>
                        <img src="/images/view.svg" alt="" />
                        <span class="count">1005</span>
                    </div>
                    <div>
                        <img src="/images/like.svg" alt="" />
                        <span class="count">109</span>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
    <div class="text-3xl">hello world!</div>
    <button class="border p-1" @click="savePicture">저장</button>
    <button class="border p-1" @click="temp2">불러오기</button>
    <button class="border p-1" @click="flag = !flag">show / hide</button>
    <input type="file" @change="tmp" />
    <View3D
        v-if="true"
        id="tmp"
        ref="viewer"
        :src="blobSrc"
        class="w-full h-[700px]"
        poster="/assets/nakagin.JPG"
        skybox="/assets/sky-3.hdr"
        :exposure="1.2"
        :autoplay="{ delay: 2000 }"
    />
</template>

<script setup>
import { ref } from 'vue';

const flag = ref(false);
const viewer = ref();

const blobSrc = ref('');

function tmp(event) {
    flag.value = false;
    let reader = new FileReader();
    reader.onload = (event) => {
        // flag.value = true;
        let glbData = event.target.result;
        // blobSrc.value = URL.createObjectURL(new Blob([glbData], { type: 'model/gltf-binary' }));
        const blob = new Blob([glbData], { type: 'model/gltf-binary' });
        viewer.value.view3D.load(URL.createObjectURL(blob));
    };
    reader.readAsArrayBuffer(event.target.files[0]);
}

import AWS from 'aws-sdk';

function temp2() {
    const s3 = new AWS.S3({
        accessKeyId: 'accessKey1',
        secretAccessKey: 'verySecretKey1',
        endpoint: 'localhost:5173',
        sslEnabled: false,
        s3ForcePathStyle: true,
        signatureVersion: 'v2',
    });

    s3.getObject(
        {
            Bucket: 'waktfolio',
            Key: '42f3b496-b481-450b-8ad6-cd77c946ec11profileImage/profileImage.glb',
        },
        (err, data) => {
            console.log(err, data);
            const blob = new Blob([data.Body], { type: data.ContentType });
            blobSrc.value = URL.createObjectURL(blob);
            viewer.value.view3D.load(URL.createObjectURL(blob));
        },
    );
}

function savePicture() {
    viewer.value.screenshot();
    // const canvas = document.querySelector('.view3d-canvas');
    // const dataURL = canvas.toDataURL('image/png');

    // const link = document.createElement('a');
    // link.href = dataURL;
    // link.download = 'canvas_image.png'; // 파일 이름 설정
    // link.click();
}
</script>

<style lang="scss" scoped>
.gradient {
    @apply after:bg-gradient-to-t after:from-[#00000059] after:to-[#00000000] after:content-[''] after:w-full after:h-[140px] after:absolute after:bottom-0;
}

.button-wrap {
    &.big {
        @apply flex gap-x-4 text-[white];

        > div {
            @apply flex flex-col items-center;
        }

        img {
            @apply w-[30px] h-[30px];
        }

        .count {
            @apply text-[10px] font-semibold;
        }
    }
}
</style>
