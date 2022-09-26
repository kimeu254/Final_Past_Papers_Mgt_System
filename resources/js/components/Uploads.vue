<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Laravel Vue JS File Upload Demo</div>
                    <div class="card-body">
                        <div v-if="success != ''" class="alert alert-success">
                            {{success}}
                        </div>
                        <form @submit="formSubmit" enctype="multipart/form-data">
                            <div class="mb-4">
                                <input type="file" class="form-control" v-on:change="onChange">
                            </div>
                            <div class="mb-4">
                                <input type="text" v-model="title" class="form-control" placeholder="Title">
                            </div>

                            <div class="mb-4">
                        
                                <select v-if="units.length > 0" class="form-select" aria-label="Default select example" v-model="unit_id" required>
                                    <option selected></option>
                                    <option v-for="unit in units" :key="unit.id" :value="unit.id">{{ unit.name }}</option>
                                </select>
                        
                                <input v-else type="text" value="No unit found" class="form-control">
                                <label class="form-label" for="form3Example1q">Units<span class="text-danger">*</span></label>
                            </div>

                            <button class="btn btn-primary btn-block" type="submit">Upload</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

import axios from 'axios'

export default {
        data() {
            return {
                name: '',
                file: '',
                title: '',
                unit_id: '',
                success: ''
            };
        },
        computed: {
            ...mapGetters(["units"])
        },
        methods: {
            onChange(e) {
                this.file = e.target.files[0];
            },
            formSubmit(e) {
                e.preventDefault();
                let existingObj = this;
                let data = new FormData();
                data.append('file', this.file);
                data.append('title', this.title);
                data.append('unit_id', this.unit_id);
                axios.post('/api/upload', data)
                    .then(function (res) {
                        existingObj.success = res.data.success;
                    })
                    .catch(function (err) {
                        existingObj.output = err;
                    });
            }
        }
}
</script>