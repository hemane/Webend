<template>
    <b-card header="Sportarten" header-tag="h1">
        <b-table striped hover :items="sports" :fields="fields" @row-clicked="open" show-empty v-if="current == null"></b-table>

        <b-button @click="create" v-if="current == null">Anlegen</b-button>
        <div v-if="current != null">
            <h2>{{ current.id == null ? "Anlegen" : "Bearbeiten" }}</h2>
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
                sports: [
                    {
                        id: 1,
                        name: "Hello World"
                    }
                ],
                fields: {
                    "id": "#",
                    "name": "Name"
                },
                current: null,
                lastState: null
            }
        },
        methods: {
            open(p) {
                this.startEditMode(p);
            },
            create() {
                this.startEditMode({
                    id: null,
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

                if(c.id == null) {
                    this.sports.push(c);
                }
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
