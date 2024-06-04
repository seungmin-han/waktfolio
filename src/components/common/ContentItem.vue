<template>
    <div class="flex flex-col gap-y-3 mr-4 last:mr-0 content-item">
        <div class="w-[343px] h-[244px] rounded-xl bg-[black]"></div>
        <div class="px-1.5 flex justify-between items-center">
            <div class="flex flex-col gap-y-1">
                <span class="text-16 font-semibold text-[#171719]">{{ item.title }}</span>
                <div class="flex gap-x-1">
                    <div class="w-4 h-4 rounded-full bg-[#D9D9D9]"></div>
                    <span class="font-medium text-[13px] text-[rgba(55, 56, 60, 0.61)]">{{
                        item.memberName
                    }}</span>
                </div>
            </div>
            <div class="flex items-center gap-x-4">
                <button class="flex flex-col items-center">
                    <img src="/images/view.svg" alt="" class="w-[30px] h-[30px]" />
                    <span class="font-semibold text-[10px] text-[rgba(55, 56, 60, 0.61)]">{{
                        item.views
                    }}</span>
                </button>
                <button class="flex flex-col items-center">
                    <img src="/images/like.svg" alt="" class="w-[30px] h-[30px]" />
                    <span class="font-semibold text-[10px] text-[rgba(55, 56, 60, 0.61)]">{{
                        item.likes
                    }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['item']);
</script>

<style lang="scss" scoped></style>
