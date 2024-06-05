<template>
    <div class="mx-auto max-w-[1100px] flex flex-col gap-y-6">
        <div class="px-5 w-full flex flex-col items-center gap-y-12 pb-6 border-b border-[#D3D3D3]">
            <ContentSlide title="“태그 명”이 포함된 유저 검색 결과" :perPageCount="6">
                <template #content>
                    <div
                        class="mr-4 last:mr-0 w-[163px] bg-[white] gap-y-1 py-4 rounded-xl flex flex-col items-center border border-[#70737c29]"
                    >
                        <img src="/images/profile_large.svg" alt="" class="w-20 h-20" />
                        <span
                            class="font-semibold leading-6 text-[#171719] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                            >김수한무거북이와두루미삼천갑자동방삭</span
                        >
                    </div>
                    <div
                        v-for="i in 10"
                        :key="i"
                        class="mr-4 last:mr-0 w-[163px] bg-[white] py-4 rounded-xl flex flex-col items-center border border-[#70737c29]"
                    >
                        <img src="/images/profile_large.svg" alt="" class="w-20 h-20" />
                        <span
                            class="font-semibold leading-6 text-[#171719] max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
                            >User</span
                        >
                    </div>
                </template>
            </ContentSlide>
        </div>
        <div class="w-full flex flex-col items-center gap-y-4 pb-12 px-5">
            <div class="flex justify-between items-center w-full">
                <span class="font-semibold text-[22px] text-[#383838]">게시물 검색 결과</span>
            </div>
            <div class="grid grid-cols-3 grid-wrapper gap-x-4 gap-y-12">
                <ContentItem v-for="item in slideList" :key="item" :item="item"></ContentItem>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ContentSlide, ContentItem } from '@/components/common';
import { ref } from 'vue';

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
</script>

<style lang="scss" scoped>
.content-item {
    margin-right: 0;
}
</style>
