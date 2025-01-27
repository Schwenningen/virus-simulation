export interface AnimationState {
    prevX: number;
    prevY: number;
    targetX: number;
    targetY: number;
    lerpProgress: number;
    moveStep: number;
}