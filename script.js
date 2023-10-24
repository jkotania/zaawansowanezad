function getCardType(cardNumber) {
  let digits = cardNumber.replace(/\D/g, "");
  let cardType = "Unknown";

  if (/^4/.test(digits)) {
    cardType = "Visa";
  } else if (
    /^5[1-5]/.test(digits) ||
    /^2(22[1-9]|2[3-9][0-9]|3[0-9]{2}|4[0-9]{2}|5[0-9]{2}|6[0-9]{2}|7[0-1][0-9]|720)/.test(
      digits
    )
  ) {
    cardType = "Mastercard";
  }

  let imgElement = document.querySelector(
    ".container .front .image img:nth-child(2)"
  );
  if (cardType !== "Unknown") {
    imgElement.src = "images/" + cardType.toLowerCase() + ".png";
  } else {
    imgElement.src = "/.png";
  }

  return cardType;
}
document.querySelector(".card-number-input").oninput = function () {
  let value = this.value;
  let onlyDigits = value.replace(/\D/g, "");

  if (value !== onlyDigits) {
    document.querySelector(".error-message").style.display = "block";
    this.value = onlyDigits;
  } else {
    document.querySelector(".error-message").style.display = "none";
  }

  while (onlyDigits.length < 16) {
    onlyDigits += "X";
  }

  let formatted = onlyDigits.replace(/(.{4})/g, "$1 ").trim();
  document.querySelector(".card-number-box").innerText = formatted;

  // Wywołanie funkcji getCardType, aby zaktualizować obraz karty
  getCardType(value);
};

document.querySelector(".card-holder-input").oninput = function () {
  let value = document.querySelector(".card-holder-input").value;
  let onlyLetters = value.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/g, "");

  if (value !== onlyLetters) {
    document.querySelector(".error-name").style.display = "block";
    this.value = onlyLetters;
  } else {
    document.querySelector(".error-name").style.display = "none";
  }
  let displayValue = "XXX";

  for (let i = 0; i < onlyLetters.length; i++) {
    displayValue =
      displayValue.substr(0, i) + onlyLetters[i] + displayValue.substr(i + 1);
  }
  document.querySelector(".card-holder-name").innerText = displayValue;
};

document.querySelector(".month-input").oninput = () => {
  document.querySelector(".exp-month").innerText =
    document.querySelector(".month-input").value;
};

document.querySelector(".year-input").oninput = () => {
  document.querySelector(".exp-year").innerText =
    document.querySelector(".year-input").value;
};

document.querySelector(".cvv-input").onmouseenter = () => {
  document.querySelector(".front").style.transform =
    "perspective(1000px) rotateY(-180deg)";
  document.querySelector(".back").style.transform =
    "perspective(1000px) rotateY(0deg)";
};

document.querySelector(".cvv-input").onmouseleave = () => {
  document.querySelector(".front").style.transform =
    "perspective(1000px) rotateY(0deg)";
  document.querySelector(".back").style.transform =
    "perspective(1000px) rotateY(180deg)";
};

document.querySelector(".cvv-input").oninput = function () {
  let value = this.value;
  let onlyDigits = value.replace(/\D/g, "");

  if (value !== onlyDigits) {
    document.querySelector(".cvv-error-message").style.display = "block";
    this.value = onlyDigits;
  } else {
    document.querySelector(".cvv-error-message").style.display = "none";
  }
  let displayValue = "XXX";

  for (let i = 0; i < onlyDigits.length; i++) {
    displayValue =
      displayValue.substr(0, i) + onlyDigits[i] + displayValue.substr(i + 1);
  }
  document.querySelector(".cvv-box").innerText = displayValue;
};

document.querySelector("#myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  this.submit();
  alert("Formularz został wysłany!");
});
