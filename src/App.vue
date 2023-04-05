<script lang="ts" setup>

import {onMounted, ref} from "vue";

export type UserTheme = 'light' | 'dark';

const setTheme = (theme: UserTheme) => {
	localStorage.setItem('user-theme', theme);
	userTheme.value = theme;
	document.documentElement.className = theme;
};

const getTheme = (): UserTheme => {
	return localStorage.getItem('user-theme') as UserTheme;
};

const toggleTheme = (): void => {
	const activeTheme = localStorage.getItem('user-theme');
	if (activeTheme === 'light') {
		setTheme('dark');
	} else {
		setTheme('light');
	}
};

const getMediaPreference = (): UserTheme => {
	const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
	if (hasDarkPreference) {
		return 'dark';
	} else {
		return 'light';
	}
};

const userTheme = ref<UserTheme>(getTheme() || getMediaPreference());

onMounted(() => setTheme(userTheme.value));

</script>

<template>
	<header class="shadow">
		<div class="container">
			<h1>Where in the world?</h1>
			
			<a class="pointer text-color" @click="toggleTheme">
				<ion-icon  v-if="userTheme==='dark'" name="moon"></ion-icon>
				<ion-icon  v-else name="moon-outline"></ion-icon>
				Dark Mode
			</a>
		</div>
	</header>
	
	<main>
		<router-view />
	</main>
</template>

<style scoped>
header {
	background: var(--color-element);
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
header a{
	font-size: .9rem;
	font-weight: 400;
}
@media (min-width: 1024px) {

}
</style>
