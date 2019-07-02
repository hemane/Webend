<template>
    <b-card :header="sport.name" header-tag="h1">
        <div slot="header">
            Sportart: {{sport.name}}
        </div>


        <h2>Ligen</h2>
        <b-table striped hover :items="leagues.items" :fields="leagues.fields" show-empty>
            <template slot="aktion" slot-scope="data">
                <b-button-group size="sm">
                    <b-button @click="edit(data.item)">Bearbeiten</b-button>
                    <b-button @click="open(data.item)">Übersicht</b-button>
                </b-button-group>
            </template>
        </b-table>


        <div>
            <h3>Liga Anlegen</h3>
            <b-form-group
                    id="name"
                    label="Name:"
                    label-for="input-name">
                <b-form-input
                        id="input-name"
                        v-model="leagues.create.name"
                        type="text"
                        required
                        placeholder="Name"
                ></b-form-input>
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
                sport: null,
                authBucket: null,
                leagues: {
                    fields: {
                        "id": "#",
                        "name": "Name"
                    },
                    items: [],
                    create: {
                        name: null
                    }
                }
            }
        },
        created() {
            this.$axios().get("/sports/" + this.id)
                .then(j => this.sport = j.data);

            //this.$authBucket(r => this.authBucket = r);

            //this.$axios().get("/teams/club/" + this.id)
            //    .then(j => this.teams.items = j.data);
            this.load();
        },
        methods: {
            load() {
                this.loadLeagues();
            },
            loadLeagues() {
                this.$axios().get("/leagues/sport/" + this.id)
                    .then(j => this.leagues.items = j.data);
            },
            clean() {
                this.leagues.create.name = null;
            },
            save() {
                let name = this.leagues.create.name;

                this.$axios().post("/leagues", {
                    name: name,
                    sportId: this.id
                })
                    .then(() => {
                        this.clean();
                        this.loadLeagues();
                    });
            }
        }
    }
</script>