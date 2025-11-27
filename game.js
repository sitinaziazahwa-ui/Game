function pemain(nama, energi) {
    return {
        nama,
        energi,
        inventori: {
            senjata: [],
            makanan: []
        },

        tambahItem(tipe, item) {
            if (tipe === 'senjata') {
                this.inventori.senjata.push(item);
            } else if (tipe === 'makanan') {
                this.inventori.makanan.push(item);
            }
        },

        gunakanMakanan(index) {
            if (index >= 0 && index < this.inventori.makanan.length) {
                const makanan = this.inventori.makanan[index];
                this.energi += makanan.heal;
                if (this.energi > 100) this.energi = 100;
                this.inventori.makanan.splice(index, 1);
                tampilkanLog(`${this.nama} menggunakan ${makanan.nama}! +${makanan.heal} energi`);
                return true;
            }
            return false;
        },

        gunakanSenjata(index, target) {
            if (index >= 0 && index < this.inventori.senjata.length) {
                const senjata = this.inventori.senjata[index];
                target.energi -= senjata.damage;
                if (target.energi < 0) target.energi = 0;
                this.inventori.senjata.splice(index, 1);
                tampilkanLog(`${this.nama} menggunakan ${senjata.nama} pada ${target.nama}! -${senjata.damage} energi`);
                return true;
            }
            return false;
        },

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

// Inisialisasi inventori pemain 1
pemain1.tambahItem('senjata', { nama: 'Pedang Besi', damage: 20, emoji: '⚔️' });
pemain1.tambahItem('senjata', { nama: 'Tombak', damage: 25, emoji: '🔱' });
pemain1.tambahItem('makanan', { nama: 'Roti Ajaib', heal: 15, emoji: '🍞' });
pemain1.tambahItem('makanan', { nama: 'Elixir', heal: 30, emoji: '🧪' });
pemain1.tambahItem('makanan', { nama: 'Apel Emas', heal: 20, emoji: '🍎' });

// Inisialisasi inventori pemain 2
pemain2.tambahItem('senjata', { nama: 'Pedang Api', damage: 22, emoji: '🔥' });
pemain2.tambahItem('senjata', { nama: 'Panah', damage: 18, emoji: '🏹' });
pemain2.tambahItem('makanan', { nama: 'Daging', heal: 18, emoji: '🍖' });
pemain2.tambahItem('makanan', { nama: 'Potion', heal: 25, emoji: '🧃' });
pemain2.tambahItem('makanan', { nama: 'Madu', heal: 12, emoji: '🍯' });

function updateUI() {
    // Update Pemain 1
    document.getElementById("nama1").textContent = pemain1.nama;
    document.getElementById("energi1").textContent = pemain1.energi;
    document.getElementById("bar1").style.width = pemain1.energi + "%";
    updateInventoriUI(1, pemain1);

    // Update Pemain 2
    document.getElementById("nama2").textContent = pemain2.nama;
    document.getElementById("energi2").textContent = pemain2.energi;
    document.getElementById("bar2").style.width = pemain2.energi + "%";
    updateInventoriUI(2, pemain2);
}

function updateInventoriUI(playerNum, player) {
    const inventoriContainer = document.getElementById(`inventori${playerNum}`);
    if (!inventoriContainer) return;

    let html = '<div class="inventori-section">';
    
    // Senjata
    html += '<div class="inventori-group"><h4>⚔️ Senjata</h4><div class="item-list">';
    if (player.inventori.senjata.length === 0) {
        html += '<p class="empty-inventori">Tidak ada senjata</p>';
    } else {
        player.inventori.senjata.forEach((item, index) => {
            html += `<div class="item-card senjata">
                <span class="item-emoji">${item.emoji}</span>
                <span class="item-name">${item.nama}</span>
                <span class="item-stat">-${item.damage}</span>
                <button class="btn-use" onclick="p${playerNum}GunakanSenjata(${index})">Gunakan</button>
            </div>`;
        });
    }
    html += '</div></div>';

    // Makanan
    html += '<div class="inventori-group"><h4>🍗 Makanan</h4><div class="item-list">';
    if (player.inventori.makanan.length === 0) {
        html += '<p class="empty-inventori">Tidak ada makanan</p>';
    } else {
        player.inventori.makanan.forEach((item, index) => {
            html += `<div class="item-card makanan">
                <span class="item-emoji">${item.emoji}</span>
                <span class="item-name">${item.nama}</span>
                <span class="item-stat">+${item.heal}</span>
                <button class="btn-use" onclick="p${playerNum}GunakanMakanan(${index})">Gunakan</button>
            </div>`;
        });
    }
    html += '</div></div></div>';

    inventoriContainer.innerHTML = html;
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
    animateAction('card1', 'heal');
}

function p1Serang() {
    pemain1.serang(15);
    updateUI();
    animateAction('card1', 'hit');
}

function p1GunakanMakanan(index) {
    if (pemain1.gunakanMakanan(index)) {
        updateUI();
        animateAction('card1', 'heal');
    }
}

function p1GunakanSenjata(index) {
    if (pemain1.gunakanSenjata(index, pemain2)) {
        updateUI();
        animateAction('card1', 'attack');
        animateAction('card2', 'hit');
    }
}

// FUNGSI PEMAIN 2
function p2Makan() {
    pemain2.makan(10);
    updateUI();
    animateAction('card2', 'heal');
}

function p2Serang() {
    pemain2.serang(15);
    updateUI();
    animateAction('card2', 'hit');
}

function p2GunakanMakanan(index) {
    if (pemain2.gunakanMakanan(index)) {
        updateUI();
        animateAction('card2', 'heal');
    }
}

function p2GunakanSenjata(index) {
    if (pemain2.gunakanSenjata(index, pemain1)) {
        updateUI();
        animateAction('card2', 'attack');
        animateAction('card1', 'hit');
    }
}

function animateAction(cardId, type) {
    const card = document.getElementById(cardId);
    if (!card) return;

    if (type === 'hit') {
        card.classList.add('card-hit');
        const bar = card.querySelector('.energy-fill');
        if (bar) {
            bar.classList.add('hit');
            setTimeout(() => bar.classList.remove('hit'), 300);
        }
        setTimeout(() => card.classList.remove('card-hit'), 350);
    } else if (type === 'heal') {
        card.classList.add('card-heal');
        const bar = card.querySelector('.energy-fill');
        if (bar) {
            bar.classList.add('heal');
            setTimeout(() => bar.classList.remove('heal'), 300);
        }
        setTimeout(() => card.classList.remove('card-heal'), 350);
    } else if (type === 'attack') {
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.removeProperty('transform');
        }, 200);
    }
}
