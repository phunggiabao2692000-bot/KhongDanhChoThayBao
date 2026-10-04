/* =========================
   DANH SÁCH
========================= */

let names = [
    "Nghĩa",
    "Đan Mạch",
    "Đại Đăng Đen",
    "Tốc Độ Sấm",
    "Hoàng Tử Vịt",
    "Vịt Lửa",
    "Vịt Tím",
    "Vịt Xanh"
];


/* =========================
   THIẾT KẾ 8 CON VỊT
========================= */

const ducksDesign = [

    {
        body: "#ffd52f",
        head: "#ffe76a",
        accessory: "crown"
    },

    {
        body: "#e84444",
        head: "#ff7777",
        accessory: "helmet"
    },

    {
        body: "#2699ff",
        head: "#70c9ff",
        accessory: "glasses"
    },

    {
        body: "#28c75b",
        head: "#70e889",
        accessory: "scarf"
    },

    {
        body: "#a74cff",
        head: "#ce98ff",
        accessory: "hat"
    },

    {
        body: "#ff861f",
        head: "#ffb45c",
        accessory: "cowboy"
    },

    {
        body: "#ff4f9b",
        head: "#ff9bc7",
        accessory: "bow"
    },

    {
        body: "#16c6b1",
        head: "#70e5dc",
        accessory: "armor"
    }

];


/* =========================
   PHỤ KIỆN
========================= */

function getAccessory(type) {

    if (type === "crown") {

        return `
            <path
                d="M35 12 L37 2 L44 9 L50 2 L55 13 Z"
                fill="#FFD700"
                stroke="#222"
                stroke-width="2"
            />
        `;
    }


    if (type === "helmet") {

        return `
            <path
                d="M31 17
                   A14 14 0 0 1 58 17
                   L55 20
                   L32 20 Z"
                fill="#596b8a"
                stroke="#222"
                stroke-width="2"
            />

            <path
                d="M46 4 V15"
                stroke="#ffd700"
                stroke-width="3"
            />
        `;
    }


    if (type === "glasses") {

        return `
            <circle
                cx="43"
                cy="15"
                r="6"
                fill="#8be9ff"
                stroke="#222"
                stroke-width="2.5"
            />

            <circle
                cx="55"
                cy="15"
                r="5"
                fill="#8be9ff"
                stroke="#222"
                stroke-width="2.5"
            />

            <path
                d="M49 15 H50"
                stroke="#222"
                stroke-width="2"
            />
        `;
    }


    if (type === "scarf") {

        return `
            <path
                d="M30 26
                   Q44 33 57 25
                   L55 35
                   L45 37
                   L43 32
                   L34 34 Z"
                fill="#e63946"
                stroke="#222"
                stroke-width="2"
            />
        `;
    }


    if (type === "hat") {

        return `
            <path
                d="M34 12
                   L38 1
                   H51
                   L56 12 Z"
                fill="#442d70"
                stroke="#222"
                stroke-width="2"
            />

            <path
                d="M30 13 H60"
                stroke="#222"
                stroke-width="4"
            />
        `;
    }


    if (type === "cowboy") {

        return `
            <ellipse
                cx="45"
                cy="8"
                rx="20"
                ry="5"
                fill="#a15b2a"
                stroke="#222"
                stroke-width="2"
            />

            <path
                d="M37 9
                   L40 1
                   H50
                   L54 10 Z"
                fill="#a15b2a"
                stroke="#222"
                stroke-width="2"
            />
        `;
    }


    if (type === "bow") {

        return `
            <path
                d="M35 8
                   L25 2
                   L26 14
                   L35 10
                   L44 14
                   L45 2 Z"
                fill="#ff2e83"
                stroke="#222"
                stroke-width="2"
            />

            <circle
                cx="35"
                cy="8"
                r="3"
                fill="#ffd700"
            />
        `;
    }


    if (type === "armor") {

        return `
            <path
                d="M31 23
                   H57
                   V34
                   Q44 40 31 34 Z"
                fill="#aab4c2"
                stroke="#222"
                stroke-width="2"
            />

            <path
                d="M44 24 V35"
                stroke="#586575"
                stroke-width="3"
            />
        `;
    }

    return "";
}


