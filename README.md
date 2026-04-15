# Hotel Genova Scalea

Prima versione statica del sito multipagina per Hotel Genova Scalea, progettata con HTML5, CSS3 e JavaScript vanilla.

## Stack

- HTML5 semantico
- CSS3 con approccio mobile first
- JavaScript vanilla per interazioni leggere e form WhatsApp
- JSON mock per camere e recensioni

## Struttura

```text
HotelGenovaScalea/
|-- assets/
|   |-- icons/
|   |   `-- favicon.svg
|   `-- images/
|       |-- breakfast-terrace.svg
|       |-- coast-scalea.svg
|       |-- gallery-corridor.svg
|       |-- hero-seaside.svg
|       |-- history-lounge.svg
|       |-- restaurant-evening.svg
|       |-- room-family.svg
|       |-- room-standard.svg
|       |-- room-superior.svg
|       `-- sources.md
|-- css/
|   |-- responsive.css
|   `-- style.css
|-- data/
|   |-- reviews.json
|   `-- rooms.json
|-- js/
|   |-- booking.js
|   `-- main.js
|-- 404.html
|-- camere.html
|-- contatti.html
|-- index.html
|-- prenota.html
`-- ristorante-bar.html
```

## Avvio rapido

1. Apri `index.html` in un browser moderno.
2. Per una prova locale piu' realistica usa un piccolo server statico.
3. Sostituisci le immagini placeholder in `assets/images/` mantenendo gli stessi nomi file.

## Note immagini

Le immagini SVG presenti sono placeholder locali ottimizzati per sviluppo e presentazione.
In `assets/images/sources.md` trovi i suggerimenti per sostituirle con fotografie reali o immagini Unsplash coerenti.

## Booking WhatsApp

Il form in `prenota.html` genera un messaggio precompilato e apre:

`https://wa.me/39098520209?text=...`

## Personalizzazioni consigliate prima della pubblicazione

- Sostituire i placeholder con fotografie reali
- Aggiornare il link reale alle recensioni Google
- Verificare l'embed Google Maps definitivo
- Collegare privacy e cookie policy reali
