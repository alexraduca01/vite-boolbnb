<template>
    <div class="w-100 bg-rich-black p-2">
        <div class="container text-white p-0">
            <div class="row justify-content-between align-items-center m-0">
                <!-- Logo -->
                <div class="col-2">
                    <router-link to="/">
                        <img src="/public/images/logo.png" alt="" style="width: 100px;">
                    </router-link>
                </div>

                <!-- Search Bar  -->
                <div class="col-7">
                    <div class="input-group flex-nowrap">
                        <span style="transform: translate(27px, 6px); z-index: 1000;" id="addon-wrapping"><i
                                class="fa-solid text-black fa-magnifying-glass"></i></span>
                        <input type="text" @keyup.enter="searchApartments()" v-model="userInput"
                            class="form-control ps-5 rounded-pill" placeholder="Search" aria-label="Username"
                            aria-describedby="addon-wrapping">
                    </div>
                </div>

                <!-- Filter -->
                <div class="col-1">
                    <div class="container">
                        <span class="float-start">
                            <span><i class="fa-solid fa-filter" @click.prevent="showOffcanvasMenu()"
                                    :disabled="filterDisabled"></i></span>
                        </span>
                    </div>
                    <div v-if="filterOpen && filterDisabled && showMenu" class="offcanvas offcanvas-end"
                        :class="showMenu ? 'show' : ''" tabindex="-1"
                        :style="{ visibility: showMenu ? 'visible' : 'hidden' }">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="">Filtri</h5>
                            <button type="button" class="btn-close text-reset"
                                @click.prevent="showOffcanvasMenu()"></button>
                        </div>
                        <div class="offcanvas-body">
                            <form action="">
                                <!-- Stanze -->
                                <div class="d-flex gap-4">
                                    <div>
                                        <h3 class="fw-bold">Rooms</h3>
                                        <select name="rooms" id=""></select>
                                    </div>
                                    <div>
                                        <h3 class="fw-bold">Beds</h3>
                                        <select name="rooms" id=""></select>
                                    </div>
                                    <div>
                                        <h3 class="fw-bold">Bathrooms</h3>
                                        <select name="rooms" id=""></select>
                                    </div>
                                </div>

                                <!-- Chilometri -->
                                <div id="form-wrapper" class="mt-5">
                                    <h3 class="fw-bold">Kilometers</h3>
                                    <div id="kilometers-amount-slider">
                                        <input type="radio" name="kilometers-amount" id="1" value="1" required>
                                        <label for="1" data-kilometers-amount="10km"></label>
                                        <input type="radio" name="kilometers-amount" id="2" value="2" required>
                                        <label for="2" data-kilometers-amount="20km"></label>
                                        <input type="radio" name="kilometers-amount" id="3" value="3" required>
                                        <label for="3" data-kilometers-amount="30km"></label>
                                        <input type="radio" name="kilometers-amount" id="4" value="4" required>
                                        <label for="4" data-kilometers-amount="40km"></label>
                                        <input type="radio" name="kilometers-amount" id="5" value="5" required>
                                        <label for="5" data-kilometers-amount="50km"></label>
                                        <div id="kilometers-amount-pos"></div>
                                    </div>
                                </div>

                                <!-- Servizi -->
                                <div>
                                    <h3 class="fw-bold mt-5">Services</h3>
                                    <ul class="list-unstyled">
                                        <li>
                                            <div class="checkbox-wrapper-65">
                                                <label for="cbk1-65">
                                                    <input type="checkbox" id="cbk1-65">
                                                    <span class="cbx">
                                                        <svg width="12px" height="11px" viewBox="0 0 12 11">
                                                            <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                                                        </svg>
                                                    </span>
                                                    <span>Kitchen</span>
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <!-- Login -->
                <div class="col-2">
                    <a href="http://localhost:8000">login</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            userInput: '',
            showMenu: false,
            filterDisabled: false,
            filterOpen: false
        }
    },
    methods: {
        searchApartments() {
            axios.get(store.searchUrl + this.userInput).then((res) => {
                console.log(res.data);
                store.apartments = res.data;
            })
        },
        showOffcanvasMenu() {
            this.filterDisabled = true;
            this.filterOpen = true;
            this.showMenu ? this.showMenu = false : this.showMenu = true;
        },
    },
}
</script>

<style lang="scss" scoped>
@use '../assets/style/main.scss' as *;

$number-of-options: 5;

#form-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
}