/* =========================
   TẠO HÌNH CON VỊT
========================= */

function createDuckSVG(design) {

    return `

        <svg
            viewBox="0 0 70 55"
            width="70"
            height="55"
        >

            <!-- THÂN -->

            <ellipse
                cx="29"
                cy="32"
                rx="22"
                ry="12"
                fill="${design.body}"
                stroke="#222"
                stroke-width="3"
            />


            <!-- CÁNH -->

            <ellipse
                class="wing"
                cx="28"
                cy="31"
                rx="11"
                ry="7"
                fill="${design.head}"
                stroke="#222"
                stroke-width="2"
            />


            <!-- ĐẦU -->

            <circle
                cx="43"
                cy="18"
                r="13"
                fill="${design.head}"
                stroke="#222"
                stroke-width="3"
            />


            <!-- MẮT -->

            <circle
                cx="49"
                cy="14"
                r="4"
                fill="white"
            />

            <circle
                cx="50"
                cy="14"
                r="2"
                fill="#111"
            />


            <!-- MỎ
                 nằm bên PHẢI
                 => vịt quay về đích
            -->

            <path
                d="M55 17
                   L69 21
                   L55 25 Z"
                fill="#ff8b20"
                stroke="#222"
                stroke-width="2"
            />


            <!-- CHÂN -->

            <g
                class="legs"
                stroke="#e87518"
                stroke-width="3"
                stroke-linecap="round"
            >

                <path
                    class="leg"
                    d="M22 40 L19 48 L27 48"
                />

                <path
                    class="leg"
                    d="M34 40 L32 48 L40 48"
                />

            </g>


            <!-- PHỤ KIỆN -->

            ${getAccessory(design.accessory)}

        </svg>

    `;
}


/* =========================
   BIẾN GAME
========================= */

let ducks = [];

let running = false;

let animationFrame;

let startTime = 0;

let lastTime = 0;


/* =========================
   TẠO ĐƯỜNG ĐUA
========================= */

function createRace() {

    cancelAnimationFrame(animationFrame);

    running = false;

    ducks = [];

    const track =
        document.getElementById("raceTrack");


    /* Xóa đường đua cũ */

    track
        .querySelectorAll(".lane")
        .forEach(lane => lane.remove());


    /* Tạo từng làn */

    names.forEach((name, index) => {

        const lane =
            document.createElement("div");

        lane.className = "lane";


        /* Số */

        const number =
            document.createElement("div");

        number.className =
            "lane-number";

        number.textContent =
            index + 1;


        /* Tên */

        const nameBox =
            document.createElement("div");

        nameBox.className =
            "lane-name";

        nameBox.textContent =
            name;


        /* Vịt */

        const duck =
            document.createElement("div");

        duck.className =
            "duck";

        duck.innerHTML =
            createDuckSVG(
                ducksDesign[index %
                ducksDesign.length]
            );


        lane.appendChild(number);

        lane.appendChild(nameBox);

        lane.appendChild(duck);

        track.appendChild(lane);


        /* Thông tin vịt */

        ducks.push({

            element: duck,

            name: name,

            x: 200,

            speed:
                1.5 +
                Math.random() * 2.5

        });

    });


    updateDuckPositions();


    document.getElementById("timer")
        .textContent = "00:00:00";


    document.getElementById("status")
        .textContent =
        "Sẵn sàng xuất phát!";


    document.getElementById("startButton")
        .disabled = false;
}


/* =========================
   VỊ TRÍ BAN ĐẦU
========================= */

function updateDuckPositions() {

    ducks.forEach(duck => {

        duck.element.style.left =
            duck.x + "px";

    });

}


/* =========================
   BẮT ĐẦU
========================= */

