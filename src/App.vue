<template>
  <div id="app">
    <b-navbar type="dark" variant="primary" toggleable="lg">
        <b-container>
            <b-navbar-brand>
                <router-link to="/"><img src="https://avatars3.githubusercontent.com/u/50867830?s=200&v=4" alt="HeMaNe"></router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="sports">Sportarten</b-nav-item>
                    <b-nav-item to="about">Über uns</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
    <b-container class="mt-5">
        <b-row>
            <b-col>
                <router-view/>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style>
  .navbar-brand img {
    height: 40px;
  }
</style>
