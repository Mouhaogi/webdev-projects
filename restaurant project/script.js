// Open and close the navigation on small screens.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    navigation.classList.toggle("open");
    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

// Filter the dishes on the menu page.
const filterButtons = document.querySelectorAll(".filter-button");
const dishes = document.querySelectorAll(".dish");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach(function (otherButton) {
      otherButton.classList.remove("active");
      otherButton.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    dishes.forEach(function (dish) {
      dish.hidden = selectedCategory !== "all" && dish.dataset.category !== selectedCategory;
    });
  });
});

// Show a confirmation message without sending any information to a server.
const reservationForm = document.querySelector("#reservation-form");

if (reservationForm) {
  const dateInput = document.querySelector("#reservation-date");
  const message = document.querySelector("#reservation-message");

  // Use the visitor's local date to prevent past-date reservations.
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${year}-${month}-${day}`;

  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#guest-name").value.trim();
    const date = dateInput.value;
    const time = document.querySelector("#reservation-time").value;
    const guests = document.querySelector("#guest-count").value;

    if (!name || !date || !time || !guests || date < dateInput.min) {
      message.textContent = "Please complete the form with a valid date.";
      return;
    }

    message.textContent = `Thank you, ${name}! Your demo reservation for ${guests} guest(s) on ${date} at ${time} has been received. No real booking was made.`;
    reservationForm.reset();
  });
}
