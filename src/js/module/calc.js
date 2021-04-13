import navigation from './navigation';

const calc = () => {

    // const infosss = document.querySelector(".info").children;
    const info = [] ;

    const form = document.querySelector(".calc-nt-b9234 form");
    const formContact = document.querySelector(".calc-nt-b9234 .form-contact");
    const preloader = document.querySelectorAll(".preloader");




    const width = document.querySelector(".calc-nt-width"),
        height = document.querySelector(".calc-nt-height"),
        motor = document.querySelectorAll(".calc-nt-motor"),
        door = document.querySelectorAll(".calc-nt-door"),
        garden = document.querySelectorAll(".calc-nt-garden"),
        photocell = document.querySelectorAll(".calc-nt-photocell"),
        city = document.querySelector(".calc-nt-city"),
        email = document.querySelector(".calc-nt-b9234 input[name=email]"),
        result = document.querySelector(".calc-nt-result"),
        submit = document.querySelector(".calc-nt-b9234 .submit"),
        priceResult = document.querySelectorAll(".calc-nt-b9234 .price-result span");



    let v1W, v1H, v1R,
        v2W, v2H, v2R,
        x, y;


    function isYes(inputValueArr) {
        for (let i = 0; i < inputValueArr.length; i++) {
            if (inputValueArr[i].type == 'radio' && inputValueArr[i].checked) {
                return i == 0 ? true : false;
            }
        }
    }


    function gateCalc() {
        v1W = Math.round(((width.value / 2) * 3) * 1000);
        v1H = Math.round((height.value - .1) * 1000);
        v1W = getSimilarPrice(v1W, wArr);
        v1H = getSimilarPrice(v1H, hArr);


        v2W = ((width.value / 2) * 3).toFixed(2);
        v2H = (height.value - .1).toFixed(2);

        v2R = Math.round(v2W * v2H * priceWHFormula);
        if (v2R < minPriceWelding) v2R = minPriceWelding;


        function getSimilarPrice(price, ArrayPrice) {
            let newPrice = ArrayPrice.find(numb => numb >= price);
            if (newPrice === undefined) newPrice = wArr[wArr.length - 1];

            return newPrice;
        }

        x = wArr.findIndex(x => x == v1W);
        y = hArr.findIndex(x => x == v1H);

        v1R = priceGrid[y][x];

        info[0] = `Ширина - ${v1W} Выстоа ${v1H} = ${v1R}`;
        info[1] = `Ширина - ${v2W} Выстоа ${v2H} (-0.1м)  = ${v2R}`;

    }

    function addMotor(bool) {
        if (bool) {
            let x = (Number.parseFloat(width.value) + 1) * priceCostGearRackFormula + priceMotor;
            v1R += x;
            v2R += x;

            // del
            info[0]+= ` автоматика + ${x}`;
            info[1]+= ` автоматика + ${x}`;
            // del

        }
    }

    function addDoor(bool) {
        if (bool) {
            v1R += priceDoor[y];
            v2R += priceWeldingGateFormula;

            // del
            info[0] += ` калитка  + ${priceDoor[y]}`;
            info[1] += ` калитка  + ${priceWeldingGateFormula}`;
            // del

        }
    }

    function addGarden(bool) {
        if (isYes(door)) {
            if (bool) {
                v1R += priceLockGate;
                v2R += priceLockGate;

                // del
                info[0] += ` Замок  + ${priceLockGate}`;
                info[1] += ` Замок  + ${priceLockGate}`;
                // del

            }
        }
    }

    function addPhotocell() {

        if (!photocell[2].checked) {
            if (photocell[0].checked || photocell[1].checked) {

                let x = 0;
                if (photocell[0].checked) x += priceLamp;
                if (photocell[1].checked) x += priceSensor;

                v1R += x;
                v2R += x;

                // del
                info[0] += ` лампа-сенор  + ${x}`;
                info[1] += ` лампа-сенор  + ${x}`;
                // del
            }

        }

    }

    function addRegulation() {
        v1R += priceRegulation;
        v2R += priceRegulation;

        info[0]+= ` регулировка  + ${priceRegulation}`;
        info[1]+= ` регулировка  + ${priceRegulation}`;

    }

    form.addEventListener('change', (e) => {
        gateCalc();
        addMotor(isYes(motor));
        addDoor(isYes(door));
        addGarden(isYes(garden));
        addPhotocell(photocell);
        addRegulation();

        priceResult[1].textContent = v1R;
        priceResult[0].textContent = v2R;

        // infosss[0].textContent = info[0];
        // infosss[1].textContent  = info[1];
    })


    function getInputs() {
        let str = " nt-nt ";
        str += "Цена комплекта ворот Свари сам - " + v2R + " nt-nt ";
        str += "Цена комплекта ворот Собери сам - " + v1R + " nt-nt " + " nt-nt ";


        str += info[0] + " nt-nt " + info[1] + " nt-nt " + " nt-nt ";
        const blocks = document.querySelectorAll('.calc-nt-b9234 .block');
        blocks.forEach(item => {
            const q = item.querySelector('.header');
            const input = item.querySelectorAll('input');
            if (q) {
                str += q.textContent + " ";
            }
            input.forEach((inp, indx) => {

                if (inp.getAttribute('type') == 'range') {
                    str += inp.value + " ";
                }
                if (inp.getAttribute('type') == 'checkbox') {
                    if (inp.checked) {
                        str += inp.parentNode.querySelector("label").textContent.replace(/\n+/g, '') + " ";
                    }
                }
                if (inp.checked) {
                    str += indx == 0 ? "Да" : "Нет" + " ";
                }
                if (inp.getAttribute('type') == 'text') {
                    str += inp.value + " ";
                }
            });
            str += " nt-nt ";
        });


        return str;
    }


    function send() {
        const s = document.querySelectorAll('.calc-nt-b9234 .block');


        const ajaxSend = async (formData) => {
            console.log(1);

            const fetchResp = await fetch('https://fjordreview.ru/mail/2/index.php', {
                method: 'POST',
                body: formData
            });
            if (!fetchResp.ok) {

                throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
            }
            return await fetchResp.text();
            console.log(3);

        };


        const formData = new FormData(this);
        formData.append("name", email.value);
        formData.append("email", getInputs());


        ajaxSend(formData)
            .then((response) => {
                s[s.length - 2].style.display = 'none';
                s[s.length - 1].style.display = 'block';

                console.log(response);
                form.reset(); // очищаем поля формы
            });
    }

    function submitForm() {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });

        submit.addEventListener('click', (e) => {
            let contactInput = formContact.querySelectorAll("input");
            let isSubmit = true;
            contactInput.forEach(item => {
                if (item.value <= 1) {
                    item.parentNode.classList.add("error");
                    setTimeout(() => {
                        item.parentNode.classList.remove("error");
                    }, 2000);
                    isSubmit = false;
                }
            });

            if (isSubmit) {
                preloader[0].classList.add("active");
                send();

                setTimeout(() => {
                    preloader[0].classList.remove("active");

                }, 5000);
            }
        });
    }

    submitForm();


}

export default calc;