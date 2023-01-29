<template>
    <ul>
        <ProjectItem
            v-for="project of projects"
            :project="project"
        />
    </ul>
</template>

<script>

import ProjectItem from "@/components/ProjectItem";
import {mapGetters} from 'vuex';

export default {
    async fetch({store}) {
        try {
            if (store.getters['projects/projects'].length === 0) {
                await store.dispatch('projects/getProjects')
            }
        } catch ({messages}) {
            this.$toast.error(messages, {duration: 1500})
        }
    },
    components: {
        ProjectItem
    },
    methods: {},
    computed: {
        ...mapGetters({
            projects: 'projects/projects'
        })
    }
};
</script>

<style scoped>
    ul {
       display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
