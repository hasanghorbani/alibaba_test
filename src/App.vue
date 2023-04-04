<script setup lang="ts">
const change_theme = () => {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		const newColorScheme = event.matches ? "dark" : "light";
		console.log(newColorScheme)
	});
}

</script>

<template>
  <header>
   <h1>Where in the world?</h1>

    <div @click="change_theme">
<!--	    <ion-icon name="moon-outline"></ion-icon>-->
	    <ion-icon name="moon"></ion-icon>
	    Dark Mode
    </div>
  </header>

  <main>
  
  </main>
</template>

<style scoped>
header {
	display: flex;
	justify-content: space-between;
  line-height: 1.5;
	padding: 1rem;
}

@media (min-width: 1024px) {

}
</style>
