function promptForSecretCode() {
    var secretCode = prompt("Please enter password:");

    // Check if the user clicked "Cancel"
    if (secretCode === null) {
        alert("Cancelling operation...");
        return;
    }

    // Convert the input to lowercase
    secretCode = secretCode.toLowerCase();

    if (secretCode === "rstlne") {
        window.location.href = "bc4150d023d3255136db671d61ac93f2/1d74fbc52e1db8c23d4dba04a0becc9f.html";
    } else {
        alert("Incorrect password. Please try again.");
        changeStylesheet("bc4150d023d3255136db671d61ac93f2/1d74fbc52e1db8c23d4dba04a0becc9f.css");
        invertColors();
    }
}

function changeStylesheet(stylesheetPath) {
    // Create a new link element for the new stylesheet
    var newStylesheet = document.createElement("link");
    newStylesheet.rel = "stylesheet";
    newStylesheet.href = stylesheetPath;

    // Find the existing stylesheet link element in the document head
    var head = document.head;
    var existingStylesheet = head.querySelector("link[rel='stylesheet']");

    // Replace the existing stylesheet with the new one
    if (existingStylesheet) {
        head.replaceChild(newStylesheet, existingStylesheet);
    } else {
        head.appendChild(newStylesheet);
    }
}

function invertColors() {
    document.body.classList.add("invert-colors"); // Add a class to the body element to invert colors
}

