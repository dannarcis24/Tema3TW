const canvas1 = document.getElementById('image1');
const ctx1 = canvas1.getContext('2d');

const canvas2 = document.getElementById('image2');
const ctx2 = canvas2.getContext('2d');

// Funcția pentru a obține și prelucra imaginea din API
async function fetchImage() {
    try {
        const startTime = performance.now(); // Începem măsurarea timpului
        ok = false;

        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();

        document.getElementById('jsonOutput').textContent = JSON.stringify(data, null, 2);

        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = data.message;

        img.onload = () => {
            canvas1.width = img.width;
            canvas1.height = img.height;
            canvas2.width = img.width;
            canvas2.height = img.height;

            ctx1.drawImage(img, 0, 0);
            ctx2.drawImage(img, 0, 0);

            const endTime = performance.now(); // Sfârșim măsurarea timpului
            console.log(`Fetch și afișare imagine: ${(endTime - startTime).toFixed(2)} ms`);
        };
    } catch (error) {
        console.error('Eroare la preluarea imaginii:', error);
    }
}

window.onload = fetchImage;

function reset() {
    const startTime = performance.now();
    ok = false;

    const imageData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
    ctx2.putImageData(imageData, 0, 0);

    const endTime = performance.now();
    console.log(`Resetare imagine: ${(endTime - startTime).toFixed(2)} ms`);
}

function mirrorVertical() {
    const imageData = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
    const data = imageData.data;

    const numSections = 4;
    const sliceHeight = Math.ceil(canvas2.height / numSections);

    const startTime = performance.now();

    const processSlice = (start, end, delay) => {
        setTimeout(() => {
            for (let i = start; i < end; i++) {
                for (let j = 0; j < Math.floor(canvas2.width / 2); j++) {
                    const index = (i * canvas2.width + j) * 4;
                    const mirrorIndex = (i * canvas2.width + (canvas2.width - j - 1)) * 4;

                    for (let k = 0; k < 4; k++) {
                        const temp = data[index + k];
                        data[index + k] = data[mirrorIndex + k];
                        data[mirrorIndex + k] = temp;
                    }
                }
            }

            ctx2.putImageData(imageData, 0, 0);

            const endTime = performance.now();
            console.log(`Procesare secțiune (${start}-${end}): ${(endTime - startTime).toFixed(2)} ms`);
        }, delay);
    };

    for (let i = 0; i < numSections; i++) {
        const start = i * sliceHeight;
        const end = Math.min((i + 1) * sliceHeight, canvas2.height);
        processSlice(start, end, i * 1000);
    }
}

function handleMenu() {
    const menu = document.getElementById('menu1');
    const option = menu.value;

    if (option === "1") {
        console.log("Opțiunea selectată: Mirror vertical");
        mirrorVertical();
        left = false;
    } else {
        console.log("Opțiunea selectată: Prelucrare doar pe partea stângă");
        left = true;
    }

    ok = true;
    menu.value = "";
}

function convert2GrayScale(data, start, end, halfWidth) {
    const startTime = performance.now();

    for (let i = start; i < end; i++) {
        for (let j = 0; j < halfWidth; j++) {
            const index = (i * canvas2.width + j) * 4;
            const gray = (data[index] + data[index + 1] + data[index + 2]) / 3;
            data[index] = data[index + 1] = data[index + 2] = gray;
        }
    }

    const endTime = performance.now();
    console.log(`Convertire grayscale (${start}-${end}): ${(endTime - startTime).toFixed(2)} ms`);
}

function normalizeColors(data, start, end, halfWidth) {
    const startTime = performance.now();

    let minR = 255, minG = 255, minB = 255;
    let maxR = 0, maxG = 0, maxB = 0;

    for (let i = start; i < end; i++) {
        for (let j = 0; j < halfWidth; j++) {
            const index = (i * canvas2.width + j) * 4;
            minR = Math.min(minR, data[index]);
            minG = Math.min(minG, data[index + 1]);
            minB = Math.min(minB, data[index + 2]);

            maxR = Math.max(maxR, data[index]);
            maxG = Math.max(maxG, data[index + 1]);
            maxB = Math.max(maxB, data[index + 2]);
        }
    }

    for (let i = start; i < end; i++) {
        for (let j = 0; j < halfWidth; j++) {
            const index = (i * canvas2.width + j) * 4;
            data[index] = ((data[index] - minR) / (maxR - minR)) * 255;
            data[index + 1] = ((data[index + 1] - minG) / (maxG - minG)) * 255;
            data[index + 2] = ((data[index + 2] - minB) / (maxB - minB)) * 255;
        }
    }

    const endTime = performance.now();
    console.log(`Normalizare culori (${start}-${end}): ${(endTime - startTime).toFixed(2)} ms`);
}

function handleProcessing() {
    const menu = document.getElementById('menu2');
    const option = menu.value;

    if (ok) {
        const imageData = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
        const data = imageData.data;

        let halfWidth = left ? Math.floor(canvas2.width / 2) : canvas2.width;

        const processSlice = (start, end, delay) => {
            setTimeout(() => {
                if (option === "1") {
                    convert2GrayScale(data, start, end, halfWidth);
                } else if (option === "2") {
                    normalizeColors(data, start, end, halfWidth);
                }

                ctx2.putImageData(imageData, 0, 0);
            }, delay);
        };

        const numSections = 4;
        const sliceHeight = Math.ceil(canvas2.height / numSections);
        for (let i = 0; i < numSections; i++) {
            const start = i * sliceHeight;
            const end = Math.min((i + 1) * sliceHeight, canvas2.height);
            processSlice(start, end, i * 1000);
        }
    } else {
        alert("Ai selectat o tema de procesare înainte de o opțiune!");
    }

    menu.value = "";
}