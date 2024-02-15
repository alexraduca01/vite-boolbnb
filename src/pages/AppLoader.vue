<template>
    <div class="container d-flex flex-column p-0">
        <img  src="/public/images/house-gif.gif" alt="loader-logo">
    </div>
</template>

<script>
export default {
    name: 'AppLoader',
}
</script>

<style lang="scss" scoped>
div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3000;
    display: flex;
    justify-content: center;
    align-items: center;
}
img{
   width: 400px;
}

</style>