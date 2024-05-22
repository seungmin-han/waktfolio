<template>
    <div class="flex flex-col pt-4 mt-4 max-w-[1100px] w-full mx-auto">
        <div class="pb-10 flex justify-center h-[796px] relative">
            <div class="w-full h-[624px] px-[35px] flex justify-between items-center absolute z-10">
                <button
                    class="flex items-center justify-center rounded-full bg-[#38383880]"
                    @click="$flicking.prev()"
                >
                    <img
                        src="/images/arrow_white.svg"
                        class="rotate-180 w-[30px] h-[30px]"
                        alt=""
                    />
                </button>
                <button
                    class="flex items-center justify-center rounded-full bg-[#38383880]"
                    @click="$flicking.next()"
                >
                    <img src="/images/arrow_white.svg" class="w-[30px] h-[30px]" alt="" />
                </button>
            </div>
            <Flicking
                ref="$flicking"
                @ready="applyPanelStyles"
                @changed="applyPanelStyles"
                @move="applyPanelStyles"
                :options="{ align: 'center', circular: true }"
                :plugins="plugins"
                class="relative"
            >
                <div class="w-[880px]">
                    <div
                        key="1"
                        class="rounded-[30px] flex justify-center items-center text-[white] text-[50px] origin-center w-[880px] h-[624px] bg-[rgba(50,50,50,1)]"
                    >
                        1
                    </div>
                </div>
                <div class="w-[880px]">
                    <div
                        key="2"
                        class="rounded-[30px] flex justify-center items-center text-[white] text-[50px] origin-center w-[880px] h-[624px] bg-[rgba(100,100,100,1)]"
                    >
                        2
                    </div>
                </div>
                <div class="w-[880px]">
                    <div
                        key="3"
                        class="rounded-[30px] flex justify-center items-center text-[white] text-[50px] origin-center w-[880px] h-[624px] bg-[rgba(150,150,150,1)]"
                    >
                        3
                    </div>
                </div>
                <template #viewport>
                    <div class="flicking-pagination"></div>
                </template>
            </Flicking>
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
import { ref } from 'vue';
import Flicking from '@egjs/vue3-flicking';
import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';

const $flicking = ref();

const flag = ref(false);
const viewer = ref();

const blobSrc = ref('');

const plugins = ref([new Pagination({ type: 'scroll' })]);

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

function wrapProgress(progress) {
    if (progress >= 2) {
        return progress - 3;
    } else if (progress <= -2) {
        return progress + 3;
    }
    return progress;
}

function applyPanelStyles(e) {
    e.currentTarget.panels.forEach((v) => {
        let progress = wrapProgress(v.progress, v.index);
        let tmp = progress * -100;
        let ab = Math.abs(progress);

        const zIndex = parseInt(100 - ab * 100);
        v.element.style.transform = `scale(${1 - 0.25 * ab}) translateX(${tmp}%)`;
        v.element.style.zIndex = zIndex;
    });
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
