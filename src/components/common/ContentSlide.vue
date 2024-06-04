<template>
    <div class="flex flex-col items-center gap-y-4 w-full">
        <div class="flex justify-between items-center w-full">
            <span class="font-semibold text-[22px] text-[#383838]">{{ title }}</span>
            <div class="flex items-center gap-x-4">
                <span>전체보기</span>
                <div class="flex items-center">
                    <button
                        @click="onClickPrev()"
                        :disabled="currentIndex == 0"
                        :class="{ 'opacity-50': currentIndex == 0 }"
                        class="w-7 h-7 border border-[#37383C10] rounded-tl-md rounded-bl-md flex justify-center items-center"
                    >
                        <img src="/images/arrow_gray.svg" alt="" class="w-4 h-4 rotate-180" />
                    </button>
                    <button
                        @click="$flk.next()"
                        :disabled="currentIndex >= maxIndex"
                        :class="{ 'opacity-50': currentIndex >= maxIndex }"
                        class="w-7 h-7 border border-[#37383C10] rounded-tr-md rounded-br-md flex justify-center items-center"
                    >
                        <img src="/images/arrow_gray.svg" alt="" class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <div class="flex items-center w-full">
            <Flicking :options="options" ref="$flk" @changed="onSlide" @move="onSlide">
                <slot name="content"> </slot>
            </Flicking>
        </div>
    </div>
</template>

<script setup>
import Flicking from '@egjs/vue3-flicking';
import { computed, onMounted, ref } from 'vue';

const props = defineProps(['title', 'perPageCount']);

const $flk = ref();
const currentIndex = ref(0);

const count = ref(0);

const maxIndex = computed(() => count.value - props.perPageCount);

onMounted(() => {
    count.value = $flk.value.panels.length;
});

function onSlide() {
    currentIndex.value = $flk.value.index;
}

const options = ref({
    align: 'prev',
    bound: true,
    circular: false,
});

function onClickPrev() {
    if (maxIndex.value < currentIndex.value) {
        $flk.value.moveTo(maxIndex.value - 1);
    } else {
        $flk.value.prev();
    }
}
</script>

<style lang="scss" scoped></style>
