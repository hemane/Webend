<template>
    <b-card header="Spiel" header-tag="h1">
        <div>#{{match.id}}</div>

        <h2>Mannschaften</h2>

        <div v-for="team in teams" :key="team.id" class="border mt-3 mb-3 p-2">
            <h5>{{team.clubName}} - {{team.teamName}}</h5>

            <b-form-group label="Punkte:">
                <b-form-input
                        id="input-city"
                        v-model="team.score"
                        type="text"
                        required
                        placeholder="Stadt"
                ></b-form-input>
            </b-form-group>

            <b-button-group>
                <b-button variant="danger" @click="deleteTeam(team)">Löschen</b-button>
                <b-button @click="saveTeam(team)">Aktualisieren</b-button>
            </b-button-group>
        </div>

        <div>
            <b-form-group
                    id="teams"
                    label="Mögliche Teams:"
                    label-for="input-teams">
                <b-form-select v-model="selectedTeam"> <!--v-model=""-->
                    <option v-for="team in newTeams" :key="team.id" :value="team">{{team.clubLabel}} - {{team.name}}</option>
                </b-form-select>
            </b-form-group>
            <b-button @click="addTeam">Hinzufügen</b-button>
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
                match: null,
                teams: [],
                newTeams: [],
                selectedTeam: null
            };
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                this.$axios().get("/matches/" + this.id)
                    .then(j => this.match = j.data);
                this.$axios().get("/matches/" + this.id + "/teams")
                    .then(j => this.teams = j.data);
                this.$axios().get("/teams/forMatch/" + this.id)
                    .then(j => this.newTeams = j.data);
            },
            saveTeam(team) {
                this.$axios().put("/matches/teams", team).finally(() => this.load());
            },
            deleteTeam(team) {
                alert(team);
                this.$axios().delete("/matches/teams", team).finally(() => this.load());
            },
            addTeam() {
                this.$axios().post("/matches/teams", {
                    matchId: this.id,
                    teamId: this.selectedTeam.id,
                    Score: 0,
                }).finally(() => {
                    this.load();
                    this.selectedTeam = null;
                });
            }
        }
    }
</script>