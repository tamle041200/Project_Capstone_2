function getId(id) {
  return document.getElementById(id);
}
class Validation {
  checkEmpty(value, divId, mess) {
    if (value === "") {
      getId(divId).innerHTML = mess;
      getId(divId).style.display = "block";
      return false;
    }
    getId(divId).innerHTML = "";
    getId(divId).style.display = "none";
    return true;
  }
  checkSelectOption(idSelect, divId, mess) {
    const element = getId(idSelect);
    if (element.selectedIndex !== 0) {
      getId(divId).innerHTML = "";
      getId(divId).style.display = "none";
      return true;
    }
    getId(divId).innerHTML = mess;
    getId(divId).style.display = "block";
    return false;
  }
}
export default Validation;
