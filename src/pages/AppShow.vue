<template>
  <div class="w-100 bg-prussian-blue showcontainer position-relative">
    <div class="bg-rich-black">
      <div class="container">
        <div class="row bg-rich-black py-2">
          <div class="col-sm-12">
            <router-link to="/" id="desktoplogo">
              <img src="/public/images/logo.png" alt="" style="width: 100px" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <main>
      <div class="container">
        <div id="gallery" class="photos-grid-container gallery">
          <div class="main-photo img-box h-100 w-100" @click="showimage()">
            <img
              :src="store.imgBasePath + apartment.cover_img"
              alt=""
              class="h-100 w-100"
            />
          </div>
          <div>
            <div class="sub">
              <div
                class="img-box"
                v-for="image in apartment.images"
                @click="showimage()"
              >
                <img :src="store.imgBasePath + image.url" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="info d-flex justify-content-center align-content-center align-items-center"
        v-if="appear"
        @click="closeimage()"
      >
        <img
          class="imgsize imgtransition"
          :src="store.imgBasePath + apartment.cover_img"
          alt=""
        />
        <!-- <img class="imgsize imgtransition" :src="store.imgBasePath + apartment.images.url" alt=""> -->
      </div>
      <!-- <div v-for="image in apartment.images">
                <div class="info d-flex justify-content-center align-content-center align-items-center" v-if="appear" @click="closeimage()">
                    <img class="imgsize imgtransition" :src="store.imgBasePath + image.url" alt="">
                </div>
            </div> -->

      <!-- Swiper images -->
      <swiper
        :modules="modules"
        class="mySwiper"
        id="myswiper"
        @click="showimage()"
        :loop="true"
      >
        <swiper-slide class="img-box"
          ><img
            :src="store.imgBasePath + apartment.cover_img"
            alt=""
            class="h-100 w-100"
        /></swiper-slide>
        <swiper-slide class="img-box" v-for="image in apartment.images"
          ><img :src="store.imgBasePath + image.url" alt=""
        /></swiper-slide>
      </swiper>
    </main>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 text-white">
          <div class="pt-3">
            <h2 class="">{{ apartment.title }}</h2>
            <p>{{ apartment.address }} <span>( {{ apartment.lat }}, {{ apartment.lon }} )</span></p>
          </div>
          <div class="d-flex w-75 py-1">
            <div class="fs-5">
              <span class="verticalmiddle">
                Host:
                <span class="fw-bold">{{
                  apartment.user?.name + " " + apartment.user?.surname
                }}</span></span
              >
              <div class="py-4">
                <span class="mb-4 float-start">
                  <button
                    class="btn btn-primary bg-light text-dark"
                    type="button"
                    @click.prevent="showOffcanvasMenu()"
                  >
                    Contact Host
                  </button>
                </span>
              </div>
            </div>
          </div>
          <h3 class="pt-4">What you will find:</h3>
          <div class="d-flex gap-4">
            <span class="fs-5 py-1"
              ><i class="fa-solid fa-building"></i> Rooms:
              {{ apartment.rooms }}</span
            >
            <span class="fs-5 py-1"
              ><i class="fa-solid fa-bed fs-6"></i> Bedrooms:
              {{ apartment.beds }}</span
            >
            <span class="fs-5 py-1"
              ><i class="fa-solid fa-bath"></i> Bathrooms:
              {{ apartment.bathrooms }}</span
            >
          </div>
          <h3 class="pt-4">Services:</h3>
          <div>
            <ul class="list-unstyled d-flex flex-column align-content-center">
              <li v-for="service in services" class="py-1 fs-5 text-capitalize">
                <i :class="service.icon" class="pe-3"></i> {{ service.name }}
              </li>
            </ul>
          </div>
          <div class="centered">
            <h3 class="py-2 text-uppercase">Location:</h3>
            <div class="row">
              <div class="col-12 rounded-top">
                <div id="map" class="rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            class="text-white my-5 py-5 centered d-flex flex-column align-content-center justify-content-center align-items-center"
          >
            <div py-2>
              <h2>Chi siamo</h2>
            </div>
            <div>
              <p class="fs-6 text-center">
                BoolBnb è stata fondata nel 2007, quando due host decisero di
                accogliere per la prima volta tre ospiti nella loro casa di San
                Francisco. Da allora, questa community è cresciuta e oggi conta
                oltre 4 milioni di host, che a loro volta hanno ospitato più di
                1,5 miliardi di persone in quasi tutti i paesi del mondo. Ogni
                giorno, gli host offrono spazi unici ed Esperienze, che
                consentono a ospiti e partecipanti di interagire con le comunità
                locali in un modo più genuino
              </p>
            </div>
          </div>
          <div
            class="offcanvas offcanvas-bottom offcanvasheight "
            :class="showMenu ? 'show' : ''"
            tabindex="-1"
            :style="{ visibility: showMenu ? 'visible' : 'hidden' }"
          >
            <!-- <div class="offcanvas-header">
              <button
                type="button"
                class="btn-close text-reset"
                @click.prevent="showOffcanvasMenu()"
              ></button>
            </div> -->
            <div class="offcanvas-body bg-rich-black">
              <div class="d-flex justify-content-end">
                <button
                type="button"
                class="btn-close text-reset bg-white text-white"
                @click.prevent="showOffcanvasMenu()"
                ></button>
              </div>
              <form @submit.prevent="contactForm()" class="text-white fs-3">
                <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                  <label for="name" class="form-label fs-6 text-white"
                    >Name</label
                  >
                  <input
                    type="text"
                    class="form-control w-50"
                    id="name"
                    name="name"
                    aria-describedby="nameHelp"
                    v-model="name"
                  />
                </div>
                <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                  <label for="name" class="form-label fs-6 text-white"
                    >Surname</label
                  >
                  <input
                    type="text"
                    class="form-control w-50"
                    id="surname"
                    name="surname"
                    aria-describedby="nameHelp"
                    v-model="surname"
                  />
                </div>
                <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                  <label for="name" class="form-label fs-6 text-white"
                    >Phone Number</label
                  >
                  <input
                    type="text"
                    class="form-control w-50"
                    id="phone_number"
                    name="phone_number"
                    aria-describedby="nameHelp"
                    v-model="phone_number"
                  />
                </div>
                <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                  <label for="email" class="form-label fs-6 text-white"
                    >Email address</label
                  >
                  <input
                    type="email"
                    class="form-control w-50"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    v-model="email"
                  />
                </div>
                <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                  <label for="message" class="form-label fs-6 text-white"
                    >Your Message</label
                  >
                  <textarea
                    type="text"
                    class="form-control w-50"
                    id="body"
                    name="body"
                    aria-describedby="body"
                    v-model="body"
                  ></textarea> 
                  <div class="d-flex py-3">
                    <button type="reset" class="btn btn-info bg-light text-center ">
                    Reset
                    </button>
                    <button type="submit" class="btn btn-primary mx-3">Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter style="position: absolute; bottom: 0;" />
  </div>
