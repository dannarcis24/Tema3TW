# 📸 Image Processing Web Application

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![API](https://img.shields.io/badge/API-Dog%20CEO-blue?style=flat)](https://dog.ceo/dog-api/)

Aplicație web interactivă dedicată preluării, vizualizării și manipulării imaginilor în timp real. Proiectul utilizează **HTML5 Canvas** pentru redarea grafică și tehnici de procesare asincronă pentru a asigura o experiență de utilizare fluidă. 

## 🌟 Funcționalități Principale

### 1. Preluarea Dinamică a Datelor
* **API Extern**: La încărcarea paginii, aplicația face un apel asincron către API-ul [Dog CEO](https://dog.ceo/api/breeds/image/random) pentru a obține o imagine aleatorie[
* **Vizualizare Duală**: Imaginea este randată simultan pe două canvas-uri: unul pentru referință (imaginea inițială) și unul destinat procesării.

### 2. Algoritmi de Procesare a Imaginii
Utilizatorul poate aplica diverse transformări matematice asupra pixelilor:
* **Oglindire pe verticală**: Schimbă pixelii de pe jumătatea stângă cu cei de pe jumătatea dreaptă prin manipularea directă a array-ului de date.
* **Conversie Grayscale**: Transformă imaginea în tonuri de gri prin calcularea valorii medii a canalelor R, G și B pentru fiecare pixel.
* **Normalizarea Culorilor**: Ajustează valorile canalelor de culoare între 0 și 255 pe baza minimelor și maximelor identificate în întreaga imagine.
* **Prelucrare Parțială**: Permite aplicarea temelor de procesare exclusiv pe jumătatea stângă a imaginii.

### 3. Optimizare și Asincronism
* **Procesare pe secțiuni**: Pentru a preveni blocarea interfeței (UI), imaginea este divizată în 4 secțiuni procesate independent.
* **Efecte vizuale în timp real**: Utilizarea funcției `setTimeout` permite randarea progresivă a efectelor pe parcursul mai multor cadre.
* **Monitorizarea performanței**: Timpul de execuție pentru fiecare etapă este măsurat și afișat în consolă și în interfață pentru a evalua eficiența operațiunilor.



---

## 🛠️ Detalii Tehnice

* **Frontend**: HTML5, CSS3 (Grid Layout) și JavaScript (Vanilla ES6).
* **Canvas API**: Utilizarea metodelor `getImageData()` pentru extragerea pixelilor și `putImageData()` pentru randarea rezultatelor procesate.
* **Gestionarea erorilor**: Include mecanisme de tip `try-catch` pentru apelurile API și validări pentru ordinea selecției opțiunilor de procesare.

---

## 🚀 Instalare și Utilizare

1. **Lansare**: Deschideți fișierul `index.html` în orice browser modern.
2. **Selectare Opțiune**: Alegeți un mod de procesare (ex: Oglindire) din primul meniu.
3. **Aplicare Temă**: Selectați tema dorită (Grayscale sau Normalizare) pentru a declanșa procesarea asincronă.
4. **Resetare**: Utilizați butonul **Reseteaza** pentru a reveni instantaneu la imaginea originală.

---

[cite_start]**Autor**: Dan Narcis Costinel [cite: 280]  
[cite_start]**Grupa**: 322AA [cite: 280]  
[cite_start]**Proiect**: Procesare de imagini (TW) [cite: 280]
