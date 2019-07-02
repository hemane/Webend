<template>
    <b-card>
        <div slot="header">
            <h1>Verein: {{club.name}} <b-badge v-if="club.managerId === authBucket.id" variant="primary">Manager</b-badge></h1>
            <h6>{{ club.postcode }} {{ club.city }}</h6>
        </div>

        <div v-if="teams.edit == null">
            <h2>Mannschaften</h2>
            <b-table striped hover :items="teams.items" :fields="teams.fields" show-empty>
                <template slot="aktion" slot-scope="data">
                    <b-button-group size="sm">
                        <b-button @click="editTeam(data.item)">Bearbeiten</b-button>
                        <b-button @click="deleteTeam(data.item)">Löschen</b-button>
                    </b-button-group>
                </template>
            </b-table>

            <b-button @click="createTeam">Anlegen</b-button>
        </div>

        <div v-if="teams.edit != null">
            <h3>Neue Mannschaft</h3>
            <b-form-group
                    id="name"
                    label="Bezeichnung:"
                    label-for="input-name">
                <b-form-input
                        id="input-name"
                        v-model="teams.edit.name"
                        type="text"
                        required
                        placeholder="Bezeichnung"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                    id="league"
                    label="Sportart/Liga:"
                    label-for="input-league">
                <b-form-select v-model="teams.edit.leagueId">
                    <option v-for="league in leagues" :key="league.id" :value="league.id">{{league.sportLabel}}/{{league.name}}</option>
                </b-form-select>
            </b-form-group>

            <b-button-group>
                <b-button variant="danger" @click="clean">Verwerfen</b-button>
                <b-button @click="save">Speichern</b-button>
            </b-button-group>
        </div>

    </b-card>
</template>

<script>
    export default {
        props: {
            id: Number
        },
        data() {
            return {
                club: null,
                authBucket: null,
                teams: {
                    fields: {
                        id: "#",
                        name: "Bezeichnung",
                        leagueLabel: "Sportart/Liga",
                        aktion: "Aktion"
                    },
                    items: [],
                    edit: null
                },
                leagues: []
            }
        },
        created() {
            this.$authBucket(r => this.authBucket = r);
            this.load();
        },
        methods: {
            load() {
                this.$axios().get("/clubs/" + this.id)
                    .then(j => this.club = j.data);
                this.$axios().get("/leagues")
                    .then(j => this.leagues = j.data);

                this.loadTeams();
            },
            loadTeams() {
                this.$axios().get("/teams/club/" + this.id)
                    .then(j => this.teams.items = j.data);
            },
            editTeam(p) {
                this.teams.edit = {
                    id: p.id,
                    name: p.name,
                    leagueId: p.leagueId,
                };
            },
            deleteTeam(p) {
                this.$axios().delete("/teams/" + p.id)
                    .finally(() => this.loadTeams());
            },
            clean() {
                this.teams.edit = null;
            },
            save() {
                let t = this.teams.edit;
                t.clubId = this.id;
                this.$axios().post("/teams", t)
                    .then(() => {
                        this.loadTeams();
                        this.clean();
                    });
            },
            createTeam() {
                this.teams.edit = {
                    name: null,
                    leagueId: null
                };
            }
        }
    }
</script>