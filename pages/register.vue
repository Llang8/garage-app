<template>
    <div class="register-layout">
        <h1>GarageApp</h1>
        <input v-model="email" type="text" placeholder="Email">
        <input v-model="username" type="text" placeholder="Username">
        <input v-model="password" type="password" placeholder="Password">
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password">
        <button @click="register()">Register</button>
        <p>Already have an account? <nuxt-link to="/login">Login</nuxt-link></p>
    </div>
</template>

<script>

export default {
    layout: 'login',
    data() {
        return {
            username: null,
            password: null,
            confirmPassword: null,
            email: null
        }
    },
    methods: {
        register() {
            if(this.password === this.confirmPassword && this.username && this.email) {
                this.$store.dispatch('signUpWithEmail', {
                    username: this.username, 
                    email: this.email,
                    password: this.password
                }).then(() => {
                    this.$router.push('/');
                }).catch((e) => {
                    alert(e);
                });
            } else {
                alert("Something went wrong, please check your passwords and try again");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.register-layout {
    position: absolute;
    width: 100vw;
    min-height: 100vh;
    background: $main-blue;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Red Hat Text', sans-serif;

    h1 {
        color: white;
        margin-bottom: 25px;
    }

    input {
        height: 30px;
        border: 0;
        border-radius: 30px;
        width: 80%;
        max-width: 250px;
        min-width: 200px;
        margin-bottom: 15px;
        padding: 15px;
        font-weight: 600;
        color: $blue-text;
    }

    button {
        height: 30px;
        border: 0;
        border-radius: 30px;
        width: 40%;
        max-width: 100px;
        min-width: 50px;
        font-weight: 600;
        background-color: white;
        color: $blue-text;
    }

    p {
        color: white;
        margin-top: 20px;
        
        a {
            color: white;
        }
    }
}
</style>