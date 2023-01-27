<template>
    <div class="project-item-cover" @click="showEditModal(project)">
        <li class="li-item">
            <div class="li-item-logo-block">
                <img
                    width="150"
                    height="150"
                    :src="logoUrl"
                    alt="logo"
                    class="project-img"
                />

                <h3>{{ project.name }}</h3>
            </div>

            <p>
               <span class="bold" :style="status">{{ statusPlainText }}</span>
            </p>

            <div class="summary">
                <ul class="summary-list">
                    <li class="summary-item">
                        <span class="status">time this week</span>
                        <span class="status-time bold">00:00:00</span>
                    </li>
                    <li class="summary-item">
                        <span class="status">time month</span>
                        <span class="status-time bold">00:00:00</span>
                    </li>
                    <li class="summary-item">
                        <span class="status">total</span>
                        <span class="status-time bold">00:00:00</span>
                    </li>
                </ul>
            </div>
        </li>
    </div>
</template>

<script>
export default {
    props: {
        project: {
            type: Object,
            required: true,

            default: () => {
               return {
                   id: 1,
                   name: 'test',
                   logo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQe0aIpwj4w-pyegE87ebOCw5QrVVpJEbJNG4mWr-CBQ&s'
               }
            }
        }
    },
    methods: {
        async showEditModal(project) {
            await this.$store.dispatch('projects/setEditableProject', {project})
            await this.$store.dispatch('modals/actionModalEditProject')
        }
    },
    computed: {
        status() {
            return {
                color: this.project.is_active ? "green" : "grey"
            };
        },
        statusPlainText() {
            return this.project.is_active ? "Active" : "Inactive";
        },
        logoUrl() {
            return this.project.logo_url || 'https://thumbs.dreamstime.com/b/no-image-available-icon-vector-illustration-flat-design-140476186.jpg'
        }
    }
}
</script>

<style scoped>
    * {
        background: white !important;
    }

    a {
        text-decoration: none;
        color: inherit;
        width: 100%;
    }

    .summary-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .status {
        margin-right: 20px;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    .li-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 2px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        color: black;
        padding: 20px;
    }

    .li-item:hover {
        transform: translate3d(0px, -1px, 0px);
    }
    .project-item-cover {
        margin: 30px;
        width: 60%;
    }
    .li-item-logo-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
