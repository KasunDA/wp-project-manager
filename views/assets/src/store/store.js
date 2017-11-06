export default new pm.Vuex.Store({
    // modules: {
    //     account: {
    //         namespaced: true,

    //         // module assets
    //         state: {
    //             is_account: 'i am account'
    //         }, // module state is already nested and not affected by namespace option
           
    //         mutations: {
    //             login () {  } // -> commit('account/login')
    //         },

    //         // nested modules
    //         modules: {
    //             // inherits the namespace from parent module
    //             myPage: {
    //                 namespaced: true,
    //                 state: {  
    //                     is_mypage: 'i am my page'
    //                 },

    //                 mutations: {
    //                     mypagelogin () { console.log('asdfhaskdjfa');  } // -> commit('account/login')
    //                 },

    //                 modules: {
    //                     myname: {
    //                         namespaced: true,
    //                         state: {
    //                             fuck: 'i am fuck'
    //                         },

    //                         mutations: {
    //                             ketumi() {
    //                                 console.log('amazidnfadsf');
    //                             }
    //                         }
    //                     }
    //                 }
                    
    //             },

    //             // further nest the namespace
    //             posts: {
    //                 namespaced: true,

    //                 state: {  
    //                     is_posts: 'i am posts'
    //                 },
                   
    //             },
    //         }
    //     }
    // },
    state: {
        projects: [],
        project: {},
        project_users: [],
        categories: [],
        roles: [],
        milestones: [],
        milestones_load: false,
        is_project_form_active: false,
        projects_meta: {},
        pagination: {},
        getIndex: function ( itemList, id, slug) {
            var index = false;

            itemList.forEach(function(item, key) {
                if (item[slug] == id) {
                    index = key;
                }
            });

            return index;
        },
        assignees: []
    },

    mutations: {
        setProjects (state, projects) {
            state.projects = projects.projects;
        },
        setProject (state, project) {
            state.projects.push(project);
        },

        setProjectUsers (state, users) {
            state.project_users = users;
        },
        setCategories (state, categories) {
            state.categories = categories;
        },
        setRoles (state, roles) {
            state.roles = roles;
        },
        newProject (state, projects) {
            var per_page = state.pagination.per_page,
                length   = state.projects.length;

            if (per_page <= length) {
                state.projects.splice(0,0,projects);
                state.projects.pop();
            } else {
                state.projects.splice(0,0,projects);
            }

            //update pagination
            state.pagination.total = state.pagination.total + 1;
            state.projects_meta.total_incomplete = state.projects_meta.total_incomplete + 1;
            state.pagination.total_pages = Math.ceil( state.pagination.total / state.pagination.per_page );
        },
        showHideProjectForm (state, status) {
            if ( status === 'toggle' ) {
                state.is_project_form_active = state.is_project_form_active ? false : true;
            } else {
                state.is_project_form_active = status;
            }
        },
        setProjectsMeta (state, data) {
            state.projects_meta = data;
            state.pagination = data.pagination;
        },

        afterDeleteProject (state, project_id) {
            var project_index = state.getIndex(state.projects, project_id, 'id');
            state.projects.splice(project_index,1);
        },

        updateProject (state, project) {
            var index = state.getIndex(state.projects, project.id, 'id');
            //console.log(state.projects[index]);
            // console.log(state.projects[index], project);

            //state.projects[index] = project;
            jQuery.extend(true, state.projects[index], project);
            //console.log(state.projects[index], project);
            // jQuery.each(state.projects[index], function(key, value) {
            //  //console.log(state.projects[index][key], project[key]);
            //  jQuery.extend(true, state.projects[index][key], project[key]);
            // });

            // //console.log(state.projects[index]);
        },

        showHideProjectDropDownAction (state, data) {
            var index = state.getIndex(state.projects, data.project_id, 'id');
            
            if (data.status === 'toggle') {
                state.projects[index].settings_hide = state.projects[index].settings_hide ? false : true;
            } else {
                state.projects[index].settings_hide = data.status;
            }
        },

        afterDeleteUserFromProject (state, data) {
            var index = state.getIndex(state.projects, data.project_id, 'id');
            var users = state.projects[index].assignees.data;
            var user_index = state.getIndex(users, data.user_id, 'id');

            state.projects[index].assignees.data.splice(user_index, 1);
        },

        updateSeletedUser (state, assignees) {
            state.assignees.push(assignees);
        },

        setSeletedUser(state, assignees) {
            state.assignees = assignees;
        },

        resetSelectedUsers (state) {
            state.assignees = [];
        },

        setMilestones(state, milestones){
            state.milestones = milestones;
            state.milestones_load = true;
        }
    }
    
});
