<script lang="ts" setup>
import {useRoute} from "vue-router";
import {country} from "@/stores/country";
import {ref, watch} from "vue";
import {countryModel} from "@/stores/types";

const route = useRoute()
const api = country()
const detail = ref<countryModel>()


const get_country = () => {
  console.log(route.params.id)
  api.fetchOne(route.params.id as string).then((response: any) => {
    console.log('sssssss')
    detail.value = response
  })
}
get_country()



</script>
<template>
  <section class="container flex justify-between">
    <router-link class="shadow flex items-center back" to="/">
      <ion-icon name="arrow-back"></ion-icon>
      Back
    </router-link>
  </section>
  <section v-if="detail" class="container flex items-start">
    <div class="flag w-50 ">
      <img :alt="detail.flags.alt" :src="detail.flags.svg" class="w-100"/>
    </div>
    <div class="w-50 detail">
      <h1>
        {{ detail.name.common }}
      </h1>

      <div class="flex justify-between">
        <ul>
          <li><strong>Native name:</strong>

            <span v-for="(item, index) in detail.name.nativeName" :key="index">
            {{ item.common }}
          </span>
          </li>
          <li><strong>Population:</strong><span> {{ detail.population }}</span></li>
          <li><strong>Region:</strong><span> {{ detail.region }}</span></li>
          <li><strong>Sub Region:</strong><span> {{ detail.subregion }}</span></li>
          <li><strong>Capital:</strong><span> {{ detail.capital.join(', ') }}</span></li>
        </ul>

        <ul>
          <li><strong>Top Level Domain:</strong><span> {{ detail.tld.join(', ') }}</span></li>
          <li><strong>Currencies:</strong>
            <span v-for="(item, index) in detail.currencies" :key="index">
            {{ item.name }} <template v-if="index != (detail.currencies.length - 1)">,</template>
          </span>
          </li>
          <li><strong>Languages:</strong> <span v-for="(item, index) in detail.languages" :key="index">
            {{ item }} <template v-if="index != (detail.languages.length - 1)">,</template>
          </span></li>
        </ul>
      </div>

      <div class="flex items-center mt-4 flex-warp">
        <h2 class="flex-fill">Border Countries:</h2>
        <div class="border_buttons">
          <template v-for="item in detail.borders">
            <router-link :to="'/detail/'+item" class="shadow flex items-center back">
              {{ item }}
            </router-link>
          </template>
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

.detail li strong {
  padding-right: 5px;
}

.border_buttons {
  margin-left: 10px;
  margin-top: 7px;
  display: flex;
  align-items: center;

}

.border_buttons a {
  padding: 5px 16px;
  margin-right: 7px;
}

.mt-4 {
  margin-top: 4rem;
}
</style>