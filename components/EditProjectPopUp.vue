<template>
    <div class="main-login" v-if="isShowModal">
        <form @submit.prevent="onEdit" class="login-form">
            <label class="white-bg w-full">
                Project name:
                <input
                    class="input-form email-input white-bg"
                    v-bind:class="{'error-border': validation.hasError('title')}"

                    type="text"
                    placeholder="Name"
                    v-model="title"
                />
                <span class="white-bg error-validate" v-if="validation.hasError('title')">
                    {{ validation.firstError('title') }}
                </span>
            </label>
            <button
                class="submit-btn"
                type="submit"
            >
                Save
            </button>

            <button
                class="submit-btn"
                type="submit"
                @click="hideModal"
            >
                Close
            </button>
        </form>
    </div>
</template>

<script>


import { mapGetters } from 'vuex'
import { Validator } from 'simple-vue-validator'


export default {
    name: 'EditProjectPopUp',

    data() {
        return {
            title: ''
        };
    },
    validators: {
        'title' (value) {
            return Validator.value(value).required()
        }
    },
    methods: {

        async onEdit() {
            try {
                if (await this.$validate()) {
                    await this.$store.dispatch("projects/editProject", {
                        name: this.title,
                        id: this.$store.getters['projects/project'].id
                    });

                    await this.$store.dispatch('modals/actionModalEditProject')
                    await this.$toast.show('Project updated...', {duration: 2000});
                }
            } catch({messages}) {
                this.$toast.error(messages, {duration: 1500})
            }
        },
        hideModal() {
            this.$store.dispatch("modals/actionModalEditProject");
        }
    },
    computed: {
        ...mapGetters({
            projectName: 'projects/projectName'
        }),
        isShowModal() {
            return this.$store.getters['modals/editProjectModal']
        }
    },
    watch: {
        projectName(value) {
            this.title = value;
        }
    }
};
</script>

<style scoped>

.login-form{
    width: 550px;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:35px 40px 60px;
    background: #fff;
    border: 1px solid rgba(0,0,0,.11);
    box-shadow: 0 0 12px rgb(0 0 0 / 25%);
    border-radius: 15px;
}

.login-form label {
    margin-bottom: 10px;
}

.main-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: rgb(0 0 0 / 25%);
    height: 100vh;
    width: 100vw;
    z-index: 30;
}
.submit-btn {
    padding: 9px 24px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    background: #c44512!important;;
    width: 100% !important;
    font-size: 18px;
    border-radius: 9px;
    font-weight: 400;
    border: none;
    margin-top: 10px;
    height: 45px;
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
.login-logo{
    margin-bottom: 40px;
}
.password-input {
    margin-bottom: 15px;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 15px;
    width: 100%;
    outline: none
}

svg {
    margin-bottom: 50px;
    margin-top: 10px;
}
input{
    margin-top: 20px;
}

</style>
