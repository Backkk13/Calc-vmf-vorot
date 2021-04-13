const navigation = () => {
    const block = document.querySelectorAll(".calc-nt-b9234");
    block.forEach(wrap => {
        const blocks = wrap.querySelectorAll(".block"),
            loaded = wrap.querySelector(".loading"),
            navigation = wrap.querySelector(".btn-block"),
            btnNext = wrap.querySelector(".calc-nt-b9234 .btn-block button.btnNext"),
            btnPrev = wrap.querySelector(".calc-nt-b9234 .btn-block button.btnPrev"),
            garden = wrap.querySelectorAll(".calc-nt-garden"),
            city = wrap.querySelector(".calc-nt-city"),
            door = wrap.querySelectorAll(".calc-nt-door");
        const checks = wrap.querySelectorAll("input.calc-nt-photocell");
        let indexBlock = 1;

        console.log(btnNext)


        progressBar();

        function progressBar() {
            if (indexBlock==1){
                loaded.style.width = 0 + "%";
            }else{
                loaded.style.width = (indexBlock-1) * 100 / (blocks.length - 2) + "%";
            }
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


            blocks.forEach((item, i) => {
                item.style.display = 'none';
                item.setAttribute('data-page', i + 1);
            });


            blocks[indexBlock - 1].style.display = 'block';
            progressBar();
        }

        function addErrorClass(selector, className) {
            selector.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add(className);
                    setTimeout(() => {
                        item.classList.remove(className);
                    }, 2000);
                }, 100 * i);
            })
        }

        function isCheck() {

            let boolChek = false;
            let inputs = blocks[indexBlock - 1].querySelectorAll('input');
            inputs.forEach(item => {
                if (item.checked || item.value.length > 2) {
                    boolChek = true;
                }
            })
            return boolChek;

        }

        function nextBlock(n) {
            //door skip nex page
            let dr = blocks[4].querySelectorAll("input");
            if (!dr[0].checked) {
                if (indexBlock + n - 1 < blocks.length) {
                    if (blocks[indexBlock + n - 1].getAttribute('data-page') == 6) {
                        n = n * 2;
                    }
                }
            }
            //door end


            if (blocks[indexBlock - 1].classList.contains('important')) {
                if (n > 0) {
                    if (isCheck()) {
                        showBlock(indexBlock += n);
                    } else {
                        if (blocks[indexBlock - 1].querySelector('input[type=text]')){
                            addErrorClass(blocks[indexBlock - 1].querySelectorAll('.user-box'), 'error');

                        } else {
                            addErrorClass(blocks[indexBlock - 1].querySelectorAll('label'), 'hvr-bounce-out');
                        }
                    }
                } else {
                    showBlock(indexBlock += n);
                }
            } else {
                showBlock(indexBlock += n);


            }

            if (indexBlock == blocks.length - 2) {
                btnNext.textContent = "Получить расчет";
            } else {
                btnNext.textContent = "Далее";

            }

            if (indexBlock == blocks.length - 1) {
                navigation.style.display = "none";
            } else {
                navigation.style.display = "block"
            }
            if (indexBlock<3){
                btnPrev.style.display = 'none';
            }else{
                btnPrev.style.display = 'block';

            }

        }

        function lastBlock() {
            nextBlock(1);

        }




        btnNext.addEventListener('click', () => {
            nextBlock(1);
        });

        btnPrev.addEventListener('click', () => {
            nextBlock(-1);
        });


    });
}
export default navigation;