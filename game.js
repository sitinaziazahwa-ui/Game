function pemain(nama, energi) {
    return {
        nama,
        energi,

        makan(porsi) {
            this.energi += porsi;
            if (this.energi > 100) this.energi = 100;
            tampilkanLog(`${this.nama} makan! +${porsi} energi`);
        },

        serang(attack) {
            this.energi -= attack;
            if (this.energi < 0) this.energi = 0;
            tampilkanLog(`${this.nama} diserang! -${attack} energi`);
        }
    };
}

let pemain1 = pemain("Zar", 70);
let pemain2 = pemain("Iko", 85);

function updateUI() {
    document.getElementById("nama1").textContent = pemain1.nama;
    document.getElementById("energi1").textContent = pemain1.energi;
    document.getElementById("bar1").style.width = pemain1.energi + "%";

    document.getElementById("nama2").textContent = pemain2.nama;
    document.getElementById("energi2").textContent = pemain2.energi;
    document.getElementById("bar2").style.width = pemain2.energi + "%";
}

updateUI();

function tampilkanLog(text) {
    let logBox = document.getElementById("log");
    logBox.textContent = text;

    logBox.classList.add("log-animate");

    setTimeout(() => {
        logBox.classList.remove("log-animate");
    }, 300);
}

// FUNGSI PEMAIN 1
function p1Makan() {
    pemain1.makan(10);
    updateUI();
}

function p1Serang() {
    pemain1.serang(15);
    updateUI();
}

// FUNGSI PEMAIN 2
function p2Makan() {
    pemain2.makan(10);
    updateUI();
}

function p2Serang() {
    pemain2.serang(15);
    updateUI();
}
