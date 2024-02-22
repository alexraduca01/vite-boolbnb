<template>
    <footer class="bg-rich-black w-100 py-5 ">
            <section class="container">
               <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                     <h6 class="text-uppercase text-white">Assistance</h6>
                   <ul class="list-unstyled mb-0">
                      <li v-for="(item, index) in assistenza" :key="index">
                        <a class="text-white" :href="item.url">{{ item.title }}</a>
                      </li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase text-white">Hosting</h6>
                       <ul class="list-unstyled mb-0">
                          <li v-for="(item, index) in ospitare" :key="index">
                            <a class="text-white" :href="item.url">{{ item.title }}</a>
                          </li>
                        </ul>

                </div>
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h6 class="text-uppercase text-white">BoolBnb</h6>
                      <ul class="list-unstyled mb-0">
                            <li v-for="(item, index) in Boolbnb" :key="index">
                              <a class="text-white" :href="item.url">{{ item.title }}</a>
                            </li>
                      </ul>
                </div>
              </div>
            </section>               

             <section class="container mt-4">
                   <div class="row d-flex justify-content-around  mb-justify-content-center">
                            <hr class="w-100">
                        <div class=" col-sm-12 col-lg-8 col-md-8 mb-2 mt-3 d-flex lg-justify-content-start">
                            <ul class="d-flex list-unstyled">
                                <li><a class="text-white fw-bold" href="#!"> © 2024 Copyright:BoolBnb.com</a></li>
                                <li><a class="text-white d-none d-md-flex" href="#">Privacy</a></li>
                                <li><a class="text-white d-none d-md-flex" href="#">Terms</a></li>
                                <li><a class="text-white d-none d-md-flex" href="#">Site Map</a></li>
                                <li><a class="text-white d-none d-md-flex" href="#">Site Details</a></li>
                            </ul>
                        </div>
                        <div class="col-sm-12 col-lg-4 col-md-8 d-flex lg-justify-content-end mt-3">
                                <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab text-white fa-facebook-f"></i
                              ></a>
                              <!-- Twitter -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab text-white fa-twitter"></i
                              ></a>
                              <!-- Google -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab text-white fa-google"></i
                              ></a>
                              <!-- Instagram -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab text-white fa-instagram"></i
                              ></a>
                              <!-- Linkedin -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab text-white fa-linkedin-in"></i
                              ></a>
                              <!-- Github -->
                              <a data-mdb-ripple-init class="btn btn-outline btn-floating m-1" href="#!" role="button"
                                ><i class="fab text-white fa-github"></i
                              ></a>
                        </div>
                   </div>
              </section>
        </footer>
</template>

<script>
    export default {
        name: 'AppFooter',
        data() {
            return {
              assistenza:[
                        { title: 'Service Center', url: '#!' },
                        { title: 'AirCover', url: '#!' },
                        { title: 'Antidiscrimination', url: '#!' },
                        { title: 'Disability support', url: '#!' },
                        { title: 'Cancellation options', url: '#!' },
                        { title: 'Report problem in the neighborhood', url: '#!' },
                ],
              ospitare:[
                        { title: 'Open a BoolBnb', url: '#!' },
                        { title: 'AirCover for hosts', url: '#!' },
                        { title: 'Resources for hosts', url: '#!' },
                        { title: 'Community forums', url: '#!' },
                        { title: 'Hosting responsibly', url: '#!' },
              ],
              Boolbnb:[
                        { title: 'Newsroom', url: '#!' },
                        { title: 'New Features', url: '#!' },
                        { title: 'Job opportunities', url: '#!' },
                        { title: 'Investors', url: '#!' },
                        { title: 'Gift Card', url: '#!' },
                        { title: 'Stays with BoolBnb.org.', url: '#!' },
                ],
            }
        }
    }
</script>

<style lang="scss" scoped>
footer {
  height: 1200px;
}
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

@media screen and (min-width: 768px) {
  footer {
    height: 920px;
  }
}

@media screen and (min-width: 992px) {
  footer {
    height: 520px;
  }
}
</style>