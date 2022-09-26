function fillData(data, fieldArr) {
  let dataObj = {};
  // const data = [
  //   {
  //     name: "xd",
  //     lastname: "xd last",
  //   },
  //   {
  //     name: "xd2",
  //     lastname: "xd last2",
  //   },
  // ];

  for (const [index, _data] of data.entries()) {
    const name = Object.entries(_data);
    dataObj[fieldArr[index]] = name[2][1];
  }

  console.log(dataObj);
  return dataObj;
}

function clearNumber(number) {
  return number.split("@")[0];
}

function getNextStep(operation, step) {
  const operationStep = stepOperation[operation];
  let nextStep;

  for (const [index, _step] of operationStep.entries()) {
    if (step.localeCompare(_step) === 0) {
      nextStep = stepOperation[operation][index + 1];
    }
  }

  return nextStep;
}

const isFalsy = (value) => !value;
const isWhitespaceString = (value) =>
  typeof value === "string" && /^\s*$/.test(value);

const isEmptyCollection = (value) =>
  (Array.isArray(value) || value === Object(value)) &&
  !Object.keys(value).length;

const isInvalidDate = (value) =>
  value instanceof Date && Number.isNaN(value.getTime());

const isEmptySet = (value) => value instanceof Set && value.size === 0;
const isEmptyMap = (value) => value instanceof Map && value.size === 0;

function isBlank(value) {
  if (isFalsy(value)) return true;
  if (isWhitespaceString(value)) return true;
  if (isEmptyCollection(value)) return true;
  if (isInvalidDate(value)) return true;
  if (isEmptySet(value)) return true;
  if (isEmptyMap(value)) return true;
  return false;
}

const stepOperation = {
  CREATE: ["NAME", "TEXT", "FILE?", "EXPIRATION", "QUESTION", "END"],
  DELETE: ["CLASE", "NAME", "QUESTION", "END"],
};

module.exports = {
  clearNumber,
  stepOperation,
  getNextStep,
  isBlank,
  fillData,
};
