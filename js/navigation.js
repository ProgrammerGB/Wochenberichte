// Funktion zur Berechnung der Kalenderwoche
function getCalendarWeek(date) {
    var startDate = new Date(date.getFullYear(), 0, 1);
    var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startDate.getDay() + 1) / 7);
}

// Funktion zum Setzen des Links des Buttons auf die aktuelle Kalenderwoche
function setCurrentWeekLink() {
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentWeek = getCalendarWeek(today);
    
    // Erstelle die URL für die aktuelle Kalenderwoche
    var weekLink = "kw_" + String(currentWeek - 1).padStart(2, "0") + "_" + currentYear + ".html";
    
    // Setze den href-Attribut des Links
    var weekButton = document.getElementById('weekButton');
    if (weekButton) {
        weekButton.href = weekLink;
    }
}

// Setze den Link beim Laden der Seite
window.onload = setCurrentWeekLink;
