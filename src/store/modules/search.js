const state = {
	loading: false,
	data: [],
}

const mutations = {
	LOADING_ON: state => {
		state.loading = true
	},
	LOADING_OFF: state => {
		state.loading = false
	},
	GET_DATA: (state, response) => {
		state.data = response.data.items;
	},
}

const actions = {
	loadingOn({ commit }) {
		commit("LOADING_ON")
	},
	loadingOff({ commit }) {
		commit("LOADING_OFF")
	},
	getData({ commit }, { response }) {
		commit("GET_DATA", response)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
