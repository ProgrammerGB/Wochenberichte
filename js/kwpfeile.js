// Aktuelle URL-Pfad auslesen
let path = window.location.pathname;

// Regex verwenden, um die aktuelle KW und das Jahr aus der URL zu extrahieren
let match = path.match(/kw_(\d+)_(\d+)\.html/);

if (match) {
    let currentWeek = parseInt(match[1], 10); // Extrahierte KW als Zahl
    let currentYear = parseInt(match[2], 10); // Extrahiertes Jahr als Zahl

    // Event-Listener für den "Zurück"-Pfeil
    document.getElementById("arrow-back").addEventListener("click", () => {
        let previousWeek = currentWeek - 1;

        // Jahreswechsel zurück (von KW 01 auf KW 52 des vorherigen Jahres)
        if (previousWeek < 1) {
            previousWeek = 52; // Letzte KW des vorherigen Jahres
            currentYear -= 1; // Jahr um eins reduzieren
        }

        // Navigieren zur neuen URL
        navigateToWeek(previousWeek, currentYear);
    });

    // Event-Listener für den "Vorwärts"-Pfeil
    document.getElementById("arrow-next").addEventListener("click", () => {
        let nextWeek = currentWeek + 1;

        // Jahreswechsel nach vorne (von KW 52 auf KW 01 des nächsten Jahres)
        if (nextWeek > 52) {
            nextWeek = 1; // Erste KW des nächsten Jahres
            currentYear += 1; // Jahr um eins erhöhen
        }

        // Navigieren zur neuen URL
        navigateToWeek(nextWeek, currentYear);
    });
}

// Funktion zum Navigieren zu einer bestimmten KW und Jahr
function navigateToWeek(week, year) {
    // KW immer zweistellig formatieren (z. B. "01" statt "1")
    let formattedWeek = week.toString().padStart(2, "0");

    // Neue URL zusammenstellen
    let targetFile = `kw_${formattedWeek}_${year}.html`;

    // Fehlerbehandlung: Überprüfen, ob die Datei existiert
    fetch(targetFile)
        .then(response => {
            if (response.ok) {
                // Datei existiert, navigieren
                window.location.href = targetFile;
            } else {
                // Datei existiert nicht, zur Übersicht navigieren
                window.location.href = "index.html";
            }
        })
        .catch(() => {
            // Bei einem unerwarteten Fehler ebenfalls zur Übersicht navigieren
            window.location.href = "index.html";
        });
}
