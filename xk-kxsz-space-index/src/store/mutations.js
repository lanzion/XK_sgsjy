export default {

    //教育局空间项目
    ["SETFIELDID"](state, fieldId) {
        state.eduProject.fieldId = fieldId
    },
    ["SETTECHNOLOGYID"](state, Id) {
        state.eduProject.technologyId = Id
    },
    ["SETAPPLYSCOPEID"](state, Id) {
        state.eduProject.applyScopeId = Id
    },
}
