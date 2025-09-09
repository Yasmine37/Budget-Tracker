const loginContainer = document.getElementById("login_container");
const loginPage = document.getElementById("login_page");
const app = document.getElementById("app");
const dashboardHeading = document.getElementById("dashboard-heading");
const usernameInput = document.getElementById("username");
const incomeRadio = document.getElementById("income");
const expenseRadio = document.getElementById("expense");
const amountInput = document.getElementById("amount");
const transactionList = document.getElementById("transaction-list");
const totalDisplay = document.getElementById("total");
const incomeDisplay = document.getElementById("total-income");
const expenseDisplay = document.getElementById("total-expense");
const loginBtn = document.querySelector('#login_page .btn');
const logoutBtn = document.getElementById('Logout');
const addBtn = document.querySelector('#form .btn');
const toggleDark = document.getElementById('toggle-dark');
const categoryInput = document.getElementById("category");


let currentUser = null;

const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

function loadTransactions() {
  return JSON.parse(localStorage.getItem(currentUser)) || [];
}

function saveTransactions(data) {
  localStorage.setItem(currentUser, JSON.stringify(data));
}

function updateDashboard() {
  const data = loadTransactions();
  transactionList.innerHTML = "";
  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.type}: ${item.amount} EGP (${item.category})`;
    transactionList.appendChild(li);
  });

  const income = data
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expense = data
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const total = income - expense;
  incomeDisplay.textContent = `${income} EGP`;
  expenseDisplay.textContent = `${expense} EGP`;
  totalDisplay.textContent = `${total} EGP`;
}

loginBtn.onclick = () => {
  const username = capitalize(usernameInput.value.trim());
  if (!username) return alert("Enter your name");
  currentUser = username;
  dashboardHeading.textContent = `${username}'s Dashboard`;
  loginContainer.style.display = "none";
  app.style.display = "block";
  updateDashboard();
};

logoutBtn.onclick = () => {
  currentUser = null;
  app.style.display = "none";
  loginContainer.style.display = "flex";
  usernameInput.value = "";
};

addBtn.onclick = () => {
  const amount = Number(amountInput.value);
  if (!amount || (!incomeRadio.checked && !expenseRadio.checked)) {
    return alert("Enter amount and select type");
  }

  const type = incomeRadio.checked ? "Income" : "Expense";
  const category = categoryInput.value.trim() || "No Category";
  const data = loadTransactions();
  data.push({ type, amount, category });
  saveTransactions(data);
  updateDashboard();

  amountInput.value = "";
  categoryInput.value = "";
  incomeRadio.checked = false;
  expenseRadio.checked = false;
};

toggleDark.onclick = () => {
  document.body.classList.toggle("dark-mode");
};

