<template>
        <div class="w-100 vh-100 bg-prussian-blue">
                <img  src="/public/images/house-gif.gif" alt="loader-logo">
            <div class="loader">
                <p class="text-white">Loading your apartments  
                    <span class="dots"></span>
                    <span class="dots"></span>
                    <span class="dots"></span>
                </p>
            </div>
        </div>
</template>

<script>
export default {
    name: 'LoaderComponent',
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
   background-color: #003459ff;
}
.loader {
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
}
@keyframes bounce-right {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(20px);
    }
    50% {
        transform: translateX(0);
    }
    75% {
        transform: translateX(20px);
    }
    100% {
        transform: translateX(0);
    }
}



.loader .dots {
    display: inline-block;
    animation: bounce-right 3s infinite;
}

.loader .dots  {
    display: inline-block;
    width: 5px;
    height: 5px;
    margin: 0 5px;
    background-color: #fff;
    border-radius: 50%;
    margin-top: 10px;
}

.loader p {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
}


</style>