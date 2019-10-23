<template>
    <div class="sidebar" id="sidebar">
        <h1>GarageApp</h1>
    </div>
</template>

<script>
</script>

<style lang="scss">

.sidebar {
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100%;
    max-width: 400px;
    min-width: 250px;
    z-index: 12;
    transition: .2s all;
    background: white;
    color: black;
}

.sidebar-active {
    left: 0;
}

</style>