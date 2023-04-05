<script lang="ts" setup>
defineProps<{
	id: string
}>()
</script>
<template>
	<section class="container flex justify-between">
		<router-link class="shadow flex items-center back" to="/">
			<ion-icon name="arrow-back"></ion-icon>
			Back
		</router-link>
	</section>
	<section class="container flex items-start">
		<div class="flag w-50 ">
			<img class="w-100" src="https://flagcdn.com/bb.svg"/>
		</div>
		<div class="w-50 detail">
			<h1>
				NAme
			</h1>
			
			<div class="flex">
				<ul class="w-50">
					<li><strong>Population:</strong><span> </span></li>
					<li><strong>Region:</strong><span> </span></li>
					<li><strong>Capital:</strong><span> </span></li>
				</ul>
				
				<ul>
					<li><strong>Population:</strong><span></span></li>
					<li><strong>Region:</strong><span> </span></li>
					<li><strong>Capital:</strong><span>  </span></li>
				</ul>
			</div>
			
			<div class="flex items-center">
				<h2>Border Countries:</h2>
				<div class="border_buttons">
					<router-link class="shadow flex items-center back" to="/">
						BLC
					</router-link>
				</div>
			</div>
		</div>
	</section>

</template>
<style scoped>

.back {
	background: var(--color-element);
	padding: 10px 32px;
	font-size: .9rem;
	border: none;
	cursor: pointer;
	height: 100%;
	color: var(--color-text);
	border-radius: 7px;
}

button ion-icon {
	margin-right: 5px;
}

.detail {
	padding: 64px;
}

.detail ul {
	line-height: 2;
}

.detail h1 {
	margin-bottom: 64px;
}

.border_buttons {
	margin-left: 10px;
}

.border_buttons a {
	padding: 5px 16px;
}
</style>