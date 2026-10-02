// Static employee data (no database or server needed)
const employees = [
  { name: "Ayesha Khan", role: "Store Manager", department: "Operations", email: "ayesha.khan@giftnest.example", joined: "2021-03-14", status: "Active" },
  { name: "Hamza Ali", role: "Online Order Coordinator", department: "Sales", email: "hamza.ali@giftnest.example", joined: "2022-07-01", status: "Remote" },
  { name: "Sara Ahmed", role: "Jewellery Designer", department: "Design", email: "sara.ahmed@giftnest.example", joined: "2020-11-23", status: "Active" },
  { name: "Bilal Raza", role: "Delivery Supervisor", department: "Logistics", email: "bilal.raza@giftnest.example", joined: "2023-01-09", status: "On leave" },
  { name: "Fatima Noor", role: "Sales Analyst", department: "Sales", email: "fatima.noor@giftnest.example", joined: "2022-02-18", status: "Active" },
  { name: "Usman Tariq", role: "Gift Box Packer", department: "Operations", email: "usman.tariq@giftnest.example", joined: "2021-09-06", status: "Active" },
  { name: "Zainab Malik", role: "Customer Support Lead", department: "Support", email: "zainab.malik@giftnest.example", joined: "2019-05-20", status: "Remote" },
  { name: "Ali Hassan", role: "Warehouse Associate", department: "Logistics", email: "ali.hassan@giftnest.example", joined: "2020-02-10", status: "On leave" },
  { name: "Maryam Siddiqui", role: "Social Media Designer", department: "Design", email: "maryam.siddiqui@giftnest.example", joined: "2023-06-12", status: "Active" }
];

// Bootstrap badge colour for each status
const statusColors = {
  "Active": "success",
  "Remote": "info",
  "On leave": "warning"
};

// Count how many employees have a given status
function countByStatus(status) {
  return employees.filter(function (employee) {
    return employee.status === status;
  }).length;
}

// Fill the summary cards
document.getElementById("count-total").textContent = employees.length;
document.getElementById("count-active").textContent = countByStatus("Active");
document.getElementById("count-remote").textContent = countByStatus("Remote");
document.getElementById("count-leave").textContent = countByStatus("On leave");

// Fill the employee table
const tableBody = document.getElementById("employee-rows");
tableBody.innerHTML = employees.map(function (employee) {
  return `
    <tr>
      <td class="fw-semibold">${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.department}</td>
      <td>${employee.email}</td>
      <td>${employee.joined}</td>
      <td><span class="badge text-bg-${statusColors[employee.status]}">${employee.status}</span></td>
    </tr>`;
}).join("");

// Greet the logged-in user by first name (if there is one)
const currentUser = JSON.parse(localStorage.getItem("giftnestCurrentUser"));
if (currentUser) {
  document.getElementById("welcome-name").textContent = ", " + currentUser.name.split(" ")[0];
}