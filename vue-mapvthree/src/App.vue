<template>
    <header>MapV Three 三维可视化（VUE）</header>
    <MapScene />
</template>

<script>
import MapScene from './components/MapScene.vue';

export default {
    name: 'App',
    components: {
        MapScene
    }
};
</script>

<style>
header {
    background-color: #282c34;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: #fff;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
