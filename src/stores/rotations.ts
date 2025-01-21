import { ref, computed } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { randomInteger, randomizeArray } from "daily-prng";

export const useRotationsStore = defineStore("rotations", () => {
	const rotationsBySize: Ref<Record<number, number>> = ref({
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
	});

	const wheelOrder = randomizeArray([1, 2, 3, 4, 5, 6]);

	function getRandomizedWheelIndex(originalIndex: number): number {
		return wheelOrder[originalIndex];
	}

	turn(1, randomInteger(5, 120));
	turn(2, randomInteger(5, 120));
	turn(3, randomInteger(5, 120));
	turn(4, randomInteger(5, 120));
	turn(5, randomInteger(5, 120));
	turn(6, randomInteger(5, 120));

	function turn(size: number, value: number) {
		let directionReversed = false;

		for (let i = size; i > 0; i--) {
			const index = i === size ? i : getRandomizedWheelIndex(i);

			if (i !== size && index === size) {
				continue;
			}

			const valueDependingOnRadius = value / size;

			rotationsBySize.value = {
				...rotationsBySize.value,
				[index]:
					(rotationsBySize.value[index] +
						(directionReversed
							? -valueDependingOnRadius
							: valueDependingOnRadius)) %
					360,
			};

			directionReversed = !directionReversed;
		}
	}

	const win = computed(() => {
		return Object.values(rotationsBySize.value).every(
			(rotation) => Math.abs(rotation) <= 3 || Math.abs(rotation) >= 357,
		);
	});

	return { turn, rotationsBySize, win };
});
