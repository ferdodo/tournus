<script setup lang="ts">
import { useRotationsStore } from "@/stores/rotations";
import Disc from "./Disc.vue";

const store = useRotationsStore();
</script>

<template>
	<h1>Reconsituez le disque noir dans la parie supérieure de l'écran</h1>

	<div v-if="!store.win" class="disc-container">
		<Disc class="disc-6" :size="6" color="purple"/>
		<Disc class="disc-5" :size="5" color="yellow"/>
		<Disc class="disc-4" :size="4" color="orange"/>
		<Disc class="disc-3" :size="3" color="green"/>
		<Disc class="disc-2" :size="2" color="blue"/>
		<Disc class="disc-1" :size="1" color="red"/>
	</div>

	<div v-else>
		<h1>C'est gagné !</h1>
	</div>
</template>

<style scoped>
	.disc-container {
		display: grid;
		grid-template-columns: repeat(11, 1fr);
		grid-template-rows: repeat(11, 1fr); 
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		height: 100 vh;
		border: 1px solid yellow;
		width: 100vw;
	}

	.disc-6 {
		grid-area: 1 / 1 / 12 / 12;
	}

	.disc-5 {
		grid-area: 2 / 2 / 11 / 11;
	}

	.disc-4 {
		grid-area: 3 / 3 / 10 / 10;
	}

	.disc-3 {
		grid-area: 4 / 4 / 9 / 9;
	}

	.disc-2 {
		grid-area: 5 / 5 / 8 / 8;
	}

	.disc-1 {
		grid-area: 6 / 6 / 7 / 7; 
	}
</style>
