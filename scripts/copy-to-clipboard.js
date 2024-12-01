const copyButtons = document.querySelectorAll(".color-info button");

copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const colorCodeElement = button.previousElementSibling.querySelector("p");
        const colorCode = colorCodeElement.textContent;

        navigator.clipboard.writeText(colorCode)
            .then(() => {
                const originalText = button.textContent;
                button.textContent = "Copied !";
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    });
});
