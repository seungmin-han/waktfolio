<template>
    <div class="max-w-[1100px] w-full py-4 px-5 flex mx-auto relative">
        <div id="logo">
            <RouterLink to="/">
                <img src="/images/logo.svg" alt="" />
            </RouterLink>
        </div>
        <div id="search-tab" class="ml-[83px] max-w-[400px] w-full flex flex-col gap-y-4">
            <div class="w-full border-b-[3px] border-b-gray-900 relative">
                <input
                    type="text"
                    class="max-w-[370px] w-full leading-[29px] mb-2 bg-[transparent]"
                />
                <button class="w-[30px] h-[30px] absolute top-[2px] right-0">
                    <img src="/images/search.svg" alt="" />
                </button>
            </div>
            <div class="text-gray-800 gap-x-4 flex items-center">
                <span class="text-16 font-bold flex-shrink-0">추천검색어</span>
                <div
                    class="flex gap-x-4 flex-nowrap items-center text-14 relative recommand overflow-hidden"
                >
                    <div
                        v-for="word in recommandList"
                        :key="word"
                        class="py-[5px] px-[15px] rounded-full bg-gray-300 flex-shrink-0"
                    >
                        #{{ word }}
                    </div>
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
import { ref } from 'vue';

const recommandList = ref(['눕프핵', '건콘', '유니티', '언리얼']);
</script>

<style lang="postcss" scoped>
.recommand {
    @apply before:content-[''] before:absolute before:right-0 before:w-[50px] before:h-full before:bg-gradient-to-l from-gray-200 to-[rgba(255,255,255,0)];
}
</style>
