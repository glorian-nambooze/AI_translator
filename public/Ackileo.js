document.addEventListener("DOMContentLoaded", function () {
    const sourceLangSelect = document.getElementById("source-lang");
    const targetLangSelect = document.getElementById("target-lang");
    const translateButton = document.getElementById("translate-button");
    const sourceText = document.getElementById("source-text");
    const targetText = document.getElementById("target-text");

    // Load available languages from your Node.js backend
    async function loadLanguages() {
        try {
            const response = await fetch("https://your-backend-service.onrender.com/languages");

            // const response = await fetch("http://localhost:3000/languages");
            const languages = await response.json();

            languages.forEach(lang => {
                const option1 = document.createElement("option");
                const option2 = document.createElement("option");

                option1.value = lang.code;
                option1.textContent = lang.name;

                option2.value = lang.code;
                option2.textContent = lang.name;

                sourceLangSelect.appendChild(option1);
                targetLangSelect.appendChild(option2);
            });

            // Set default values
            sourceLangSelect.value = "en";
            targetLangSelect.value = "fr";
        } catch (err) {
            alert("Failed to load languages.");
            console.error(err);
        }
    }

    loadLanguages();

    // Translate text
    translateButton.addEventListener("click", async () => {
        const source = sourceLangSelect.value;
        const target = targetLangSelect.value;
        const text = sourceText.value.trim();

        if (!text) {
            alert("Please enter text to translate.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/translate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    q: text,
                    source,
                    target,
                    format: "text"
                })
            });

            const data = await response.json();
            targetText.value = data.translatedText;
        } catch (err) {
            alert("Translation failed.");
            console.error(err);
        }
    });
});
