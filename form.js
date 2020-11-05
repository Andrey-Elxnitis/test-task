let currentPlan = 0;
let count = 10;
const PLANS = [
  { id: 0, name: "License Plan #1", price: 13 },
  { id: 1, name: "License Plan #2", price: 22 },
  { id: 2, name: "License Plan #3", price: 34 },
];
const totalPriceElement = document.querySelector(".form__total-value");
const currentPlanElement = document.querySelector(".form__selected-plan-value");
const radioButtonElement = document.querySelector(".form__input_type_radio");
const formElement = document.querySelector(".form");
const countInputElement = document.querySelector(".form__input_number");

const plansFieldset = document.querySelector(".form__field_plans");

function renderPlans() {
  PLANS.forEach(function (plan, index) {
    let label = document.createElement("label");
    label.classList.add("form__label", "form__label_type_plan");
    let title = document.createElement("span");
    title.className = "form__label-title";
    let subtitle = document.createElement("span");
    subtitle.className = "form__label-subtitle";
    subtitle.textContent = `$${plan.price} per licence`;
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "plan";
    input.value = plan.id;
    if (plan.id === currentPlan) {
      input.toggleAttribute("checked", true);
      label.classList.toggle("form__label_checked");
    }
    input.classList.add("form__input", "form__input_type_radio");
    let icon = document.createElement("div");
    icon.classList.add("form__radio-icon");
    title.appendChild(input);
    title.appendChild(icon);
    title.innerHTML += plan.name;
    label.appendChild(title);
    label.appendChild(subtitle);
    plansFieldset.appendChild(label);
  });
}
function init() {
  formElement.addEventListener("change", (e) => onPlanChange(e));
  countInputElement.addEventListener("change", (e) => onCountChange(e));
  currentPlanElement.innerHTML = PLANS[currentPlan].name;
  totalPriceElement.innerHTML = `$${PLANS[currentPlan].price * count}`;
}

function onCountChange(e) {
  count = e.target.value;
  totalPriceElement.innerHTML = `$${PLANS[currentPlan].price * count}`;
}

function onPlanChange(e) {
  if (e.target.name == "plan") {
    currentPlan = e.target.value;
    currentPlanElement.innerHTML = PLANS[e.target.value].name;
    totalPriceElement.innerHTML = `$${PLANS[currentPlan].price * count}`;
    Array.from(plansFieldset.children).forEach(function (label) {
      if (currentPlan != label.querySelector("input").value)
        label.classList.remove("form__label_checked");
      else label.classList.add("form__label_checked");
    });
  }
}

renderPlans();
init();
