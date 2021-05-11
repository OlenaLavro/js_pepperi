const root = document.querySelector('#root');
const nameValueList = root.querySelector('#nameValueList');

const isInputValid = function (input) {
    return input.match(/^\w+\s*=\s*\w+$/i) !== null;
}

const addButtonHandler = function () {
    const nameValueInputted = root.querySelector('#nameValue');

    if (isInputValid(nameValueInputted.value)) {
        let lastIndexOfNameValueElem = Number(nameValueList.lastChild.id) || 0;
        nameValueList.insertAdjacentHTML('beforeend', `<li id="${lastIndexOfNameValueElem + 1}">${nameValueInputted.value}</li>`);
    }
    nameValueInputted.value = '';
}

const getNamesOrValuesList = function (fieldToSort) {
    return Array.from(nameValueList.children).map(el => el.innerHTML.split('=')[fieldToSort]);
}

const setNewValueToList = function (sortedArr, IndexOfFieldToSort) {
    Array.from(nameValueList.children).map((element, index) => {
        const newPairWithSortedField = element;
        const splittedTextContent = element.innerHTML.split('=');
        splittedTextContent[IndexOfFieldToSort] = sortedArr[index];
        newPairWithSortedField.innerHTML = splittedTextContent.join('=');
        return newPairWithSortedField;
    });
}

function sortButtonHandler(button) {
    const SORT_BY_NAMES = 0;
    const SORT_BY_VALUES = 1;
    const sortKeys = {
        'sortByNameButton': SORT_BY_NAMES,
        'sortByValueButton': SORT_BY_VALUES
    }

    const sortedArr = getNamesOrValuesList(sortKeys[button]).sort((rowA, rowB) => rowA > rowB ? 1 : -1);
    setNewValueToList(sortedArr, sortKeys[button]);

}

const clearButtonHandler = function () {
    nameValueList.textContent = ' ';
}

const selectHandler = function (itemFromList) {
   itemFromList.tagName == 'LI' && itemFromList.classList.toggle('selected')
}

const deleteButtonHandler = function(){
   Array.from(nameValueList.children).forEach((item) => {
    item.classList.contains('selected') && item.remove();
   })

}

const toXml = (data) => {
    const root = document.createElement('root');

    data.forEach(el => {
        const item = document.createElement('item');

        const name = document.createElement('name');
        name.textContent = el.textContent.split('=')[0];
        item.append(name);

        const value = document.createElement('value');
        value.textContent = el.textContent.split('=')[1];
        item.append(value);

        root.append(item);
    });

    return root;
}

const showXmlButtonHandler = function () {
    const data = toXml(Array.from(nameValueList.children));
    alert((new XMLSerializer()).serializeToString(data))
}

const rootHandler = function (obj) {
    const HANDLE_BUTTONS = {
        'addPairButton': addButtonHandler,
        'sortByNameButton': sortButtonHandler,
        'sortByValueButton': sortButtonHandler,
        'clearButton': clearButtonHandler,
        'deleteButton':deleteButtonHandler,
        'showXmlButton': showXmlButtonHandler
    }

    HANDLE_BUTTONS.hasOwnProperty(obj) && HANDLE_BUTTONS[obj](obj);
}

nameValueList.addEventListener('click', (event) => selectHandler(event.target));

root.addEventListener('click', (event) => rootHandler(event.target.id));



