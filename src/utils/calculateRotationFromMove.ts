export function calculateRotationFromMove({
	moveX,
	moveY,
	percentPosX,
	percentPosY,
}: { moveX: number; moveY: number; percentPosX: number; percentPosY: number }) {
	const isLeft = percentPosX < 50;
	const isTop = percentPosY < 50;
	return (isTop ? moveX : -moveX) + (isLeft ? -moveY : moveY);
}
