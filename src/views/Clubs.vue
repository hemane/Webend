<template>
    <b-card header="Vereine" header-tag="h1">
        <b-table striped hover :items="clubs" :fields="fields" show-empty v-if="current == null">
            <template slot="aktion" slot-scope="data">
                <b-button-group size="sm">
                    <b-button @click="edit(data.item)">Bearbeiten</b-button>
                    <b-button @click="open(data.item)">Mannschaften</b-button>
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
            <b-form-group
                    id="postcode"
                    label="Postleitzahl:"
                    label-for="input-postcode">
                <b-form-input
                        id="input-postcode"
                        v-model="current.postcode"
                        type="text"
                        required
                        placeholder="Postleitzahl"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                    id="city"
                    label="Stadt:"
                    label-for="input-city">
                <b-form-input
                        id="input-city"
                        v-model="current.city"
                        type="text"
                        required
                        placeholder="Stadt"
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
                clubs: [],
                fields: {
                    "id": "#",
                    "name": "Name",
                    "postcode": "Plz",
                    "city": "Stadt",
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
                return this.authBucket.group !== 0
            },
            load() {
                this.clubs = [];
                this.current = null;
                this.lastState = null;

                this.clubs = this.$axios().get("/clubs")
                    .then(j => this.clubs = j.data);
            },
            open(p) {
                this.$router.push({name: 'club', params: { id: p.id}});

            },
            edit(p) {
                if(this.readOnly()) return;

                this.startEditMode(p);
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
                t.postcode = s.postcode;
                t.city = s.city;
            },
            save() {
                let c = this.current;
                this.current = null;

                this.$axios().put("/clubs", c)
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
