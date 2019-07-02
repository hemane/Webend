<template>
    <b-card header="HeMaNe Spieltagverwaltung" header-tag="h1">

        <b-button class="mb-4" to="/day">Neuer Spieltag</b-button>


        <b-card-group columns>
            <b-card v-for="day in display.days" :key="day.date" :title="day.date | formatDate">
                <div v-for="sport in day.sports" :key="sport.id">
                    <h5>{{sport.name}}</h5>
                    <b-nav vertical class="w-25">
                        <b-nav-item-dropdown
                                v-for="league in sport.leagues"
                                :key="league.id"
                                :text="league.name"
                                toggle-class="nav-link-custom"
                                right>
                            <b-dropdown-item @click="createMatch(league.dayId)">Neues Spiel</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item v-for="match in league.matches" :key="match.id" @click="openMatch(match.id)">
                                #{{ match.id }}
                                <div v-for="team in match.teams" :key="team.id">{{team.club}} - {{team.name}}: {{team.score}}</div>
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-nav>
                </div>
            </b-card>
        </b-card-group>

    </b-card>
</template>

<script>
    export default {
        data() {
            return {
                display: []
            }
        },
        created() {
            this.load();
        },
        methods: {
            load() {
                this.$axios().get("/display")
                    .then(j => this.display = j.data);
            },
            createMatch(id) {
                this.$axios().post("/matches", {
                    dayId: id
                }).then(() => this.load());
            },
            openMatch(id) {
                this.$router.push({name: 'match', params: { id: id}});
            }
        }
    }
</script>