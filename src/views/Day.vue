<template>
    <b-card header="Spieltag" header-tag="h1">
        <h2>Neuer Spieltag</h2>

        <b-form-group
                id="league"
                label="Liga:"
                label-for="input-league">
            <b-form-select v-model="create.leagueId">
                <option v-for="league in leagues" :key="league.id" :value="league.id">{{league.sportLabel}}/{{league.name}}</option>
            </b-form-select>
        </b-form-group>

        <b-form-group
                id="date"
                label="Datum:"
                label-for="input-date">
            <b-form-input
                    id="input-date"
                    v-model="create.date"
                    type="text"
                    required
                    placeholder="Datum"
            ></b-form-input>
        </b-form-group>

        <b-button @click="createDay">Anlegen</b-button>
    </b-card>
</template>

<script>
    export default {
        data() {
            return {
                leagues: [],
                create: {
                    leagueId: null,
                    date: null
                }
            }
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                this.$axios().get("/leagues")
                    .then(j => this.leagues = j.data);
            },
            createDay() {
                this.$axios().post("/days", {
                    dateTimeOffset: this.create.date,
                    leagueId: this.create.leagueId
                }).then(() => {
                    this.$router.push({name: 'home'});
                });
            }
        }
    }
</script>