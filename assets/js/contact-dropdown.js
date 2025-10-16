    // Contact dropdown toggle
    var body = document.querySelector("body");
    const contactDropdown = document.querySelector("#cta #form_primary .dropdown");
    const dropdownSelect = document.querySelector("#cta #form_primary .dropdown_select");
    const dropdownList = document.querySelector("#cta #form_primary .dropdown_list");

    dropdownSelect.addEventListener("click", function() {
        contactDropdown.classList.toggle("active_element");
        body.classList.toggle("open");
        // run the function to check the aria-expanded value
        ariaExpanded();
    });

    // checks the value of aria expanded on dropdown_list and changes it accordingly whether it is expanded or not
    function ariaExpanded() {
        const isExpanded = dropdownList.getAttribute("aria-expanded");

        if (isExpanded === "false") {
            dropdownList.setAttribute("aria-expanded", "true");
        } else {
            dropdownList.setAttribute("aria-expanded", "false");
        }
    };

    // Adding a prefix inside the phone input field - the user's input will always come after that prepended value so the phone number submits properly
    const phoneInput = document.getElementById("phone");
    let phonePrefix;

    // initialize with prefix
    phoneInput.value = phonePrefix;

    // always keep caret after prefix
    function lockCaret() {
        if (phoneInput.selectionStart < phonePrefix.length) {
            phoneInput.setSelectionRange(phonePrefix.length, phonePrefix.length);
        }
    }

    // set prefix safely (when user chooses a new country)
    function setPrefix(newPrefix) {
        phonePrefix = newPrefix + " ";
        phoneInput.value = phonePrefix;
        lockCaret();
    }

    // on focus, place caret after prefix
    phoneInput.addEventListener("focus", lockCaret);

    // on click, prevent caret inside prefix
    phoneInput.addEventListener("click", lockCaret);

    // on keydown, block backspace/delete before prefix
    phoneInput.addEventListener("keydown", (e) => {
        if (
            (e.key === "Backspace" && phoneInput.selectionStart <= phonePrefix.length) ||
            (e.key === "Delete" && phoneInput.selectionStart < phonePrefix.length)
        ) {
            e.preventDefault();
            lockCaret();
        }
    });

    // If user tries to paste text before prefix, fix it
    phoneInput.addEventListener("paste", (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        phoneInput.value = phonePrefix + text.replace(phonePrefix, "");
    });

    // Update .dropdown-selected with the chosen country
    const dropdownSelectedCountry = dropdownSelect.querySelector("p");
    const options = Array.from(dropdownList.querySelectorAll("li"));

    options.forEach(option => {
        option.addEventListener("click", () => {
            const countryCode = option.dataset.code;
            const countryText = option.textContent;

            // update the visible selected box
            dropdownSelectedCountry.textContent = countryText;

            // take whatever user typed, minus old prefix
            const currentValue = phoneInput.value || "";
            let userPart = currentValue.replace(phonePrefix, "").trim();

            // update the prefix
            phonePrefix = countryCode + " ";

            // rebuild full value safely
            phoneInput.value = phonePrefix + userPart;

            // place cursor right after prefix
            phoneInput.focus();
            phoneInput.setSelectionRange(phonePrefix.length, phonePrefix.length);

            // close the dropdown
            contactDropdown.classList.remove("active_element");
            body.classList.remove("open");
            dropdownList.setAttribute("aria-expanded", "false");
            dropdownList.classList.remove("full_screen");

            // save choice to localStorage
            localStorage.setItem("dropdownCountryText", countryText);
            localStorage.setItem("dropdownCountryCode", countryCode);
        });
    });

    // When the page loads, restore saved choice or set default
    window.addEventListener("DOMContentLoaded", () => {
        const savedtext = localStorage.getItem("dropdownCountryText");
        const savedCode = localStorage.getItem("dropdownCountryCode");

        if (savedtext && savedCode) {
            // use saved selection
            dropdownSelectedCountry.textContent = savedtext;
            phonePrefix = savedCode + " ";
            phoneInput.value = phonePrefix;
        } else {
            // fallback default
            dropdownSelectedCountry.textContent = "🇵🇭 Philippines";
            phonePrefix = "+63 ";
            phoneInput.value = phonePrefix;
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!contactDropdown.contains(e.target) && !dropdownSelect.contains(e.target)) {
            closeDropdown();
        }
    })

    // Close dropdown when scrolling or touch-dragging
    window.addEventListener("scroll", () => {
        if (contactDropdown.classList.contains("active_element")) {
            closeDropdown();
        }
    });

    window.addEventListener("touchmove", () => {
        if (contactDropdown.classList.contains("active_element")) {
            closeDropdown();
        }
    });

    function closeDropdown() {
        contactDropdown.classList.remove("active_element");
        body.classList.remove("open");
        dropdownList.setAttribute("aria-expanded", "false");
        dropdownList.classList.remove("full_screen");
    }