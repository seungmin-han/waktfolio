<template>
    <div class="flex flex-col pt-4 mt-4 gap-y-12 max-w-[1100px] w-full mx-auto">
        <!-- 배너 START -->
        <MainBanner />
        <!-- 배너 END -->
        <div class="px-5 w-full flex flex-col items-center gap-y-12">
            <div class="flex flex-col items-center gap-y-4 w-full" v-for="s in 3" :key="s">
                <div class="flex justify-between items-center w-full">
                    <span class="font-semibold text-[22px] text-[#383838]">최근 등록 순</span>
                    <div class="flex items-center gap-x-4">
                        <span>전체보기</span>
                        <div class="flex items-center">
                            <button
                                class="w-7 h-7 border border-[#37383C10] rounded-tl-md rounded-bl-md flex justify-center items-center"
                            >
                                <img
                                    src="/images/arrow_gray.svg"
                                    alt=""
                                    class="w-4 h-4 rotate-180"
                                />
                            </button>
                            <button
                                class="w-7 h-7 border border-[#37383C10] rounded-tr-md rounded-br-md flex justify-center items-center"
                            >
                                <img src="/images/arrow_gray.svg" alt="" class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex items-center w-full">
                    <div class="flex gap-x-4">
                        <div class="flex flex-col gap-y-3" v-for="i in 3" :key="i">
                            <div class="w-[343px] h-[244px] rounded-xl bg-[black]"></div>
                            <div class="px-1.5 flex justify-between items-center">
                                <div class="flex flex-col gap-y-1">
                                    <span class="text-16 font-semibold text-[#171719]"
                                        >TitleTitleTitle</span
                                    >
                                    <div class="flex gap-x-1">
                                        <div class="w-4 h-4 rounded-full bg-[#D9D9D9]"></div>
                                        <span
                                            class="font-medium text-[13px] text-[rgba(55, 56, 60, 0.61)]"
                                            >User</span
                                        >
                                    </div>
                                </div>
                                <div class="flex items-center gap-x-4">
                                    <button class="flex flex-col items-center">
                                        <img
                                            src="/images/view.svg"
                                            alt=""
                                            class="w-[30px] h-[30px]"
                                        />
                                        <span
                                            class="font-semibold text-[10px] text-[rgba(55, 56, 60, 0.61)]"
                                            >20</span
                                        >
                                    </button>
                                    <button class="flex flex-col items-center">
                                        <img
                                            src="/images/like.svg"
                                            alt=""
                                            class="w-[30px] h-[30px]"
                                        />
                                        <span
                                            class="font-semibold text-[10px] text-[rgba(55, 56, 60, 0.61)]"
                                            >10</span
                                        >
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="text-3xl">hello world!</div>
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
    /> -->
</template>

<script setup>
import { MainBanner } from '@/components/main';
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

<style lang="scss" scoped></style>
