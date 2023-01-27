export const state = () => ({
    projects: [],
    project: null,
})

export const mutations = {
    setProjects(state, projects) {
        state.projects = projects;
    },

    setProject(state, project) {
        state.project = project;
    },

    editProject(state, {id, ...rest}) {
        const updateItemId = state.projects.findIndex(
            project => project.id === id
        );
        const item = {...state.projects[updateItemId], ...rest};
        state.projects = [
            ...state.projects.slice(0, updateItemId),
            item,
            ...state.projects.slice(updateItemId + 1)
        ];
    }
}

export const actions = {
    async editProject({commit}, {id, name}) {
        const {data: {
            project = null
        }}  = await this.$axios.post(
            `${process.env.BASE_URL}/projects-manage/update?id=${id}`,
            {name}
        );

        commit('editProject', project);
    },

    async setEditableProject({commit}, {project}) {
        commit('setProject', project);
    },

    async getProjects({commit}) {
        const {data: {
            projects = []
        }} = await this.$axios.get(`${process.env.BASE_URL}/projects-manage/index`);

        commit('setProjects', projects);
    }
}

export const getters = {
    projects: state => state.projects,
    project: state => state.project,
    projectName: state => state.project?.name ?? ''
}
