class Utils {
  static emptyElement(element) {
    element.innerHTML = '';
  }

  static showElement(element) {
    element.style.display = 'block';
  }

  static hideElement(element) {
    element.style.display = 'none';
  }

  static isValidInteger(newValue) {
    return Number.isInteger(newValue);
  }
}

export default Utils;
