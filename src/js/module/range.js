const range = () => {
    const allRanges = document.querySelectorAll(".calc-nt-b9234 .range-wrap");
    allRanges.forEach((wrap) => {
        const range = wrap.querySelector(".range");
        const noty = wrap.querySelector(".notifyVal");
        const notifyCount = wrap.querySelector(".notifyCount");
        const min = wrap.querySelector('.min');
        const max = wrap.querySelector('.max');

        min.textContent = range.getAttribute("min");
        max.textContent = range.getAttribute("max");

        range.addEventListener("input", () => {
            setBubble(range, noty);
            setBubble(range, notifyCount);
        });

        // setting bubble on DOM load
        setBubble(range, noty);
        setBubble(range, notifyCount);
    });

    function setBubble(range, bubble) {
        const val = range.value;

        const min = range.min || 0;
        const max = range.max || 100;

        const offset = Number(((val - min) * 100) / (max - min));
        // if ()
        console.log();
        if (bubble.classList.contains("notifyCount")) bubble.textContent = val;

        // yes, 14px is a magic number
        bubble.style.left = `calc(${offset}% - 14px)`;
    }
}
export default range;