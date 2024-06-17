<template>
    <div class="pb-12 flex justify-center h-[796px] relative border-b border-[#D3D3D3]">
        <div class="w-full top-[297px] px-[35px] flex justify-between items-center absolute z-10">
            <button
                class="flex items-center justify-center rounded-full bg-[#38383880]"
                @click="$flicking.prev()"
            >
                <img src="/images/arrow_white.svg" class="rotate-180 w-[30px] h-[30px]" alt="" />
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
            <div class="w-[880px] flex flex-col gap-y-4" v-for="i in 3" :key="i">
                <div
                    :key="i"
                    class="img rounded-[30px] flex justify-center items-center text-[white] text-[50px] origin-center w-[880px] h-[624px] bg-[rgba(50,50,50,1)]"
                >
                    {{ i }}
                </div>
                <div class="flex flex-col px-3">
                    <span class="banner-title font-semibold text-[28px]"
                        >누군가가 만든 건축물 ({{ i }})</span
                    >
                    <div class="flex gap-x-2">
                        <div class="w-6 h-6 rounded-full bg-gray-900"></div>
                        <span class="text-[16px] text-[#606060] font-medium">
                            우왁굳의 노예 김추가
                        </span>
                    </div>
                </div>
            </div>
            <template #viewport>
                <div class="flicking-pagination"></div>
            </template>
        </Flicking>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Flicking from '@egjs/vue3-flicking';
import { Pagination } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/pagination.css';

const $flicking = ref();

const plugins = ref([new Pagination({ type: 'bullet', bulletCount: 3 })]);

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
        v.element.style.opacity = 1 - 0.5 * ab;
        v.element.style.zIndex = zIndex;

        if (v.index == $flicking.value.index) {
            v.element.querySelector('.img').classList.add('drop-shadow-banner');
        } else {
            v.element.querySelector('.img').classList.remove('drop-shadow-banner');
        }
    });
}
</script>

<style lang="scss" scoped>
// flicking slide style
:deep(.flicking-pagination-bullet-active) {
    @apply bg-[black];
}

:deep(.flicking-pagination-bullet) {
    @apply w-2.5 h-2.5;
}

:deep(.flicking-pagination-bullet-active) {
    @apply scale-[80%];
}
:deep(.flicking-pagination-bullet-prev) {
    @apply scale-[80%];
}

:deep(.flicking-pagination-bullet-next2) {
    @apply scale-[60%];
}

:deep(.flicking-pagination-bullet-prev2) {
    @apply scale-[60%];
}

:deep(.flicking-pagination) {
    @apply bottom-4;
}

.img {
    transition: 1s;
}
</style>