function startRace() {

    if (running) return;

    running = true;

    startTime =
        performance.now();

    lastTime =
        startTime;


    ducks.forEach(duck => {

        duck.element
            .classList
            .add("running");

    });


    document.getElementById("status")
        .textContent =
        "🏃 Cuộc đua đang diễn ra!";


    document.getElementById("startButton")
        .disabled = true;


    animationFrame =
        requestAnimationFrame(
            raceLoop
        );
}


/* =========================
   VÒNG LẶP
========================= */

function raceLoop(now) {

    if (!running) return;


    const track =
        document.getElementById(
            "raceTrack"
        );


    const finishPosition =
        track.clientWidth * 0.93;


    const delta =
        Math.min(
            (now - lastTime) / 16.67,
            2
        );


    lastTime = now;


    /* Đồng hồ */

    const elapsed =
        Math.floor(
            (now - startTime) / 1000
        );


    const hours =
        Math.floor(
            elapsed / 3600
        );


    const minutes =
        Math.floor(
            (elapsed % 3600) / 60
        );


    const seconds =
        elapsed % 60;


    document.getElementById("timer")
        .textContent =

        String(hours).padStart(2, "0")
        + ":" +

        String(minutes).padStart(2, "0")
        + ":" +

        String(seconds).padStart(2, "0");


    /* Cho vịt chạy */

    for (const duck of ducks) {

        duck.speed +=
            (Math.random() - 0.5)
            * 0.3;


        duck.speed =
            Math.max(
                1,
                Math.min(
                    5,
                    duck.speed
                )
            );


        duck.x +=
            duck.speed * delta;


        duck.element.style.left =
            duck.x + "px";


        /* Có vịt về đích */

        if (
            duck.x + 65
            >= finishPosition
        ) {

            finishRace(duck);

            return;
        }
    }


    animationFrame =
        requestAnimationFrame(
            raceLoop
        );
}


/* =========================
   KẾT THÚC
========================= */

function finishRace(winner) {

    running = false;

    cancelAnimationFrame(
        animationFrame
    );


    ducks.forEach(duck => {

        duck.element
            .classList
            .remove("running");

    });


    document.getElementById("status")
        .textContent =
        "🏆 Cuộc đua kết thúc!";


    document.getElementById("winnerName")
        .textContent =
        winner.name;


    document.getElementById(
        "winnerPopup"
    ).style.display = "flex";
}


/* =========================
   RESET
========================= */

function resetRace() {

    createRace();

}


/* =========================
   EDIT LIST
========================= */

function openEditor() {

    if (running) return;


    document.getElementById(
        "nameInput"
    ).value =
        names.join("\n");


    document.getElementById(
        "editor"
    ).style.display =
        "flex";
}


function closeEditor() {

    document.getElementById(
        "editor"
    ).style.display =
        "none";
}


function saveNames() {

    names =
        document.getElementById(
            "nameInput"
        ).value
        .split("\n")
        .map(name => name.trim())
        .filter(name => name !== "");


    if (names.length === 0) {

        names = [
            "Nghĩa",
            "Đan Mạch"
        ];
    }


    closeEditor();

    createRace();
}


/* =========================
   ĐÓNG KẾT QUẢ
========================= */

function closeWinner() {

    document.getElementById(
        "winnerPopup"
    ).style.display =
        "none";

    resetRace();
}


/* =========================
   NÚT
========================= */

document.getElementById(
    "startButton"
).addEventListener(
    "click",
    startRace
);


document.getElementById(
    "resetButton"
).addEventListener(
    "click",
    resetRace
);


document.getElementById(
    "editButton"
).addEventListener(
    "click",
    openEditor
);


document.getElementById(
    "saveNames"
).addEventListener(
    "click",
    saveNames
);


document.getElementById(
    "closeEditor"
).addEventListener(
    "click",
    closeEditor
);


document.getElementById(
    "closeWinner"
).addEventListener(
    "click",
    closeWinner
);


/* =========================
   CHẠY GAME
========================= */

createRace();
