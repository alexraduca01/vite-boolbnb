<template>
    <div class="container">
            <img  src="/public/images/house-gif.gif" alt="loader-logo">
        <div class="loader">
            <p>Loading your apartment  
                <span class="dots"></span>
                <span class="dots"></span>
                <span class="dots"></span>
            </p>
          </div>
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
    background-color: #000;
    border-radius: 50%;
    margin-top: 10px;
}

.loader p {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
}


</style>