<template>
  <div class="w-100 bg-prussian-blue showcontainer position-relative">
    <AppHeader />
    <main>
      <div class="container">
        <div id="gallery" class="photos-grid-container gallery">
          <div class="main-photo img-box h-100 w-100" @click="showimage(0)">
            <img :src="store.imgBasePath + imgApartment[0]" alt="" class="h-100 cursor-pointer w-100" />
          </div>
          <div>
            <div class="sub">
              <div class="img-box" v-for="(image, index) in imgApartment" :key="index" @click="showimage(index + 1)">
                <img :src="store.imgBasePath + imgApartment[index + 1]" class="cursor-pointer" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info d-flex justify-content-center align-content-center align-items-center"
        v-if="selectedImage !== null" @click="closeimage()">
        <img class="w-50 imgtransition" :src="store.imgBasePath + imgApartment[selectedImage]" alt="" />
      </div>
      <!-- Swiper images -->
      <swiper :modules="modules" class="mySwiper" id="myswiper" @click="showimage()" :loop="true">
        <swiper-slide class="img-box"><img :src="store.imgBasePath + apartment.cover_img" alt=""
            class="h-100 w-100" /></swiper-slide>
        <swiper-slide class="img-box" v-for="image in apartment.images"><img :src="store.imgBasePath + image.url"
            alt="" /></swiper-slide>
      </swiper>
    </main>
    <div class="container">
      <div class="row position-relative">
        <div class="col-12 col-md-6 text-white">
          <div class="pt-3">
            <h2 class="d-flex align-items-center">{{ apartment.title }} <span v-if="apartment.sponsors?.length > 0"
                class="badge ms-3 fs-6 rounded-pill text-bg-warning text-uppercase"><i class="fa-solid fa-crown"></i>
                premium</span></h2>
            <p>{{ apartment.address }}</p>
          </div>
          <div class="d-flex w-75 py-1">
            <div class="fs-5">
              <span class="verticalmiddle">
                Host:
                <span class="fw-bold">{{
                  apartment.user?.name + " " + apartment.user?.surname
                }}</span></span>
              <div class="pt-3">
                <span class="mb-4 float-start">
                  <button class="btn btn-primary bg-light text-dark fw-bold" type="button"
                    @click.prevent="showOffcanvasMenu()">
                    Contact Host
                  </button>
                </span>
              </div>
            </div>
          </div>
          <h3 class="pt-1">What you will find:</h3>
          <div class="d-flex flex-wrap gap-4 pt-2 fw-bold">
            <span class="fs-5 py-1 badge rounded-pill bg-light text-dark"><i class="fa-solid fa-couch"></i> Rooms:
              {{ apartment.rooms }}</span>
            <span class="fs-5 py-1 badge rounded-pill bg-light text-dark"><i class="fa-solid fa-bed fs-6"></i> Beds:
              {{ apartment.beds }}</span>
            <span class="fs-5 py-1 badge rounded-pill bg-light text-dark"><i class="fa-solid fa-bath"></i> Bathrooms:
              {{ apartment.bathrooms }}</span>
          </div>
          <h3 class="pt-4">Services:</h3>
          <div>
            <ul class="list-unstyled d-flex flex-column align-content-center">
              <li v-for="service in services" class="py-1 fs-4 text-capitalize ">
                <span class="badge rounded-pill bg-light text-dark">
                  <i :class="service.icon" class="pe-1"></i> {{ service.name }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6 py-3 py-md-0 d-flex align-items-center">
          <div v-if="apartment.desc" class="card px-0">
            <div class="card-header">
              <h4 class="fw-bold">Description</h4>
            </div>
            <p class="card-body">{{ apartment.desc }}</p>
          </div>
        </div>
        <div class="centered">
          <h3 class="py-2 text-uppercase text-white">Location:</h3>
          <div class="row">
            <div class="col-12 rounded-top pt-3 pb-5">
              <div id="map" class="rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="offcanvas offcanvas-bottom offcanvasheight " :class="showMenu ? 'show' : ''" tabindex="-1"
          :style="{ visibility: showMenu ? 'visible' : 'hidden' }">
          <div class="offcanvas-body bg-rich-black">
            <div class="d-flex justify-content-end">
              <button type="button" @click="clearInput()" style="cursor: pointer;"
                class="btn-close text-reset bg-white text-white" @click.prevent="showOffcanvasMenu()"></button>
            </div>
            <form @submit.prevent="contactForm()" class="text-white container fs-3">
              <div v-if="successMessage != ''">
                <p class="fs-6 text-success fw-bold text-center">{{ successMessage }}!</p>
              </div>
              <div class="container px-0">
                <p class="fs-6">Fields marked with * are required!</p>
              </div>
              <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                <label for="name" class="form-label fs-6 text-white">Name *</label>
                <input type="text" class="form-control" id="name" name="name" aria-describedby="nameHelp"
                  v-model="name" required />
              </div>
              <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                <label for="name" class="form-label fs-6 text-white">Surname *</label>
                <input type="text" class="form-control" id="surname" name="surname" aria-describedby="nameHelp"
                  v-model="surname" required />
              </div>
              <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                <label for="name" class="form-label fs-6 text-white">Phone Number</label>
                <input type="text" class="form-control" id="phone_number" name="phone_number"
                  aria-describedby="nameHelp" v-model="phone_number" />
              </div>
              <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                <label for="email" class="form-label fs-6 text-white">Email address *</label>
                <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp"
                  v-model="email" required />
              </div>
              <div class="mb-3 d-flex flex-column align-content-center align-items-center">
                <label for="message" class="form-label fs-6 text-white">Your Message *</label>
                <textarea type="text" class="form-control" id="body" name="body" aria-describedby="body"
                  v-model="body" rows="5" required minlength="5"></textarea>
                <div class="d-flex py-3">
                  <button type="reset" class="btn btn-info bg-light text-center " @click="clearInput()">
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
import LoaderComponent from "../components/LoaderComponent.vue";
import AppHeader from "../components/AppHeader.vue";
export default {
  name: "AppShow",
  components: {
    AppHeader,
    AppFooter,
    Swiper,
    SwiperSlide,
    LoaderComponent,
  },
  data() {
    return {
      store,
      apartment: [],
      services: [],
      imageapartments: [],
      showMenu: false,
      name: "",
      surname: "",
      phone_number: "",
      email: "",
      body: "",
      appear: false,
      modules: [Navigation],
      imgApartment: [],
      selectedImage: null,
      successMessage: '',
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
          this.imageapartments.push(this.apartment.cover_img);
          this.imageapartments.push(this.apartment.images[1]);
          console.log(this.imageapartments);
          console.log(this.apartment);
          this.imgApartment.push(this.apartment.cover_img)
          for (let i = 0; i < this.apartment.images.length; i++) {
            // console.log(this.apartment.images[i].url);
            this.imgApartment.push(this.apartment.images[i].url);
          };
          console.log(this.imgApartment);
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
        body: this.body,
      };
      axios
        .post(
          `${this.store.apiUrl}apartments/${this.$route.params.slug}/message`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          this.successMessage = res.data.message;
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
    showimage(index) {
      this.selectedImage = index;
    },
    closeimage() {
      this.selectedImage = null;
    },
    clearInput() {
      this.name = ""
      this.surname = ""
      this.phone_number = ""
      this.email = ""
      this.body = ""
    }
  },
  mounted() {
    this.getApartments();
  },
};
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

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
  clip: rect(1px 1px 1px 1px);
  /* IE6, IE7 */
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

  .showcontainer {
    padding-bottom: 920px;
  }
}

@media screen and (min-width: 992px) {
  .showcontainer {
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
  transition: 0.5s ease;
}

.imgsize {
  width: 100%;
}

.offcanvasheight {
  height: 800px;
}

.infoscard {
  position: absolute;
  right: 0;
  top: 13%;
}

@media screen and (max-width: 575px) {
  .offcanvas.offcanvas-bottom {
    width: 100% !important;
    height: 100% !important;
  }

  .paragraph {
    display: none;
  }

}</style>
