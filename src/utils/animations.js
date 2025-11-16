export function addAnimation(animationNode) {
    animationNode.classList.add('toggle__mark--checked');
    animationNode.classList.add('scale-out-center');
    setTimeout(() => {
        animationNode.classList.remove('scale-out-center');
        animationNode.classList.add('scale-up-center');
        animationNode.classList.remove('toggle__mark--checked');
    }, 480)
    setTimeout(() => animationNode.classList.remove('scale-up-center'), 1000);
}