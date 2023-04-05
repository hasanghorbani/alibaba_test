<script setup lang="ts">
defineProps<{
	id: string
}>()
</script>
<template>
	<section class="container flex justify-between">
		<router-link to="/" class="shadow flex items-center back">
			<ion-icon name="arrow-back"></ion-icon>
			Back
		</router-link>
	</section>
	<section class="container flex ">
		<div class="flag">
			<img src=""/>
		</div>
		<div>
			<h1>
				NAme
			</h1>
			
			<div>
				<ul class="w-50">
					<li></li>
				</ul>
				
				<ul  class="w-50">
					<li></li>
				</ul>
			</div>
		</div>
	</section>
	
</template>
<style scoped>

.back{
	background: var(--color-element);
	padding: 10px 32px;
	font-size: .9rem;
	border: none;
	cursor: pointer;
	height: 100%;
	color: var(--color-text);
	border-radius: 7px;
}
button ion-icon{
	margin-right: 5px;
}


</style>