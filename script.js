
function init() {
    levels.forEach(element => {
        const option = document.createElement("option");
        option.text = element;
        option.value = element;
        list_level.appendChild(option);
    });

    Object.keys(modes).forEach(key => {
        const option = document.createElement("option");
        option.text = key;
        option.value = key;
        list_mode.appendChild(option);
    });

    draw_numbers();
}

function onListLevelChange() {
    settings.level = list_level.options[list_level.selectedIndex].value;
    draw_numbers();
}

function onListModeChange() {
    settings.mode = modes[list_mode.options[list_mode.selectedIndex].value];
    draw_numbers();
}



function getRandomInt(min, max) {
    return new Decimal(Decimal.floor(Decimal.random() * (max - min + 1) + min));
}

function getRandomFloat(min, max, precision) {
    return new Decimal((Decimal.random() * (max - min) + min).toFixed(precision));
}



function draw_numbers() {
    if (settings.mode == modes.addition) {
        if (settings.level == levels[0]) {
            settings.number_one = getRandomInt(2, 100);
            settings.number_two = getRandomInt(2, 100);
        }
        else if (settings.level == levels[1]) {
            settings.number_one = getRandomInt(20, 1000);
            settings.number_two = getRandomInt(20, 1000);
        }

        else if (settings.level == levels[2]) {
            settings.number_one = getRandomFloat(0, 10, 2);
            settings.number_two = getRandomFloat(0, 10, 2);
        }
        settings.result = settings.number_one.plus(settings.number_two);
    }
    else if (settings.mode == modes.substraction) {
        if (settings.level == levels[0]) {
            settings.number_one = getRandomInt(2, 100);
            settings.number_two = getRandomInt(2, 100);
        }
        else if (settings.level == levels[1]) {
            settings.number_one = getRandomInt(20, 1000);
            settings.number_two = getRandomInt(20, 1000);
        }
        else if (settings.level == levels[2]) {
            settings.number_one = getRandomFloat(0, 10, 2);
            settings.number_two = getRandomFloat(0, 10, 2);
        }
        settings.result = settings.number_one.minus(settings.number_two);
    }
    else if (settings.mode == modes.multiplication) {
        if (settings.level == levels[0]) {
            settings.number_one = getRandomInt(2, 100);
            settings.number_two = getRandomInt(2, 10);
        }
        else if (settings.level == levels[1]) {
            settings.number_one = getRandomInt(2, 100);
            settings.number_two = getRandomFloat(0, 10, 2);
        }
        else if (settings.level == levels[2]) {
            settings.number_one = getRandomFloat(0, 10, 2);
            settings.number_two = getRandomFloat(0, 10, 2);
        }
        settings.result = settings.number_one.times(settings.number_two);
    }
    else if (settings.mode == modes.division) {
        if (settings.level == levels[0]) {
            settings.number_one = getRandomInt(2, 100);
            settings.number_two = getRandomInt(2, 100);
        }
        else if (settings.level == levels[1]) {
            settings.number_one = getRandomInt(20, 1000);
            settings.number_two = getRandomInt(2, 100);
        }
        else if (settings.level == levels[2]) {
            settings.number_one = getRandomInt(20, 100);
            settings.number_two = getRandomFloat(0, 10, 2);
        }
        settings.result = settings.number_one.dividedBy(settings.number_two);
    }

    operation.textContent = `${settings.number_one} ${settings.mode[1]} ${settings.number_two} = ...`;
}

function check_result() {
    const node = document.createElement("div");
    if (settings.result == input_number.value) {
        // list_results.innerHTML += `<div class="list_item god">${settings.number_one} ${settings.mode[1]} ${settings.number_two} = ${input_number.value}</div>`;
        node.innerText = `${settings.number_one} ${settings.mode[1]} ${settings.number_two} = ${input_number.value}`;
        node.setAttribute('class', 'list_item good')
    }
    else {
        // list_results.innerHTML += `<div class="list_item bad">${settings.number_one} ${settings.mode[1]} ${settings.number_two} = ${input_number.value} (${settings.result})</div>`;
        node.innerText = `${settings.number_one} ${settings.mode[1]} ${settings.number_two} = ${input_number.value} (${settings.result})`;
        node.setAttribute('class', 'list_item bad')
    }
    list_results.append(node);
    list_results.scrollTop = list_results.scrollHeight;
    draw_numbers();
}





const modes = {
    'addition': ['addition', '+'],
    'substraction': ['substraction', '-'],
    'multiplication': ['multiplication', '*'],
    'division': ['division', '/']
}

const levels = ['level 1', 'level 2', 'level 3']

const settings = {
    'number_one': new Decimal(0),
    'number_two': new Decimal(0),
    'result': new Decimal(0),
    'mode': modes.addition,
    'level': levels[0]
}




const list_mode = document.getElementById("list_mode");
const list_level = document.getElementById("list_level");

const btn_check_number = document.getElementById('btn_check_number');
btn_check_number.addEventListener('click', check_result);

const input_number = document.getElementById('input_number');
input_number.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        check_result();
        input_number.value = '';
    }
});

const operation = document.getElementById('operation');
const list_results = document.getElementById('list_results');



init();