<template>
    <div>
        <EditProjectModal/>
        <NavBar/>
        <Nuxt/>
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar";
    import EditProjectModal from '@/components/EditProjectPopUp';

    export default {
        name: 'default',
        components: {
            NavBar,
            EditProjectModal
        }
    };
</script>
