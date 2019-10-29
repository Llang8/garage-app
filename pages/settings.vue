<template>
    <div class="settings settings-content-wrapper">
        <h1 class="settings-page-title">Settings</h1>
        <div class="settings-item settings-edit">
            <p class="settings-title">Full Name</p>
            <p>Lucas Lang</p>
            <p>Edit</p>
        </div>
        <div class="settings-item settings-edit">
            <p class="settings-title">Username</p>
            <p>{{ username }}</p>
            <p @click="updateUsername()">Edit</p>
        </div>
        <div class="settings-item">
            <p style="text-align: center; width:100%;">Change Password</p>
        </div>
        <div class="settings-item" @click="signOut()">
            <p style="text-align: center; width:100%;">Sign Out</p>
        </div>
        <div class="settings-apply">
            <div class="settings-item">
                <p>Apply Changes</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    layout: 'settings',
    created() {
    },
    data() {
        return {
        }
    },
    methods: {
        signOut() {
            this.$store.dispatch('signOut').then(() => {
                location.reload()
            }).catch((e) => {
                alert(e.message);
            });
        },
        updateUsername() {
            
        }
    },
    computed: {
        username() {
            return this.$store.state.user.displayName;
        }
    }
}

</script>

<style>

</style>