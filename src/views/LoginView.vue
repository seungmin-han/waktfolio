<template>
    <div class="w-full h-full flex justify-center items-center">
        <div class="flex flex-col items-center w-[800px]">
            <label class="flex justify-between items-center w-full">
                아이디
                <input type="text" />
            </label>
            <label class="flex justify-between items-center w-full">
                비밀번호
                <input type="text" />
            </label>
            <label class="flex justify-between items-center w-full">
                이름
                <input type="text" />
            </label>
            <label class="flex justify-between items-center w-full">
                이미지 선택
                <input type="file" accept=".png,.jpg,.jpeg" @change="changeFile" />
            </label>

            <button @click="register">회원가입</button>
        </div>
    </div>
</template>

<script setup>
function register() {}

function changeFile($e) {
    console.log($e.target.files);
}
</script>

<style lang="scss" scoped></style>
