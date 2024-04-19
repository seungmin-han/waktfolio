<template>
    <div class="pt-4 max-w-[1100px] w-full mx-auto">
        <div
            class="rounded-[24px] bg-[url(/assets/nakagin.JPG)] bg-center h-[780px] relative overflow-hidden gradient flex flex-col justify-end"
        >
            <div class="p-5 relative z-10">
                <div class="flex flex-col">
                    <h1 class="text-[28px] leading-[1.5] tracking-[-0.057em] text-[white]">
                        TitleTitleTitleTitle
                    </h1>
                </div>
            </div>
        </div>
    </div>
    <div class="text-3xl">hello world!</div>
    <button class="border p-1" @click="savePicture">저장</button>
    <button class="border p-1" @click="flag = !flag">show / hide</button>

    <input type="file" @change="tmp" />
    <View3D
        v-if="flag"
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
        flag.value = true;
        let glbData = event.target.result;
        blobSrc.value = URL.createObjectURL(new Blob([glbData], { type: 'model/gltf-binary' }));
    };
    reader.readAsArrayBuffer(event.target.files[0]);
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

<style lang="postcss" scoped>
.gradient {
    @apply after:bg-gradient-to-t after:from-[#00000059] after:to-[#00000000] after:content-[''] after:w-full after:h-[140px] after:absolute after:bottom-0;
}
</style>
