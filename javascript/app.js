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

  let makedNewObject;
  
  if(userNameData == "" || userFamilyData == "" || userAgeData == "" || userPhoneNumberData == "") {
    alert("یکی از مقادیر خالی میباشد!");
    return;
  } else {
    makedNewObject = new MakeDataObject(userNameData, userFamilyData, userAgeData, userPhoneNumberData);
  }
  if(userAgeData < 1) {
    alert("سن کوچکتر از حد مجاز است!");
    return;
  }
  if(userPhoneNumberData.length < 11 || userPhoneNumberData.length > 11) {
    alert("تعداد اعداد شماره تلفن باید 11 تا باشد!");
    return;
  }
  if(userAgeData < 1 || userAgeData.length > 3) {
    alert("سن معتبر نمیباشد");
    return;
  }
  if(userNameData.length > 16) {
    alert("تعداد کاراکتر های نام بزرگتر از حد مجاز!");
    return;
  }
  if(userFamilyData.length > 12) {
    alert("تعداد کاراکتر های نام خانوادگی بزرگتر از حد مجاز!");
    return;
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
  listData.forEach((element, index) => {
    newTag += `<tr>
    <td>${element.name}</td>
    <td>${element.family}</td>
    <td>${element.age}</td>
    <td>${element.phonenumber}</td>
    <td><div class="td-actions">
    <button class="edit-btn" type="button"><img src="../pictures/edit-icon.png"></button>
    <button class="remove-btn" onclick="deleteThisTd(${index})" type="button"><img src="../pictures/trash-can-icon.png"></button>
    </div></td></tr>`;
  });
  
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = newTag;
}

function deleteThisTd(index) {
  let getLocalStorageData = localStorage.getItem("userData");
  let parseGetLocalStorageData = JSON.parse(getLocalStorageData);

  parseGetLocalStorageData.splice(index, 1);
  localStorage.setItem("userData", JSON.stringify(parseGetLocalStorageData));
  
  showData();
}