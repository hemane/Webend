<template>
  <div id="app">
    <b-navbar type="dark" variant="primary" toggleable="lg">
        <b-container>
            <b-navbar-brand>
                <router-link to="/"><img src="https://avatars3.githubusercontent.com/u/50867830?s=200&v=4" alt="HeMaNe"></router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav v-if="authBucket.user != null && authBucket.user.group == 0">
                    <b-nav-item to="/sports">Sportarten</b-nav-item>
                    <b-nav-item to="/clubs">Vereine</b-nav-item>
                    <b-nav-item to="/about">Über uns</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav v-if="authBucket.user != null && authBucket.user.group == 1">
                    <b-nav-item to="/sports">Sportarten</b-nav-item>
                    <b-nav-item to="/about">Über uns</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav v-if="authBucket.user != null" class="ml-auto">
                    <b-nav-item-dropdown :text="authBucket.user.username" right>
                        <b-dropdown-item @click="logout">Abmelden</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
    <b-container class="mt-5">
        <b-row>
            <b-col>
                <router-view v-if="authBucket.user != null"/>
                <login-form v-bind:authBucket="authBucket" v-else></login-form>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
    import VueCookies from 'vue-cookies';
    
    export default {
        data() {
            return {
                authBucket: {
                    user: null
                }
            }
        },
        methods: {
            logout() {
                VueCookies.set("jwt", "");
                this.authBucket.user = null;
                this.$authBucket.user = null;
            }
        }
    }
</script>

<style>
  .navbar-brand img {
    height: 40px;
  }
</style>
