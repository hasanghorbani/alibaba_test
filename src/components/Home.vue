<script lang="ts" setup>


import {country} from "@/stores/country";
import {ref, watchEffect} from "vue";
import LazyList from 'lazy-load-list/vue'
import type {countyModel} from "@/stores/types";


const api = country()
const list = ref<Array<countyModel>>([])

const get_countries = () => {
	api.fetchAll().then((response: any) => {
		list.value = response
	})
}

watchEffect(get_countries)

</script>
<template>
	<section class="container flex items-stretch justify-between">
		<div class="input-group shadow flex items-center">
			<ion-icon name="search"></ion-icon>
			<input placeholder="Search for a country..." type="search"/>
		</div>
		
		
		<div class="dropdown">
			<button class="dropbtn shadow flex justify-between items-center">
				<span>Filter By Region</span>
				<ion-icon name="chevron-down"></ion-icon>
			</button>
			<div class="dropdown-content">
				<div class="items">
					<a>Africa</a>
					<a>America</a>
					<a>Asia</a>
					<a>Europe</a>
					<a>Oceania</a>
				</div>
			</div>
		</div>
	
	</section>
	<section class="container">
		
		<LazyList
				:data="list"
				:itemsPerRender="12"
				containerClasses="list"
				defaultLoadingColor="#222"
		>
			<template v-slot="{item}">
				<router-link :to="'/detail/'+item.name.common"><div class="item shadow">
					<div class="item-cover">
					<img :alt="item.flags.alt" :src="item.flags.svg"/>
					</div>
					<div class="detail">
						<h2>{{ item.name.common }}</h2>
						<ul>
							<li><strong>Population:</strong><span> {{ item.population }}</span></li>
							<li><strong>Region:</strong><span> {{ item.region }}</span></li>
							<li><strong>Capital:</strong><span> {{ item.capital[0] }}</span></li>
						</ul>
					</div>
				</div></router-link>
			</template>
		
		</LazyList>
	
	
	</section>
</template>
<style scoped>



/*Search Input*/
.input-group {
	padding: 10px 16px;
	background: var(--color-element);
	border-radius: 7px;
	width: 33%;
}

.input-group input {
	background: transparent;
	border: 0;
	padding: 14px;
	appearance: none;
	box-shadow: none;
	outline: none;
	color: var(--color-text);
	font-size: .9rem;
	width: 100%;
}


/*
DropDown
*/
.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown-content .items {
	background-color: var(--color-element);
	border-radius: 7px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
	padding: 12px 8px;
}

.dropdown-content {
	display: none;
	position: absolute;
	padding-top: 8px;
	min-width: 180px;
	z-index: 1;
	
}

.dropdown:hover .dropdown-content {
	display: block;
}

.dropdown-content a {
	color: var(--color-text);
	padding: 5px 16px;
	text-decoration: none;
	display: block;
	opacity: 0.7;
}

.dropdown-content a:hover {
	opacity: 1;
}

.dropbtn {
	background: var(--color-element);
	padding: 10px 16px;
	font-size: .9rem;
	border: none;
	cursor: pointer;
	height: 100%;
	color: var(--color-text);
	border-radius: 7px;
	width: 180px;
}

.dropbtn span {
	margin-right: 10px;
}


</style>