<template>
    <b-card header="Sportarten" header-tag="h1">
        <b-table striped hover :items="sports" :fields="fields" show-empty v-if="current == null">
            <template slot="aktion" slot-scope="data">
                <b-button-group size="sm">
                    <b-button @click="edit(data.item)">Bearbeiten</b-button>
                    <b-button @click="open(data.item)">Ligen</b-button>
                </b-button-group>
            </template>
        </b-table>

        <b-button @click="create" v-if="current == null" :disabled="authBucket.group != 0">Anlegen</b-button>
        <div v-if="current != null">
            <h2 v-if="current.id == 0">Anlegen</h2>
            <h2 v-else>#{{current.id}} Bearbeiten</h2>
            <b-form-group
                    id="name"
                    label="Bezeichnung:"
                    label-for="input-name">
                <b-form-input
                        id="input-name"
                        v-model="current.name"
                        type="text"
                        required
                        placeholder="Bezeichnung"
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
        },
        data: function() {
            return {
                sports: [],
                fields: {
                    "id": "#",
                    "name": "Name",
                    "aktion": "Aktion"
                },
                current: null,
                lastState: null,
                authBucket: null
            }
        },
        created() {
            this.$authBucket(b => {
                this.authBucket = b;
                this.load();
            });
        },
        methods: {
            readOnly() {
                return this.authBucket.group != 0
            },
            load() {
                this.sports = [];
                this.current = null;
                this.lastState = null;

                this.sports = this.$axios().get("/sports")
                    .then(j => this.sports = j.data);
            },
            edit(p) {
                if(this.readOnly()) return;

                this.startEditMode(p);
            },
            open(p) {
                this.$router.push({name: 'sport', params: { id: p.id}});
            },
            create() {
                if(this.readOnly()) return;

                this.startEditMode({
                    id: 0,
                    name: ""
                })
            },
            startEditMode(dto) {
                this.lastState = this.clone(dto);
                this.current = dto; //this.clone(dto)
            },
            clone(dto) {
                let o = {};
                this.copyTo(dto, o);
                return o;
            },
            copyTo(s, t) {
                t.id = s.id;
                t.name = s.name;
            },
            save() {
                //TODO: Unmock
                let c = this.current;
                this.current = null;

                this.$axios().post("/sports", c)
                    .then(() => this.load());
            },
            clean() {
                if (this.lastState != null) {
                    this.copyTo(this.lastState, this.current);
                }
                this.lastState = null;
                this.current = null;
            }
        }
    };
</script>
