<template>
    <div class="login-layout">
        <h1>GarageApp</h1>
        <input v-model="email" type="text" placeholder="Email" @keyup.enter="login()">
        <input v-model="password" type="password" placeholder="Password" @keyup.enter="login()">
        <button @click="login()">Login</button>
        <p>Dont have an account? <nuxt-link to="/register">Register Here</nuxt-link></p>
        <p><a href="javascript:void(0)" @click="sendPasswordReset()">Forgot your password?</a></p>
    </div>
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            this.$store.dispatch('signInWithEmail', {
                email: this.email, 
                password: this.password
            }).then(() => {
                this.$router.push('/');
            }).catch((e) => {
                alert(e.message);
            });
        },
        sendPasswordReset() {
            let email = prompt('Please enter your email: ');
            this.$store.dispatch('sendPasswordReset', {
                email: email
            })
            .then(() => {
                alert('Password reset sent to: ' + email);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/root.scss";

.login-layout {
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