<template>
  <div class="header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <router-link to="/">Full stack message board</router-link>
            <router-link to="/apa">Apa</router-link>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped>
    .navbar {
        height: 75px;
    }
    .navbar a {
        color: #FFF;
        font-size: 1.3rem;
        transition: all 200ms;
        padding: 1rem;
    }
    .navbar a:hover {
        color: #333;
        text-decoration: none;
    }
    .container {
        justify-content: flex-start;
    }
</style>