export function listenToMoves(
	domElement: HTMLElement,
	callback: (moveData: {
		moveX: number;
		moveY: number;
		percentPosX: number;
		percentPosY: number;
	}) => void,
) {
	let startX: number | undefined;
	let startY: number | undefined;

	function startTracking(e: MouseEvent | TouchEvent) {
		startX = (e as MouseEvent).clientX ?? (e as TouchEvent).touches[0].clientX;
		startY = (e as MouseEvent).clientY ?? (e as TouchEvent).touches[0].clientY;

		document.addEventListener("mousemove", trackMovement);
		document.addEventListener("touchmove", trackMovement);

		document.addEventListener("mouseup", stopTracking);
		document.addEventListener("touchend", stopTracking);
	}

	function trackMovement(e: MouseEvent | TouchEvent) {
		e.preventDefault();

		const currentX =
			(e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
		const currentY =
			(e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;

		const rect = domElement.getBoundingClientRect();

		if (startX === undefined || startY === undefined) {
			return;
		}

		const moveData = {
			moveX: currentX - startX,
			moveY: currentY - startY,
			percentPosX: ((currentX - rect.left) / rect.width) * 100,
			percentPosY: ((currentY - rect.top) / rect.height) * 100,
		};

		callback(moveData);

		startX = currentX;
		startY = currentY;
	}

	function stopTracking() {
		document.removeEventListener("mousemove", trackMovement);
		document.removeEventListener("touchmove", trackMovement);
		document.removeEventListener("mouseup", stopTracking);
		document.removeEventListener("touchend", stopTracking);
	}

	domElement.addEventListener("mousedown", startTracking);
	domElement.addEventListener("touchstart", startTracking);

	return () => {
		domElement.removeEventListener("mousedown", startTracking);
		domElement.removeEventListener("touchstart", startTracking);
		stopTracking();
	};
}
