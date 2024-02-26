<template>
    <div class="w-100 vh-100 bg-prussian-blue">
        <section class="h-100">
            <div class="container" >
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-lg-4 col-md-4 mb-3">
                        <h2 class="mt-5 p-0 mb-5 text-white">Oops!</h2>
                        <h3 class="mb-3 ms-2 text-white">We can't seem to find the page you're looking for.</h3>
                        <h5 class="mb-3 ms-2 text-white">Error Code: 404</h5>
                        <ul class="text-white">
                            <li >
                            <router-link class="text-decoration-none text-white" to="/" :class="{ active: $route.name === 'home' }">Home</router-link>
                            </li>
                        </ul>            </div>
                    <div class="col-lg-6 col-md-4 mb-3 mt-5">
                        <div class="d-none d-sm-flex justify-content-center">
                            <img src="/public/images/notfound-gif.gif"  alt="logo-notfound">
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'NotFound'
    }
</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as *;
.logo{
    width: 200px;
}
h2{
    font-size: 8rem;
}
</style>