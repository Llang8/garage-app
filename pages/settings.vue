<template>
    <div class="settings settings-content-wrapper">
        <h1 class="settings-page-title">Settings</h1>
        <div class="settings-item settings-edit">
            <p class="settings-title">Username</p>
            <p>{{ username }}</p>
            <p @click="updateUsername()">Edit</p>
        </div>
        <div class="settings-item" @click="changePassword()">
            <p style="text-align: center; width:100%;">Change Password</p>
        </div>
        <div class="settings-item" @click="signOut()">
            <p style="text-align: center; width:100%;">Sign Out</p>
        </div>
        <div class="settings-apply">
            <div class="settings-item" @click="updateSettings()">
                <p>Apply Changes</p>
            </div>
        </div>
        <div class="settings-categories_modal" v-if="showUsernameEditor">
            <div class="close-button" @click="showUsernameEditor = false">X</div>
            <h2>Select Categories:</h2>
            <input type="text" name="Username" v-model="newUsername" id="username" :placeholder="username">
        </div>
    </div>
</template>

<script>

export default {
    layout: 'settings',
    data() {
        return {
            showUsernameEditor: false,
            newUsername: null
        }
    },
    methods: {
        signOut() {
            this.$store.dispatch('signOut').then(() => {
                location.href = "/"
            }).catch((e) => {
                alert(e.message);
            });
        },
        updateUsername() {
            this.showUsernameEditor = true;
        },
        changePassword() {
            let email = this.$store.state.user.email;
            this.$store.dispatch('sendPasswordReset', {
                email: email
            })
            .then(() => {
                alert('Password reset sent to: ' + email);
            })
        }
    },
    computed: {
        username() {
            if (this.newUsername) {
                return this.newUsername;
            } else {
                return this.$store.state.user.displayName;
            }
        }
    }
}

</script>

<style>

</style>