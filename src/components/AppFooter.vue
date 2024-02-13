<template>
    <footer class="bg-body-tertiary w-100 py-3 ">
            <section class=" container">
               <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase">Assistenza</h6>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a class="text-body" href="#!">Centro Assistenza</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">AirCover</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Antidiscriminazione</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Supporto alla disabilità</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Opzioni di cancellazione</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Segnala problema nel quartiere</a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase">Ospitare</h6>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a class="text-body" href="#!">Apri un BoolBnb</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">AirCover per gli host</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Risorse per gli host</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Forum della community</a>
                    </li>
                    <li>
                        <a class="text-body" href="#!">Ospitare responsabilmente</a>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase">BoolBnb</h6>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a class="text-body" href="#!">Newsroom</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Nuove funzionalità</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Opportunità di lavoro</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Investitori</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Gift Card</a>
                    </li>
                    <li>
                      <a class="text-body" href="#!">Soggiorni con BoolBnb.org</a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>               

             <section class="container mt-4 p-0">
                   <div class="row d-flex justify-content-around align-items-center">
                            <hr class="w-100">
                        <div class=" col-lg-8 col-md-8 mb-2 mt-3 d-flex">
                            <ul class="d-flex list-unstyled p-0">
                                <li><a class="text-body fw-bold" href="#!"> © 2024 Copyright:BoolBnb.com</a></li>
                                <li><a class="text-body d-none d-md-flex" href="#">Privacy</a></li>
                                <li><a class="text-body d-none d-md-flex" href="#">Termini</a></li>
                                <li><a class="text-body d-none d-md-flex" href="#">Mappa del sito</a></li>
                                <li><a class="text-body d-none d-md-flex" href="#">Dettagli del sito</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-8 mb-2 d-flex justify-content-end">
                                <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab fa-facebook-f"></i
                              ></a>
                              <!-- Twitter -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab fa-twitter"></i
                              ></a>
                              <!-- Google -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab fa-google"></i
                              ></a>
                              <!-- Instagram -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab fa-instagram"></i
                              ></a>
                              <!-- Linkedin -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab fa-linkedin-in"></i
                              ></a>
                              <!-- Github -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab fa-github"></i
                              ></a>
                        </div>
                   </div>
              </section>
        </footer>
</template>

<script>
    export default {
        name: 'AppFooter'
    }
</script>

<style lang="scss" scoped>
a{
   text-decoration: none;
}
a:hover{
    text-decoration: underline;
}
li{
    padding: 10px;
}
h6{
    padding: 10px;
}

</style>