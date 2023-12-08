/* modal logic */
const addUserModal = document.getElementById("add-modal");
const startAddUserButton = document.querySelector("#hero .btn");
const startAddUserButtonFooter = document.querySelector("#footer .btn");
const backdrop = document.getElementById("backdrop");
const cancelAddUserButton = addUserModal.querySelector(".btn--passive");
const confirmAddUserButton = addUserModal.querySelector(".btn--success");
const userInputs = addUserModal.querySelectorAll("input");

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const showUserModal = () => {
  addUserModal.classList.add("visible");
  toggleBackdrop();
};

const closeUserDeletionModal = () => {
  toggleBackdrop();
  clearUserInput();
};

const closeUserModal = () => {
  addUserModal.classList.remove("visible");
  clearUserInput();
};

const clearUserInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const cancelAddUserHandler = () => {
  closeUserModal();
  toggleBackdrop();
  clearUserInput();
};

const backdropClickHandler = () => {
  closeUserModal();
  closeUserDeletionModal();
  clearUserInput();
};

const addUserHandler = () => {
  const name = userInputs[0].value.trim();
  const email = userInputs[1].value.trim();

  if (name && email) {
    validateData(name, email);
  } else {
    alert("Please complete both fields.");
  }
};

const validateData = (name, email) => {
  const patternName = /^[a-zA-Z ]*$/;
  const patternEmail = /^\S+@\S+\.\S+$/;

  if (!patternName.test(name)) {
    alert("Invalid name.");
    return;
  }

  if (!patternEmail.test(email)) {
    alert("Invalid email.");
    return;
  }

  sendData(name, email);
  closeUserModal();
  toggleBackdrop();
  clearUserInput();
};

const sendData = (name, email) => {
  fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      alert("Message sent!");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

startAddUserButton.addEventListener("click", showUserModal);
startAddUserButtonFooter.addEventListener("click", showUserModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddUserButton.addEventListener("click", cancelAddUserHandler);
confirmAddUserButton.addEventListener("click", addUserHandler);

/* tracker logic */
const params = new URLSearchParams(window.location.search);
let step = params.get("step");

const init = (step) => {
  const sessionItems = Object.keys(sessionStorage);

  if (step === null) {
    return;
  }
  if (step <= 0 || step > 6) {
    console.log("Enter a number between 1 and 6");
  }

  sessionStorage.setItem(`.step-${step}`, `.step-${step}`);
  updateUI(step);
  markDone(sessionItems);
};

const updateUI = (step) => {
  const spanElement = document.querySelector(
    `.step-${step} .status-container span`
  );
  const cirleElement = document.querySelector(
    `.step-${step} .status-container .circle`
  );
  if (spanElement && cirleElement) {
    spanElement.innerText = "DONE!";
    cirleElement.classList.add("done");
  }
  if (step++ > 5) {
    return;
  }
  updateNextStep(step);
};

const updateNextStep = (step) => {
  const spanElement = document.querySelector(
    `.step-${step} .status-container span`
  );
  const cirleElement = document.querySelector(
    `.step-${step++} .status-container .circle`
  );

  if (cirleElement.classList.contains("done")) {
    return;
  }

  if (spanElement && cirleElement) {
    spanElement.innerText = "In-progress";
    cirleElement.classList.add("in-progress");
  }
};

const updateImage = (sessionItems) => {
  const imageElement = document.querySelector(".tracking");
  if (sessionItems.length > 1) {
    imageElement.src = "assets/tracking-2.png";
    imageElement.srcset =
      "assets/tracking-2-2x.png 2x, assets/tracking-2-3x.png 3x";
  }
  if (sessionItems.length > 2) {
    imageElement.src = "assets/tracking-3.png";
    imageElement.srcset =
      "assets/tracking-3-2x.png 2x, assets/tracking-3-3x.png 3x";
  }
  if (sessionItems.length > 3) {
    imageElement.src = "assets/tracking-4.png";
    imageElement.srcset =
      "assets/tracking-4-2x.png 2x, assets/tracking-4-3x.png 3x";
  }
  if (sessionItems.length > 4) {
    imageElement.src = "assets/tracking-5.png";
    imageElement.srcset =
      "assets/tracking-5-2x.png 2x, assets/tracking-5-3x.png 3x";
  }
  if (sessionItems.length > 5) {
    imageElement.src = "assets/tracking-6.png";
    imageElement.srcset =
      "assets/tracking-6-2x.png 2x, assets/tracking-6-3x.png 3x";
  }
};

const markDone = (sessionItems) => {
  sessionItems.forEach((item) => {
    if (item.includes("step")) {
      const spanElement = document.querySelector(
        `${item} .status-container span`
      );
      const cirleElement = document.querySelector(
        `${item} .status-container .circle`
      );
      if (spanElement && cirleElement) {
        spanElement.innerText = "DONE!";
        cirleElement.classList.add("done");
      }
    }
  });
  updateImage(sessionItems);
};

init(step);
