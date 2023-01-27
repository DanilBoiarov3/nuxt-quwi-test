export const state = () => ({
    editProject: false
})

export const mutations = {
    handleEditProject(state) {
        state.editProject = !state.editProject;
    },
}

export const actions = {
    async actionModalEditProject({commit}) {
        commit('handleEditProject');
    }
}

export const getters = {
    editProjectModal: state => state.editProject
}
