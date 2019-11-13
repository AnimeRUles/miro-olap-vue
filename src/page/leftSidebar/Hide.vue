<template>
    <el-row :gutter="8">
        <el-col>
            <el-checkbox v-model="settings.hide.lineTagIs" label="Hide tag line" border />
        </el-col>
    </el-row>
</template>

<script>
    import {each}   from 'lodash'
    import constant from '@/constant'

    export default {
        name      : 'Hide',
        components: {},

        data() {
            return {
            }
        },

        mounted() {

        },

        methods: {

        }
    }
</script>

<style>
</style>