</template>

<script>
import AppFooter from "../components/AppFooter.vue";
import tt from "@tomtom-international/web-sdk-maps";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { store } from "../store.js";
export default {
  name: "AppShow",
  components: {
    AppFooter,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      store,
      apartment: [],
      services: [],
      showMenu: false,
      name: "",
      surname: "",
      phone_number: "",
      email: "",
      body: "",
      appear: false,
      modules: [Navigation],
    };
  },
  methods: {
    getApartments() {
      let lat;
      let lon;
      axios
        .get(`${this.store.apiUrl}apartments/${this.$route.params.slug}`)
        .then((res) => {
          this.apartment = res.data;
          lat = this.apartment.lat;
          lon = this.apartment.lon;
          this.services = this.apartment.services;
          console.log(this.apartment);
        });
      const mapTime = setTimeout(() => {
        this.makeMap(lon, lat);
      }, 1500);
    },
    makeMap(lon, lat) {
      let center = [lon, lat];
      console.log(lat, lon);
      // let center = [this.location[1], this.location[0]];
      const map = tt.map({
        key: "2HI9GWKpWiwAq3zKIGlnZVdmoLe7u7xs",
        container: "map",
        center: center,
        zoom: 10,
      });
      const marker = new tt.Marker().setLngLat(center).addTo(map);
    },
    contactForm() {
      const formData = {
        name: this.name,
        surname: this.surname,
        phone_number: this.phone_number,
        email: this.email,
        body: this.message,
      };
      axios
        .post(
          `${this.store.apiUrl}apartments/${this.$route.params.slug}/message`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          this.name = "";
          this.surname = "";
          this.phone_number = "";
          this.email = "";
          this.body = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showOffcanvasMenu() {
      this.showMenu ? (this.showMenu = false) : (this.showMenu = true);
    },
    showimage() {
      if (!this.appear) {
        this.appear = true;
        console.log(this.appear);
      }
    },
    closeimage() {
      if (this.appear) {
        this.appear = false;
      }
    },
  },
  mounted() {
    this.getApartments();
  },
  created() {},
};
</script>

<style lang="scss" scoped>



#map {
  aspect-ratio: 21 / 9;
  width: 100%;
  max-height: 100%;
}

.photos-grid-container {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 0;
  align-items: start;

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }

  .img-box {
    position: relative;
  }

  .img-box:hover .transparent-box {
    background-color: rgba(0, 0, 0, 0.6);
  }

  .img-box:hover .caption {
    transform: translateY(-5px);
  }

  img {
    max-width: 100%;
    display: block;
    height: auto;
  }

  .caption {
    color: white;
    transition: transform 0.3s ease, opacity 0.3s ease;
    font-size: 1.5rem;
  }

  .transparent-box {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    transition: background-color 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-photo {
    grid-row: 1;
    grid-column: 1;
  }

  .sub {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 0em;

    &:nth-child(0) {
      grid-column: 1;
      grid-row: 1;
    }

    &:nth-child(1) {
      grid-column: 2;
      grid-row: 1;
    }

    &:nth-child(2) {
      grid-column: 1;
      grid-row: 2;
    }

    &:nth-child(3) {
      grid-column: 2;
      grid-row: 2;
    }
  }
}

.showcontainer {
  padding-bottom: 1200px;
}

//https://www.nomensa.com/blog/how-improve-web-accessibility-hiding-elements
.hide-element {
  border: 0;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

@media screen and (min-width: 1280px) {
  //HD Screens
  .container {
    margin: 0 auto;
    width: 1250px;
  }
}


@media screen and (max-width: 769px) {
  #gallery {
    display: none;
  }

  .centered {
    text-align: center !important;
  }
}

@media screen and (min-width: 768px) {
  #myswiper {
    display: none;
  }
  .showcontainer{
    padding-bottom: 920px;
  }
}

@media screen and (min-width: 992px){
    .showcontainer{
        padding-bottom: 520px;
        min-height: 100vh;
    }
}

.verticalmiddle {
  vertical-align: middle;
}

.info {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
  transition: background-color 0.3s ease;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.imgtransition {
  transition: background-color 0.5s ease;
}

.imgsize {
  width: 100%;
}

.offcanvasheight{
  height: 800px;
}

@media screen and (max-width: 575px) {
  .offcanvas.offcanvas-bottom {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
