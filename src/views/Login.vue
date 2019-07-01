<template>
    <b-card header="Anmeldung" header-tag="h1">
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
    </b-card>
</template>

<script>
    import axios from "axios";

    export default {
        props: {
        },
        data: function() {
            return {
                credentials: {
                    username: "",
                    password: ""
                },
                errorMessage: ""
            }
        },
        methods: {
            login() {
               this.$axios.post("/auth", this.credentials)
                    .then(j => {
                        this.errorMessage = "";
                        if(j.status !== 200) {
                            this.errorMessage = "Ihre Benutzerdaten konnten nicht in der Datenbank gefunden werden.";
                            return null;
                        }


                    });
            }
        }
    };
</script>
