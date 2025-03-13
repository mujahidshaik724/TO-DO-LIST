// UIHelper.js
const UIHelper = () => ({
    createForm: (fields, buttons) => {
        const form = document.createElement("div");
        form.classList.add("custom-form");

        fields.forEach(({ type, placeholder, value, className }) => {
            const input = document.createElement(type === "textarea" ? "textarea" : "input");
            if (type !== "textarea") input.type = type;
            input.placeholder = placeholder || "";
            input.value = value || "";
            if (className) input.classList.add(className);
            form.appendChild(input);
        });

        buttons.forEach(({ text, className, onClick }) => {
            const button = document.createElement("button");
            button.textContent = text;
            button.classList.add(className);
            button.addEventListener("click", (e) => {
                e.preventDefault(); // Prevent accidental page reloads
                onClick();
            });
            form.appendChild(button);
        });

        return form; // Return the form instead of appending it to body
    }
});

export default UIHelper;
