<template>
    <section class="member" id="member">
        <nav class="sub-nav" v-if="memberTabs.length>1">
            <a class="sub-nav-item" v-for="(item, index) in memberTabs" :class="{'is-active': curMemberTabs==index}" @click="toggleTabs(item, index)">{{item.title}}</a>
            <a class="fr btn" v-if="curMemberTabs == 0" @click="dialogVisible.show = true">邀请成员</a>
        </nav>
        <v-inviteMembers :visible.sync="dialogVisible" :model='"activityId"'></v-inviteMembers>
        <component :is="memberTabs[curMemberTabs].component" :cols="4" :class="{'border-box': memberTabs.length>1}"></component>
    </section>
</template>

<script>
import pendingMemberList from 'components/activity/unchecked_member.vue'
import auditedMemberList from 'components/activity/checked_member.vue'
import inviteMembers from 'components/project/inviteMembers.vue'

export default {
    name: 'activityMember',
    data() {
        return {
            memberTabs: [
                {
                    title: '待审',
                    component: 'v-pending-member-list',
                },
                {
                    title: '已审',
                    component: 'v-audited-member-list',
                }
            ],
            curMemberTabs: 0,
            dialogVisible: { show: false },
            personList: []
        }
    },
    components: {
        'v-pending-member-list': pendingMemberList,
        'v-audited-member-list': auditedMemberList,
        'v-inviteMembers': inviteMembers
    },
    methods: {
        // 切换已审待审成员列表
        toggleTabs(item, index) {
            this.curMemberTabs = index
        }
    }
}
</script>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.member{
    padding: 5px 15px 15px;
}
.sub-nav {
    background-color: #f6f6f6;
    font-size: 14px;
    border: 1px solid #c9c9c9;
    margin-bottom: -1px;

    .sub-nav-item {
        display: inline-block;
        line-height: 40px;
        padding: 0 1em;
        margin: 0 -1px -1px;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;

        &.is-active {
            border-color: #c9c9c9;
            background-color: #fff;
        }
    }
}
.border-box {
    border: 1px solid #c9c9c9;
}
.btn {
    margin-right: 15px;
    margin-top: 6px;
    font-size: 14px;
    color: $theme_color;
    padding:6px 8px;
    border: 1px solid $theme_color;
    border-radius: 5px;
    &:hover{
        color: #fff;
        background-color: $theme_color;
    }
}
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .sub-nav {
            .sub-nav-item {
                &.is-active {
                    color: $color-value;
                }
            }
        }
    }
}
</style>
