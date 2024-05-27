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
                        :disabled="currentIndex >= 2"
                        :class="{ 'opacity-50': currentIndex >= 2 }"
                        class="w-7 h-7 border border-[#37383C10] rounded-tr-md rounded-br-md flex justify-center items-center"
                    >
                        <img src="/images/arrow_gray.svg" alt="" class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
        <div class="flex items-center w-full">
            <Flicking :options="options" ref="$flk" @changed="onSlide" @move="onSlide">
                <div class="flex flex-col gap-y-3 mx-2" v-for="item in list" :key="item.contentId">
                    <div class="w-[343px] h-[244px] rounded-xl bg-[black]"></div>
                    <div class="px-1.5 flex justify-between items-center">
                        <div class="flex flex-col gap-y-1">
                            <span class="text-16 font-semibold text-[#171719]">{{
                                item.title
                            }}</span>
                            <div class="flex gap-x-1">
                                <div class="w-4 h-4 rounded-full bg-[#D9D9D9]"></div>
                                <span
                                    class="font-medium text-[13px] text-[rgba(55, 56, 60, 0.61)]"
                                    >{{ item.memberName }}</span
                                >
                            </div>
                        </div>
                        <div class="flex items-center gap-x-4">
                            <button class="flex flex-col items-center">
                                <img src="/images/view.svg" alt="" class="w-[30px] h-[30px]" />
                                <span
                                    class="font-semibold text-[10px] text-[rgba(55, 56, 60, 0.61)]"
                                    >{{ item.views }}</span
                                >
                            </button>
                            <button class="flex flex-col items-center">
                                <img src="/images/like.svg" alt="" class="w-[30px] h-[30px]" />
                                <span
                                    class="font-semibold text-[10px] text-[rgba(55, 56, 60, 0.61)]"
                                    >{{ item.likes }}</span
                                >
                            </button>
                        </div>
                    </div>
                </div>
            </Flicking>
        </div>
    </div>
</template>

<script setup>
import Flicking from '@egjs/vue3-flicking';
import { ref } from 'vue';

const props = defineProps(['title', 'list']);

const $flk = ref();
const currentIndex = ref(0);

function onSlide() {
    currentIndex.value = $flk.value.index;
}

const options = ref({
    align: 'prev',
    bound: true,
    circular: false,
});

function onClickPrev() {
    if (currentIndex.value > 2) {
        $flk.value.moveTo(1);
    } else {
        $flk.value.prev();
    }
}
</script>

<style lang="scss" scoped></style>
