<script lang="ts" setup>
import {country} from "@/stores/country";
import {ref, watch, watchEffect} from "vue";
import type {countryModel} from "@/stores/types";
import {stringSimilarity} from "string-similarity-js";

const api = country()
const storeData = ref<Array<countryModel>>([])
const list = ref<Array<countryModel>>([])
const searchField = ref('');
const filter = ref('');
const sort = ref('Population');
const loading = ref(false)

const get_countries = () => {
	loading.value = true
	api.fetchAll().then((response: any) => {
		storeData.value = response
		list.value = response
		sortList()
		lazyLoadItems()
		loading.value = false
	}).catch(() => loading.value = false)
}
watchEffect(get_countries)


const search = () => {
	if (searchField.value === '') {
		list.value = storeData.value
	} else {
		list.value = storeData.value.filter(e => {
			if (stringSimilarity(e.name.common, searchField.value) > 0.6) {
				return e
			}
		})
	}
	filterRegion()
	sortList()
	updateList()
}
const sortList = () => {
	const sortBy = sort.value.toLowerCase();
	if (sortBy == 'name') {
		list.value.sort((a: any, b: any) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0))
	} else {
		list.value.sort((a: any, b: any) => (a[sortBy] > b[sortBy]) ? -1 : ((b[sortBy] > a[sortBy]) ? 1 : 0))
	}
	updateList()
}
const filterRegion = () => {
	if (filter.value === '') return
	list.value = list.value.filter(e => e.region === filter.value)
	updateList()
}

watch([() => searchField.value], search)
watch([() => filter.value], search)
watch([() => sort.value], sortList)


const page = ref<number>(0)
const loadingMore = ref(false)
const endItem = ref()
const items = ref<Array<any>>([])
const itemsToDisplay = ref<Array<any>>([])
const chunkArray = (arr: any, size: number) => Array.from({length: Math.ceil(arr.length / size)},
		(v, i) => arr.slice(i * size, i * size + size))

const updateList = () => {
	const chunckedArray = chunkArray(list.value, 20) // chunkArray(data,itemsPerRender) to get array of small arrays
	items.value = chunckedArray
	itemsToDisplay.value = chunckedArray[0]
}
const lazyLoadItems = () => {
	if (page.value === items.value.length - 1) return
	
	const element = endItem.value //this.endOfList;
	if (!element) return
	
	const position = element.getBoundingClientRect();
	
	// checking whether fully visible
	if ((position.top >= 0 && position.bottom <= window.innerHeight) && !loadingMore.value) {
		loadingMore.value = true
		page.value++
		setTimeout(() => {
			if (items.value[page.value])
				itemsToDisplay.value = [...itemsToDisplay.value, ...items.value[page.value]]
			loadingMore.value = false
			lazyLoadItems()
		}, 500);
	}
}

document.body.onscroll = () => {
	lazyLoadItems()
};
</script>
<template>
	<section id="head" class="container flex items-stretch justify-between">
		<div class="input-group shadow flex items-center">
			<ion-icon name="search"></ion-icon>
			<input v-model="searchField" placeholder="Search for a country..." type="search"/>
		</div>
		
		<div class="flex items-stretch">
			<div class="dropdown">
				<button class="dropbtn shadow flex justify-between items-center">
	      <span>Filter By <template v-if="filter">{{ filter }}</template>
	        <template v-else>Region</template></span>
					<ion-icon name="chevron-down"></ion-icon>
				</button>
				<div class="dropdown-content">
					<div class="items">
						<a @click="filter='Africa'">Africa</a>
						<a @click="filter='Americas'">Americas</a>
						<a @click="filter='Asia'">Asia</a>
						<a @click="filter='Europe'">Europe</a>
						<a @click="filter='Oceania'">Oceania</a>
					</div>
				</div>
			</div>
			<div class="dropdown">
				<button class="dropbtn shadow flex justify-between items-center">
					<span>Sort By {{ sort }} </span>
					<ion-icon name="chevron-down"></ion-icon>
				</button>
				<div class="dropdown-content">
					<div class="items">
						<a @click="sort='Population'">Population</a>
						<a @click="sort='Name'">Name</a>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section v-if="loading" class="container flex items-center justify-center">
		<ion-icon class="spin" name="sync" size="large"></ion-icon>
	</section>
	
	<section v-if="!loading && !list" class="container flex items-center justify-center">
		<p>No items found</p>
	</section>
	
	
	<section v-if="list" id="data" ref="test" class="container">
		
		<div class="list">
			<template v-for="item of itemsToDisplay">
				<router-link :to="'/detail/'+item.cca2">
					<div class="item shadow">
						<div class="item-cover">
							<img :alt="item.flags.alt" :src="item.flags.svg"/>
						</div>
						<div class="detail">
							<h2>{{ item.name.common }}</h2>
							<ul>
								<li><strong>Population:</strong><span> {{ item.population }}</span></li>
								<li><strong>Region:</strong><span> {{ item.region }}</span></li>
								<li><strong>Capital:</strong><span> {{ item.capital.join(', ') }}</span></li>
							</ul>
						</div>
					</div>
				</router-link>
			</template>
		</div>
		<section v-if="loadingMore" class="container flex items-center justify-center">
			<ion-icon class="spin" name="sync" size="large"></ion-icon>
		</section>
		<div v-show="((page !== itemsToDisplay?.length - 1) || !loadingMore)" ref="endItem" class="w-100"></div>
	
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
	margin: 0 5px;
	height: 64px;
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
	cursor: pointer;
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

@media only screen and (max-width: 580px) {
	#head {
		flex-direction: column;
	}
	
	.input-group {
		width: 100%;
	}
	
	.dropdown {
		margin: 16px 16px 0 0;
	}
	
	#data {
		padding: 0 32px;
	}
}
</style>