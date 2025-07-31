export function colorMode() {
  const body = document.body;
  const switchInput = document.querySelector(
    '.switch .switch__input[type="checkbox"]'
  );
  switchInput.addEventListener("click", () => {
    const theme = body.dataset.theme;

    if (theme === "light") {
      body.dataset.theme = "dark";
    } else {
      body.dataset.theme = "light";
    }
    console.log(body, switchInput, body.dataset.theme);
  });
}
