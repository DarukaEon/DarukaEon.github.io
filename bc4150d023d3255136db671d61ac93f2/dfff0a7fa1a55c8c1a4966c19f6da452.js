const outputElement = document.getElementById("output");
const commandInput = document.getElementById("commandInput");

// Function to focus the input field when the page loads and when the document is clicked
function focusInput() {
    commandInput.focus();
}

window.onload = function () {
    focusInput();
    document.addEventListener("click", focusInput);
};

// Disable autocomplete for the input field
commandInput.setAttribute("autocomplete", "off");

commandInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleCommand(commandInput.value);
        commandInput.value = "";
    }
});

// Function to simulate a typewriter effect
function typewriterEffect(text, speed) {
    return new Promise((resolve) => {
        let i = 0;
        const intervalId = setInterval(() => {
            outputElement.innerHTML += text.charAt(i);
            i++;
            if (i > text.length - 1) {
                clearInterval(intervalId);
                resolve();
            }
        }, speed);
    });
}

async function handleCommand(command) {
    command = command.toLowerCase(); // Convert the input to lowercase

    if (command === "help") {

        // Simulate a file download
        await typewriterEffect("Available Commands:\n\n");
        await typewriterEffect("CLS            Clear the terminal screen.\n");
        await typewriterEffect("HELP           Lists available commands on this terminal.\n");
        await typewriterEffect("INFO           Display information about this terminal.\n");
        await typewriterEffect("LIST           Display a list of files and subdirectories in a directory.\n");
        await typewriterEffect("PING           Test the reachability of a host on an Internet Protocol (IP) network. [Disabled]\n");
        await typewriterEffect("READ           View text file in directory.\n");
        await typewriterEffect("WGET           Download external files or directory.\n\n");

    } else if (command === 'cls') {

        window.location.replace('dfff0a7fa1a55c8c1a4966c19f6da452.html');

    } else if (command === 'info') {

        await typewriterEffect("------------------------------------------------------------\n");
        await typewriterEffect("RSTLNE OS v1.3\n");
        await typewriterEffect("------------------------------------------------------------\n\n");
        await typewriterEffect("There is 1 available file in this terminal.\n\n");
        await typewriterEffect("Type HELP to list commands.\n\n");

    } else if (command === 'list') {

        await typewriterEffect("10/17/2023  00:00    -DIR-        .\n");
        await typewriterEffect("10/17/2023  00:00    -DIR-        ..\n");
        await typewriterEffect("10/17/2023  11:22           5,328 hex.txt\n");
        await typewriterEffect("              1 File(s)     5,328 bytes\n");
        await typewriterEffect("              2 Dir(s)    994,672 bytes free\n\n");

    } else if (command === 'read') {

        await typewriterEffect("Usage: READ [FILENAME]\n\n");
        await typewriterEffect("Attributes:\n");
        await typewriterEffect("[FILENAME]      The name of file to read.\n\n");
        await typewriterEffect("Example: READ myfile.txt, will output the contents of myfile.txt.\n\n");

    } else if (command === 'read hex.txt') {

        await typewriterEffect("49 20 6B 6E 6F 77 20 79 6F 75 20 63 61 6E 20 72 65 61 64 20 74 68 69 73 2C 20 73 6F 20 74 61 6B\n");
        await typewriterEffect("65 20 68 65 65 64 2E 0A 0A 4D 79 20 6E 61 6D 65 20 69 73 20 4D 69 6B 27 72 61 2C 20 70 61 72 74\n");
        await typewriterEffect("20 6F 66 20 74 68 65 20 72 65 73 65 61 72 63 68 20 26 20 64 65 76 65 6C 6F 70 6D 65 6E 74 20 74\n");
        await typewriterEffect("65 61 6D 20 69 6E 20 73 65 61 72 63 68 20 6F 66 20 44 65 6C 74 61 73 63 61 70 65 20 56 35 2E 30\n");
        await typewriterEffect("2E 20 54 6F 20 70 75 74 20 69 74 20 62 6C 75 6E 74 6C 79 2C 20 49 20 66 6F 75 6E 64 20 69 74 21\n");
        await typewriterEffect("20 42 75 74 2C 20 69 74 27 73 20 6E 6F 74 68 69 6E 67 20 74 68 61 74 20 49 20 70 69 63 74 75 72\n");
        await typewriterEffect("65 20 69 74 20 77 6F 75 6C 64 20 62 65 20 6C 69 6B 65 2E 20 49 74 2E 2E 2E 20 73 6D 65 6C 6C 73\n");
        await typewriterEffect("20 6C 69 6B 65 20 63 6F 75 67 68 20 64 72 6F 70 73 2E 2E 2E 2E 0A 0A 42 75 74 2C 20 72 69 67 68\n");
        await typewriterEffect("74 20 74 6F 20 74 68 65 20 6D 61 74 74 65 72 21 20 49 20 68 61 76 65 20 61 20 74 61 73 6B 20 66\n");
        await typewriterEffect("6F 72 20 79 6F 75 2E 20 57 68 69 6C 65 20 49 20 77 61 73 20 62 75 6D 62 6C 69 6E 67 20 61 72 6F\n");
        await typewriterEffect("75 6E 64 20 69 6E 20 74 68 65 20 44 65 6C 74 61 73 63 61 70 65 2C 20 49 20 63 61 6D 65 20 61 63\n");
        await typewriterEffect("72 6F 73 73 20 73 6F 6D 65 74 68 69 6E 67 2E 0A 0A 54 68 65 20 69 6E 69 74 69 61 6C 20 65 6E 63\n");
        await typewriterEffect("72 79 70 74 69 6F 6E 20 6D 65 74 68 6F 64 20 69 73 20 66 61 69 72 6C 79 20 70 72 69 6D 69 74 69\n");
        await typewriterEffect("76 65 20 74 68 61 74 20 65 76 65 6E 20 61 20 72 6F 74 74 65 6E 20 31 33 2D 79 65 61 72 2D 6F 6C\n");
        await typewriterEffect("64 20 63 61 6E 20 64 65 63 72 79 70 74 20 69 74 2E 20 54 68 65 20 6E 65 78 74 20 65 6E 63 72 79\n");
        await typewriterEffect("70 74 69 6F 6E 20 6D 65 74 68 6F 64 20 69 73 20 61 20 6C 69 74 74 6C 65 20 74 72 69 63 6B 69 65\n");
        await typewriterEffect("72 2E 20 42 75 74 2C 20 69 66 20 79 6F 75 27 76 65 20 6D 61 64 65 20 69 74 20 74 68 69 73 20 66\n");
        await typewriterEffect("61 72 2C 20 49 20 74 72 75 73 74 20 79 6F 75 20 6B 6E 6F 77 20 77 68 61 74 20 74 6F 20 64 6F 2E\n");
        await typewriterEffect("20 54 68 65 20 63 6C 75 65 73 20 61 72 65 20 68 65 72 65 2E 0A 0A 38 66 35 63 63 36 34 33 30 36\n");
        await typewriterEffect("31 33 66 31 63 31 32 66 33 36 39 36 35 30 35 30 62 62 37 31 39 37 2E 7A 71 35 0A 0A 54 68 61 74\n");
        await typewriterEffect("20 69 73 20 61 6C 6C 20 49 20 63 61 6E 20 73 61 79 2E 20 49 20 6D 75 73 74 20 66 6C 65 65 21 20\n");
        await typewriterEffect("47 6F 6F 64 20 6C 75 63 6B 21 20 49 27 6C 6C 20 73 65 65 20 79 6F 75 20 6F 6E 20 74 68 65 20 6F\n");
        await typewriterEffect("74 68 65 72 20 73 69 64 65 2C 20 6D 79 20 66 72 69 65 6E 64 21 20 20 20 20 20 20 20 20 20 20 20\n\n");
        await typewriterEffect("--- END OF FILE ---\n\n");

    } else if (command === "wget 8f5cc6430613f1c12f36965050bb7197.md5") {

        // Simulate a file download
        await typewriterEffect("Downloading file...\n\n");

        var a = document.createElement('a');
        a.href = '8f5cc6430613f1c12f36965050bb7197.md5';
        a.download = '8f5cc6430613f1c12f36965050bb7197.md5'; // This sets the download filename
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    } else if (command === "wget Discord.md5") {

        // Simulate a file download
        await typewriterEffect("Downloading file...\n\n");

        var a = document.createElement('a');
        a.href = 'Discord.md5';
        a.download = 'Discord.md5'; // This sets the download filename
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    } else if (command === "wget hex.txt") {

        // Simulate a file download
        await typewriterEffect("Downloading file...\n\n");

        var a = document.createElement('a');
        a.href = 'hex.txt';
        a.download = 'hex.txt'; // This sets the download filename
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    } else if (command === 'wget') {

        await typewriterEffect("Usage: WGET [FILENAME]\n\n");
        await typewriterEffect("Attributes:\n");
        await typewriterEffect("[FILENAME]      The name of file to download.\n\n");
        await typewriterEffect("Example: WGET myfile.txt, will download myfile.txt.\n\n");

    } else if (command === 'hidden') {

        await typewriterEffect("------------------------------------------------------------\n");
        await typewriterEffect("RSTLNE OS v1.3\n");
        await typewriterEffect("------------------------------------------------------------\n\n");
        await typewriterEffect("There is 1 hidden file in this terminal.\n\n");
        await typewriterEffect("Type HELP to list commands.\n\n");

    } else {

        // Display an error message for an incorrect command
        await typewriterEffect("'" + command + "'" + " is not recognized as an internal or external command,\n" + "operable program or batch file.\n\n");

    }
}