<template>
    <b-card header="Anmeldung" header-tag="h1">
        <div v-if="isInit">
            <b-alert variant="danger" v-if="errorMessage.length > 0" show>{{ errorMessage }}</b-alert>

            <b-form-group
                    id="username"
                    label="Benutzername:"
                    label-for="input-username">
                <b-form-input
                        id="input-username"
                        v-model="credentials.username"
                        type="text"
                        required
                        placeholder="Benutzername"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                    id="password"
                    label="Kennwort:"
                    label-for="input-password">
                <b-form-input
                        id="input-password"
                        v-model="credentials.password"
                        type="password"
                        required
                        placeholder="Kennwort"
                ></b-form-input>
            </b-form-group>

            <b-button-group>
                <b-button @click="login">Anmelden</b-button>
            </b-button-group>
        </div>
    </b-card>
</template>

<script>
    // import axios from "axios";
    import jsSHA from "jssha";
    import VueCookies from 'vue-cookies';

    export default {
        props: {
            authBucket: Object
        },
        data: function() {
            return {
                credentials: {
                    username: "",
                    password: ""
                },
                errorMessage: "",
                isInit: false
            }
        },
        created() {
            this.auth();
        },
        methods: {
            auth() {
                this.$axios().get("/auth")
                    .then(j => {
                        this.authBucket.user = j.data;
                        this.$authBucket.user = null;
                    })
                    .catch(() => {
                        this.isInit = true
                    });
            },
            login() {
                let sha = new jsSHA("SHA-256", "TEXT");
                sha.update(this.credentials.password);

                let cred = {
                    username: this.credentials.username,
                    password: sha.getHash("HEX")
                };

                this.$axios().post("/auth", cred)
                    .then(j => {
                        this.errorMessage = "";
                        if(j.status !== 200) {
                            this.errorMessage = "Ihre Benutzerdaten stehen nicht in unserem System. [N200]";
                            return null;
                        }

                        VueCookies.set("jwt", j.data.token);
                        this.auth();
                    })
                    .catch(() => {
                        this.errorMessage = "Ihre Benutzerdaten stehen nicht in unserem System. [AX]";
                    });
            }
        }
    };
</script>
