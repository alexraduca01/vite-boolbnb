<template>
<section class="h-100 bg-gray">
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-lg-4 col-md-4 mb-3">
                <h2 class="mt-5 p-0 mb-5">Oops!</h2>
                <h3 class="mb-3 ms-2">We can't seem to find the page you're looking for.</h3>
                <h5 class="mb-3 ms-2 ">Error Code:404</h5>
                <h5><a class="mb-3 ms-2 text-decoration-none text-black " href="">Ritorna alla homepage</a></h5>
            </div>
            <div class="col-lg-6 col-md-4 mb-3 mt-5">
                <div class="d-flex justify-content-center">
                    <img src="/public/images/notfound-gif.gif"  alt="">
                </div>
            </div>
        </div>

    </div>
</section>
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>

<style lang="scss" scoped>
.logo{
    width: 200px;
}
h2{
    font-size: 10rem;
}
</style>