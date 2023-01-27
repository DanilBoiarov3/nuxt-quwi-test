<template>
    <div class="main-login">
        <form @submit.prevent="onSubmit" class="login-form">
            <svg
                class="white-bg"
                width="77"
                height="37"
                viewBox="0 0 75 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M42.704 33.368C41.2933 33.368 40.22 32.931 39.484 32.057C38.748 31.183 38.38 29.964 38.38 28.4V21.27H41.393V28.032C41.393 28.8293 41.5847 29.458 41.968 29.918C42.3513 30.3627 42.8573 30.585 43.486 30.585C44.3447 30.585 45.027 30.2707 45.533 29.642C46.039 29.0133 46.292 28.216 46.292 27.25V21.27H49.305V33H46.476V31.528H46.292C45.9393 32.0953 45.441 32.5477 44.797 32.885C44.1683 33.207 43.4707 33.368 42.704 33.368ZM50.9296 21.27H54.3106L56.3346 28.883H56.4956L58.8416 21.27H61.9236L64.2696 28.883H64.4306L66.4546 21.27H69.7896L66.0406 33H62.7976L60.4056 25.41H60.2446L57.8756 33H54.6556L50.9296 21.27ZM73.1017 19.982C72.5651 19.982 72.1051 19.7903 71.7217 19.407C71.3384 19.0237 71.1467 18.5637 71.1467 18.027C71.1467 17.4903 71.3384 17.038 71.7217 16.67C72.1051 16.2867 72.5651 16.095 73.1017 16.095C73.6384 16.095 74.0907 16.2867 74.4587 16.67C74.8421 17.038 75.0337 17.4903 75.0337 18.027C75.0337 18.5637 74.8421 19.0237 74.4587 19.407C74.0907 19.7903 73.6384 19.982 73.1017 19.982ZM71.5837 21.27H74.5967V33H71.5837V21.27Z" fill="currentColor"></path> <path d="M23 24L29 30M19.3728 32.8804C18.7599 32.9594 18.1348 33 17.5 33C9.49205 33 3 26.508 3 18.5C3 10.492 9.49205 4 17.5 4C25.508 4 32 10.492 32 18.5C32 19.2929 31.9366 20.0707 31.8139 20.8286" stroke="currentColor" stroke-width="6" stroke-miterlimit="5" stroke-linecap="round">
                </path>
            </svg>
            <label class="white-bg w-full">
                <input
                    class="input-form email-input white-bg"
                    v-bind:class="{'error-border': validation.hasError('email')}"
                    type="email"
                    placeholder="Email"
                    v-model="email"
                />
                <span class="white-bg error-validate" v-if="validation.hasError('email')">
                    {{ validation.firstError('email') }}
                </span>
            </label>
            <label class="white-bg w-full">
                <input
                    class="input-form password-input white-bg"
                    v-bind:class="{'error-border': validation.hasError('password')}"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                />
                <span class="white-bg error-validate" v-if="validation.hasError('password')">
                    {{ validation.firstError('password') }}
                </span>
            </label>
            <button
                class="submit-btn"
                type="submit"
            >
                Login
            </button>
        </form>
    </div>
</template>

<script>

import { Validator } from 'simple-vue-validator'


export default {
    layout: 'empty',
    name: 'Login',

    data() {
        return {
            email: '',
            password: ''
        };
    },
    validators: {
        'email' (value) {
            return Validator.value(value).required().email()
        },
        'password' (value) {
            return Validator.value(value).required()
        }
    },

    methods: {
        async onSubmit() {
            try {
                if (await this.$validate()){
                    await this.$store.dispatch('auth/login', {
                        email: this.email,
                        password: this.password
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
};
</script>

<style scoped>

.login-form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:35px 40px 60px;
    background: #fff;
    border: 1px solid rgba(0,0,0,.11);
    box-shadow: 0 0 12px rgb(0 0 0 / 25%);
    border-radius: 15px;
}
.main-login {
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.submit-btn {
    padding: 9px 24px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    background: #c44512!important;;
    height: 52px;
    width: 100% !important;
    font-size: 18px;
    border-radius: 9px;
    font-weight: 400;
    border: none;
}
.input-form {
    width: 250px;
    padding: 10px 15px;
}

.email-input {
    margin-bottom: 10px;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 15px;
    width: 100%;
    outline: none
}
.password-input {
    margin-bottom: 15px;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 15px;
    width: 100%;
    outline: none
}
.login-form label {
    margin-bottom: 10px;
}
svg {
    margin-bottom: 50px;
    margin-top: 10px;
}

</style>
