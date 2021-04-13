const navigation = () => {
    const block = document.querySelectorAll(".calc-nt-b9234");
    block.forEach(wrap => {
        const blocks = wrap.querySelectorAll(".block"),
            loaded = wrap.querySelector(".loaded"),
            navigation = wrap.querySelector(".navigation"),
            btnPrev = wrap.querySelector("button.prev"),
            btnNext = wrap.querySelector("button.next"),
            garden = wrap.querySelectorAll(".calc-nt-garden"),
            city = wrap.querySelector(".calc-nt-city"),
            door = wrap.querySelectorAll(".calc-nt-door");
        const checks = wrap.querySelectorAll("input.calc-nt-photocell");
        let indexBlock = 1;


        progressBar();

        function progressBar() {
            loaded.style.width = indexBlock * 100 / blocks.length + "%";
        }

        changeCheck();

        function changeCheck() {
            function delCheck() {
                if (checks[0].checked || checks[1].checked) {
                    checks[2].checked = false;
                }
            }

            checks[0].addEventListener('click', (e) => {
                delCheck();
            });
            checks[1].addEventListener('click', (e) => {
                delCheck();
            });
            checks[2].addEventListener('click', (e) => {
                if (checks[2].checked) {
                    checks[1].checked = false;
                    checks[0].checked = false;
                }
            });
        }


        showBlock();

        function showBlock(n) {

            if (n > blocks.length) {
                indexBlock = blocks.length;
            }
            if (n < 1) {
                indexBlock = 1;
            }


            blocks.forEach(item => {
                item.style.display = 'none';
            });


            blocks[indexBlock - 1].style.display = 'block';
            progressBar();
        }


        function isImportant() {

            if (blocks[indexBlock - 1].classList.contains("important")) {
                let lock = false;
                let error = blocks[indexBlock - 1].querySelector(".error");

                let input = blocks[indexBlock - 1].querySelectorAll("input");

                input.forEach((item, index) => {
                    if (item.checked || item.value.length > 3) lock = true;
                });
                if (lock) {
                    blocks[indexBlock - 1].classList.remove("error");
                    return true;
                } else {
                    blocks[indexBlock - 1].classList.add("error");
                    return false;
                }

            } else {
                return true;
            }
        }

        function checkDoor(count, n) {
            let nextPage = false;
            if (indexBlock + count == blocks.length - 1) {
                btnNext.textContent = "Получить расчет";
            } else {
                btnNext.textContent = "Далее";
            }

            if (indexBlock + count == blocks.length) {
                if (city.value.length > 3) {
                    navigation.style.display = "none";
                    return false;

                }
            } else {
                navigation.style.display = "block";
            }

            if (indexBlock + count == 5) {
                console.log("asd");

                if (!door[0].checked) {
                    count = n * 2;
                    garden.forEach(item => {
                        item.checked = false;
                    })
                }
            }
            return count;
        }

        function nextBlock(n) {
            let count = n;
            count = checkDoor(count, n);
            if (n > 0) {
                if (isImportant()) {
                    showBlock(indexBlock += count);
                }
            } else {
                showBlock(indexBlock += count);
            }

        }

        btnPrev.addEventListener('click', () => {
            nextBlock(-1);

        });
        btnNext.addEventListener('click', () => {
            nextBlock(1);
        });


    });
}

export default navigation;


// const path = require("path");
//
// module.exports = {
//     mode: "production",
//     entry: "./src/index.js",
//     output: {
//         path: path.resolve(__dirname, "src/js/"),
//         filename: "bundle.js",
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.m?js$/,
//                 exclude: /(node_modules|bower_components)/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {
//                         presets: ['@babel/preset-env']
//                     }
//                 }
//             }
//         ]
//     }
// };

