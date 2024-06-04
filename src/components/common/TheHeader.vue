<template>
    <div class="max-w-[1100px] w-full py-4 px-5 flex mx-auto relative">
        <div id="logo">
            <RouterLink to="/">
                <img src="/images/logo.svg" alt="" />
            </RouterLink>
        </div>
        <div id="search-tab" class="ml-[83px] max-w-[400px] w-full flex flex-col gap-y-4">
            <div class="w-full relative border-b-[3px] border-b-gray-900">
                <input
                    type="text"
                    class="w-full max-w-[350px] ml-2 pb-[5px] text-16 leading-[24px] bg-[transparent] text-[#1717199c] focus:text-[#171719] focus:font-semibold outline-none"
                />
                <button class="w-[30px] h-[30px] absolute bottom-[2px] right-[5px]">
                    <img src="/images/search.svg" alt="" />
                </button>
            </div>
            <div class="text-gray-800 gap-x-4 flex items-center">
                <span class="text-16 font-bold flex-shrink-0">추천검색어</span>
                <div class="text-14 relative recommand overflow-hidden">
                    <Flicking :options="options">
                        <div
                            v-for="word in recommandList"
                            :key="word"
                            class="py-[5px] px-[15px] rounded-full bg-gray-300 flex-shrink-0 font-medium mr-4"
                        >
                            #{{ word }}
                        </div>
                    </Flicking>
                </div>
            </div>
        </div>
        <div class="flex items-start gap-x-4 justify-end flex-1">
            <button>
                <img src="/images/posting.svg" alt="" />
            </button>
            <button>
                <img src="/images/profile.svg" alt="" />
            </button>
        </div>
    </div>
</template>

<script setup>
import Flicking from '@egjs/vue3-flicking';
import { ref } from 'vue';

const recommandList = ref(['눕프핵', '건콘', '유니티', '언리얼']);

const options = ref({
    align: 'prev',
    bound: true,
    circular: false,
});
</script>

<style lang="postcss" scoped>
.recommand {
    @apply before:content-[''] before:absolute before:left-0 before:w-[30px] before:h-full before:bg-gradient-to-r from-gray-200 to-[rgba(255,255,255,0)] before:top-0 before:z-30;
    @apply after:content-[''] after:absolute after:right-0 after:w-[30px] after:h-full after:bg-gradient-to-l from-gray-200 to-[rgba(255,255,255,0)] after:top-0 after:z-30;
}
</style>
