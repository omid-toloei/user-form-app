const tableBody = document.querySelector("#tableBody");

// take user entered inputs
const userEnteredName = document.querySelector("#userEnteredName");
const userEnteredFamily = document.querySelector("#userEnteredFamily");
const userEnteredAge = document.querySelector("#userEnteredAge");
const userEnteredPhoneNumber = document.querySelector("#userEnteredPhoneNumber");

const showInputError = document.querySelector("#input-error");

const addBtn = document.querySelector("#addBtn");
const deleteAllUserDataBtn = document.querySelector("#deleteAllUserData");

document.querySelector(".main-section").addEventListener("submit", (e) => {
  e.preventDefault();
  setUserData();
});

function MakeDataObject(name, family, age, phonenumber) {
  this.name = name;
  this.family = family;
  this.age = age;
  this.phonenumber = phonenumber;
}

deleteAllUserDataBtn.addEventListener("click", () => {
  localStorage.removeItem("userData");
  window.location.reload();
});

function setUserData() {
  // take user entered values
  const userNameData = userEnteredName.value;
  const userFamilyData = userEnteredFamily.value;
  const userAgeData = userEnteredAge.value;
  const userPhoneNumberData = userEnteredPhoneNumber.value;

  function MakeDataObject(name, family, age, phonenumber) {
    this.name = name;
    this.family = family;
    this.age = age;
    this.phonenumber = phonenumber;
  }

  let makedNewObject;
  
  if(userNameData == "" || userFamilyData == "" || userAgeData == "" || userPhoneNumberData == "") {
    alert("یکی از مقادیر خالی میباشد!");
    return;
  } else {
    makedNewObject = new MakeDataObject(userNameData, userFamilyData, userAgeData, userPhoneNumberData);
  }
  let allUsersDataArray = JSON.parse(localStorage.getItem("userData")) || [];
  allUsersDataArray.push(makedNewObject);

  localStorage.setItem("userData", JSON.stringify(allUsersDataArray));

  userEnteredName.value = "";
  userEnteredFamily.value = "";
  userEnteredAge.value = "";
  userEnteredPhoneNumber.value = "";

  showData();
}

showData();
function showData() {
  let getLocalStorageData = localStorage.getItem("userData");
  const parseGetLocalStorageData = JSON.parse(getLocalStorageData);

  let listData;
  if(parseGetLocalStorageData == null) {
    listData = [];
  } else {
    listData = parseGetLocalStorageData;
  }
  
  let newTag = '';
  listData.forEach((element) => {
    newTag += `<tr><td>${element.name}</td><td>${element.family}</td><td>${element.age}</td><td>${element.phonenumber}</td></tr>`;
  });
  
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = newTag;
}