<script setup lang="ts">
import { defineProps, computed, onMounted, useTemplateRef } from "vue";
import { useRotationsStore } from "../stores/rotations";
import { listenToMoves } from "../utils/listenToMoves";
import { calculateRotationFromMove } from "../utils/calculateRotationFromMove";

const store = useRotationsStore();
const discDom = useTemplateRef("discDom");

const props = defineProps<{
	size: number;
	color: string;
}>();

const createGradient = computed(() => {
	return `linear-gradient(${store.rotationsBySize[props.size]}deg, ${props.color} 49%, black 49%)`;
});

onMounted(() => {
	if (discDom.value) {
		listenToMoves(discDom.value, (move) => {
			const rotationValue = calculateRotationFromMove(move);
			store.turn(props.size, rotationValue);
		});
	}
});
</script>

<template>
	<div ref="discDom" class="disc" :style="{'background': createGradient }"></div>
</template>

<style scoped>
	.disc {
		width: 100%;
		border-radius: 50%;
		box-shadow: 0 0 10px 0 var(--color);
		border: 1px solid black;
		aspect-ratio: 1/1;
		transition: linear-gradient 3s;
	}
</style>
