<script lang="ts" setup>
const change_theme = () => {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
		const newColorScheme = event.matches ? "dark" : "light";
		console.log(newColorScheme)
	});
}

</script>

<template>
	<header>
		<div class="container">
			<h1>Where in the world?</h1>
			
			<div @click="change_theme">
				<!--	    <ion-icon name="moon-outline"></ion-icon>-->
				<ion-icon name="moon"></ion-icon>
				Dark Mode
			</div>
		</div>
	</header>
	
	<main>
	
	</main>
</template>

<style scoped>
header {
	background: var(--dark-blue);
}
header .container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	line-height: 1.5;
	padding: 1.5rem;
}
header h1 {
	font-weight: 800;
}

@media (min-width: 1024px) {

}
</style>