form {
    width: 90%;
    max-width: 500px;

    #kilometers-amount-slider {
        display: flex;
        flex-direction: row;
        align-content: stretch;
        position: relative;
        width: 100%;
        height: 50px;
        user-select: none;

        &::before {
            content: " ";
            position: absolute;
            height: 2px;
            width: 100%;
            width: calc(100% * (#{$number-of-options - 1} / #{$number-of-options}));
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #000;
        }

        input,
        label {
            box-sizing: border-box;
            flex: 1;
            user-select: none;
            cursor: pointer;
        }

        label {
            display: inline-block;
            position: relative;
            width: 20%;
            height: 100%;
            user-select: none;

            &::before {
                content: attr(data-kilometers-amount);
                position: absolute;
                left: 50%;
                padding-top: 10px;
                transform: translate(-50%, 45px);
                font-size: 14px;
                letter-spacing: 0.4px;
                font-weight: 400;
                white-space: nowrap;
                opacity: 0.85;
                transition: all 0.15s ease-in-out;
            }

            &::after {
                content: " ";
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 30px;
                height: 30px;
                border: 2px solid #000;
                background: #fff;
                border-radius: 50%;
                pointer-events: none;
                user-select: none;
                z-index: 1;
                cursor: pointer;
                transition: all 0.15s ease-in-out;
            }

            &:hover::after {
                transform: translate(-50%, -50%) scale(1.25);
            }
        }

        input {
            display: none;

            &:checked {
                +label::before {
                    font-weight: 800;
                    opacity: 1;
                }

                +label::after {
                    border-width: 4px;
                    transform: translate(-50%, -50%) scale(0.75);
                }

                ~#kilometers-amount-pos {
                    opacity: 1;
                }

                @for $i from 1 through $number-of-options {
                    &:nth-child(#{$i * 2 - 1})~#kilometers-amount-pos {
                        left: #{($i * 20%) - 10%};
                    }
                }
            }
        }

        #kilometers-amount-pos {
            display: block;
            position: absolute;
            top: 50%;
            width: 12px;
            height: 12px;
            background: #000;
            border-radius: 50%;
            transition: all 0.15s ease-in-out;
            transform: translate(-50%, -50%);
            border: 2px solid #fff;
            opacity: 0;
            z-index: 2;
        }
    }

    &:valid {
        #kilometers-amount-slider {
            input {
                +label::before {
                    transform: translate(-50%, 45px) scale(0.9);
                    transition: all 0.15s linear;
                }

                &:checked+label::before {
                    transform: translate(-50%, 45px) scale(1.1);
                    transition: all 0.15s linear;
                }
            }
        }
    }

    &+button {
        display: block;
        position: relative;
        margin: 56px auto 0;
        padding: 10px 20px;
        appearance: none;
        transition: all 0.15s ease-in-out;
        font-family: inherit;
        font-size: 24px;
        font-weight: 600;
        background: #fff;
        border: 2px solid #000;
        border-radius: 8px;
        outline: 0;
        user-select: none;
        cursor: pointer;

        &:hover {
            // transform: scale(1.1);
            background: #000;
            color: #fff;

            &:active {
                transform: scale(0.9);
            }
        }

        &:focus {
            background: #4caf50;
            border-color: #4caf50;
            color: #fff;
            pointer-events: none;

            &::before {
                animation: spin 1s linear infinite;
            }
        }

        &::before {
            display: inline-block;
            width: 0;
            opacity: 0;
            content: "\f3f4";
            font-family: "Font Awesome 5 Pro";
            font-weight: 900;
            margin-right: 0;
            transform: rotate(0deg);
        }
    }

    &:invalid+button {
        pointer-events: none;
        opacity: 0.25;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
        width: 24px;
        opacity: 1;
        margin-right: 12px;
    }

    to {
        transform: rotate(360deg);
        width: 24px;
        opacity: 1;
        margin-right: 12px;
    }
}
.checkbox-wrapper-65 *,
  .checkbox-wrapper-65 ::after,
  .checkbox-wrapper-65 ::before {
    box-sizing: border-box;
  }
  .checkbox-wrapper-65 .cbx {
    position: relative;
    display: block;
    float: left;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background-color: #606062;
    background-image: linear-gradient(#474749, #606062);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.15);
    transition: all 0.15s ease;
  }
  .checkbox-wrapper-65 .cbx svg {
    position: absolute;
    top: 3px;
    left: 3px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #fff;
    stroke-width: 2;
    stroke-dasharray: 17;
    stroke-dashoffset: 17;
    transform: translate3d(0, 0, 0);
  }
  .checkbox-wrapper-65 .cbx + span {
    float: left;
    margin-left: 6px;
  }
  .checkbox-wrapper-65 {
    user-select: none;
  }
  .checkbox-wrapper-65 label {
    display: inline-block;
    cursor: pointer;
  }
  .checkbox-wrapper-65 input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }
  .checkbox-wrapper-65 input[type="checkbox"]:checked + .cbx {
    background-color: #606062;
    background-image: linear-gradient(#255cd2, #1d52c1);
  }
  .checkbox-wrapper-65 input[type="checkbox"]:checked + .cbx svg {
    stroke-dashoffset: 0;
    transition: all 0.15s ease;
  }

@media screen and (max-width: 575px) {
    .offcanvas.offcanvas-end {
        width: 100% !important;
    }
}
</style>