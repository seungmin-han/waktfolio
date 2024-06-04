<template>
    <div class="flex flex-col pt-4 mt-4 gap-y-12 max-w-[1100px] w-full mx-auto">
        <!-- 배너 START -->
        <MainBanner />
        <!-- 배너 END -->
        <div class="px-5 w-full flex flex-col items-center gap-y-12 pb-12">
            <ContentSlide title="최신 등록 순" :perPageCount="3">
                <template #content>
                    <ContentItem v-for="item in slideList" :key="item.contentId" :item="item" />
                </template>
            </ContentSlide>
            <ContentSlide title="24시간 킹아 순" :perPageCount="3">
                <template #content>
                    <ContentItem v-for="item in slideList" :key="item.contentId" :item="item" />
                </template>
            </ContentSlide>
            <ContentSlide title="24시간 조회수 순" :perPageCount="3">
                <template #content>
                    <ContentItem v-for="item in slideList" :key="item.contentId" :item="item" />
                </template>
            </ContentSlide>
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
import { ContentSlide, ContentItem } from '@/components/common';
import { ref } from 'vue';

const flag = ref(false);
const viewer = ref();

const slideList = ref([
    {
        contentId: '82be2a61-0aae-4312-8740-20fce78e8b041',
        memberName: 'test123',
        title: 'delete',
        thumbnailImagePath: null,
        likes: 20,
        views: 10,
    },
    {
        contentId: '82be2a61-0aae-4312-8740-20fce78e8b042',
        memberName: 'test123',
        title: 'delete',
        thumbnailImagePath: null,
        likes: 20,
        views: 10,
    },
    {
        contentId: '82be2a61-0aae-4312-8740-20fce78e8b043',
        memberName: 'test123',
        title: 'delete',
        thumbnailImagePath: null,
        likes: 20,
        views: 10,
    },
    {
        contentId: '82be2a61-0aae-4312-8740-20fce78e8b044',
        memberName: 'test123',
        title: 'delete',
        thumbnailImagePath: null,
        likes: 20,
        views: 10,
    },
    {
        contentId: '82be2a61-0aae-4312-8740-20fce78e8b045',
        memberName: 'test123',
        title: 'delete',
        thumbnailImagePath: null,
        likes: 20,
        views: 10,
    },
]);

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
