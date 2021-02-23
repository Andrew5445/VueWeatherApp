import axios from "axios";
import { Commit, Dispatch } from "vuex";

const state = {
    searchHistory: [{name:"Test"}]
}

const actions = {

    async getSearchHistory(
        { commit }: { commit: Commit }
    ) {

        const res = await axios.get(`http://localhost:8082/weather`);
        commit("SET_SEARCH_HISTORY", res.data);

    }

};

const mutations = {
    SET_SEARCH_HISTORY(s: any, p: any) {
        s.searchHistory = p;
    },
};

export default {
	namespaced: true,
	state,
	actions,
	//getters,
	mutations
} as const;