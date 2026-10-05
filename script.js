/* =========================================
   DUCK RACE
========================================= */

const raceTrack = document.getElementById("raceTrack");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");

const editPanel = document.getElementById("editPanel");
const nameInput = document.getElementById("nameInput");

const timerDisplay = document.getElementById("timer");


/* =========================================
   DANH SÁCH VỊT
========================================= */

let duckNames = [
    "Nghĩa",
    "Đan Mạch",
    "Đại Bàng Đen",
    "Tốc Độ Sấm",
    "Hoàng Tử Vịt",
    "Siêu Vịt",
    "Vịt Xanh",
    "Vịt Lửa"
];


/* =========================================
   MÀU VỊT
========================================= */

const duckColors = [

    {
        color: "#f4d35e",
        dark: "#c79e20"
    },

    {
        color: "#ef5350",
        dark: "#b72c2c"
    },

    {
        color: "#42a5f5",
        dark: "#1976b9"
    },

    {
        color: "#66bb6a",
        dark: "#358b3c"
    },

    {
        color: "#ab68ff",
        dark: "#7438b8"
    },

    {
        color: "#ff9f43",
        dark: "#c76b16"
    },

    {
        color: "#26c6da",
        dark: "#128b99"
    },

    {
        color: "#ec407a",
        dark: "#a7194e"
    }
];


/* =========================================
   PHỤ KIỆN
========================================= */

const accessories = [

    "hat",
    "crown",
    "glasses",
    "bow",
    "",
    "hat",
    "crown",
    "glasses"
];


/* =========================================
   BIẾN GAME
========================================= */

let ducks = [];

let racing = false;

let animationFrame;

let startTime = 0;


/* =========================================
   TẠO MỘT CON VỊT
========================================= */

function createDuck(name, index) {

    const lane = document.createElement("div");

    lane.className = "lane";


    /* Con vịt */

    const duck = document.createElement("div");

    duck.className = "duck-runner";

    duck.dataset.index = index;


    /* Màu */

    const color =
        duckColors[index % duckColors.length];


    duck.style.setProperty(
        "--duck-color",
        color.color
    );

    duck.style.setProperty(
        "--duck-dark",
        color.dark
    );


    /* Thân */

    duck.innerHTML = `

        <div class="duck-body"></div>

        <div class="duck-head"></div>

        <div class="duck-beak"></div>

        <div class="duck-eye"></div>

        <div class="duck-wing"></div>

        <div class="leg left"></div>

        <div class="leg right"></div>

    `;


    /* Phụ kiện */

    const accessory =
        accessories[index % accessories.length];


    if (accessory !== "") {

        const item =
            document.createElement("div");

        item.className =
            "accessory " + accessory;

        duck.appendChild(item);
    }


    /* Tên */

    const nameTag =
        document.createElement("div");

    nameTag.className =
        "duck-name";

    nameTag.textContent = name;
    
    duck.appendChild(nameTag);
    /* Số */

    const rank =
        document.createElement("div");

    rank.className = "rank";

    rank.textContent = index + 1;


    lane.appendChild(rank);

    lane.appendChild(duck);
    raceTrack.appendChild(lane);


    return {
        element: duck,

        position: 10,

        speed: 0,

        finished: false,

        name: name
    };
}


/* =========================================
   TẠO TOÀN BỘ ĐƯỜNG ĐUA
========================================= */

function createRace() {

    raceTrack.innerHTML = "";

    ducks = [];

    duckNames.forEach((name, index) => {

        const duck =
            createDuck(name, index);

        ducks.push(duck);

    });

}


/* =========================================
   TÍNH VỊ TRÍ ĐÍCH
========================================= */

function getFinishPosition() {

    const trackWidth =
        raceTrack.parentElement.clientWidth;

    return trackWidth - 190;
}


/* =========================================
   BẮT ĐẦU ĐUA
========================================= */

function startRace() {

    if (racing) return;

    racing = true;

    startBtn.disabled = true;

    startBtn.textContent = "🏁 RACING...";


    /* tốc độ riêng */

    ducks.forEach((duck, index) => {

        duck.speed =
            0.7 +
            Math.random() * 1.7;

        duck.position = 10;

        duck.finished = false;

        duck.element.classList.add("running");

    });


    startTime = performance.now();

    animationFrame =
        requestAnimationFrame(updateRace);

}


/* =========================================
   CHẠY GAME
========================================= */

function updateRace(now) {

    if (!racing) return;


    /* đồng hồ */

    const elapsed =
        now - startTime;

    updateTimer(elapsed);


    const finish =
        getFinishPosition();


    let finishedCount = 0;


    ducks.forEach(duck => {

        if (duck.finished) {

            finishedCount++;

            return;

        }


        /*
          Tốc độ thay đổi nhẹ
          để cuộc đua tự nhiên hơn
        */

        const randomMove =
            Math.random() * 0.45;


        duck.position +=
            duck.speed + randomMove;


        /* không vượt đích */

        if (duck.position >= finish) {

            duck.position = finish;

            duck.finished = true;

            duck.element.classList.remove("running");

            finishedCount++;

        }


        duck.element.style.left =
            duck.position + "px";

    });


    /* tất cả đã về đích */

    if (finishedCount === ducks.length) {

        finishRace();

        return;

    }


    animationFrame =
        requestAnimationFrame(updateRace);
}


/* =========================================
   KẾT THÚC
========================================= */

function finishRace() {

    racing = false;

    cancelAnimationFrame(animationFrame);

    startBtn.disabled = false;

    startBtn.textContent = "🏁 START RACE!";

    ducks.forEach(duck => {

        duck.element.classList.remove("running");

    });

}


/* =========================================
   ĐỒNG HỒ
========================================= */

function updateTimer(milliseconds) {

    const totalSeconds =
        Math.floor(milliseconds / 1000);

    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    timerDisplay.textContent =

        String(hours).padStart(2, "0")
        + ":" +

        String(minutes).padStart(2, "0")
        + ":" +

        String(seconds).padStart(2, "0");
}


/* =========================================
   RESET
========================================= */

function resetRace() {

    racing = false;

    cancelAnimationFrame(animationFrame);

    startBtn.disabled = false;

    startBtn.textContent =
        "🏁 START RACE!";

    timerDisplay.textContent =
        "00:00:00";

    createRace();

}


/* =========================================
   EDIT LIST
========================================= */

editBtn.addEventListener(
    "click",
    () => {

        nameInput.value =
            duckNames.join("\n");

        editPanel.classList.remove("hidden");

    }
);


/* =========================================
   SAVE LIST
========================================= */

saveBtn.addEventListener(
    "click",
    () => {

        const names =
            nameInput.value
                .split("\n")
                .map(name => name.trim())
                .filter(name => name.length > 0);


        if (names.length === 0) {

            alert("Hãy nhập ít nhất 1 tên!");

            return;
        }


        duckNames = names;

        resetRace();

        editPanel.classList.add("hidden");

    }
);


/* =========================================
   CLOSE
========================================= */

closeBtn.addEventListener(
    "click",
    () => {

        editPanel.classList.add("hidden");

    }
);


/* =========================================
   NÚT START
========================================= */

startBtn.addEventListener(
    "click",
    startRace
);


/* =========================================
   NÚT RESET
========================================= */

resetBtn.addEventListener(
    "click",
    resetRace
);


/* =========================================
   KHỞI ĐỘNG GAME
========================================= */

createRace();
