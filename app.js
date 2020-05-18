// Variables
const form = document.getElementById('grocery-form');
const groceryList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-list');
const filter = document.getElementById('filter');
const itemInput = document.getElementById('item');

// To load event
loadEventListener();

// Event List
function loadEventListener(){
    //To load DOM
    document.addEventListener('DOMContentLoaded', loadItem);
    // To add asks
    form.addEventListener('submit', addItem);
    // To remove tasks
    groceryList.addEventListener('click', removeItem);
    // To clear tasks
    clearBtn.addEventListener('click', clearList);
    // To filter tasks
    filter.addEventListener('keyup', filterList);
}

// Load item function
function loadItem(){
    let items;
    // Get local storage
    if(localStorage.getItem('items') === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    // To load local storage
    items.forEach(function(item){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(item));
        // To add link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // To append link to li
        li.appendChild(link);
        // To append li to grocery list
        groceryList.appendChild(li);
        
        
        event.preventDefault();
    })
}

// Add item event
function addItem(event){
    // To check if input empty
    if(itemInput.value === ''){
        alert('Please add item..')
    }
    // To add li
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(itemInput.value));
    // To add link
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // To append link to li
    li.appendChild(link);
    // To append li to grocery list
    if(itemInput.value){
        groceryList.appendChild(li);
    }
    // To save task
    saveItem(itemInput.value);
    // Clear values
    itemInput.value = '';

    event.preventDefault();
}

// Save item function
function saveItem(item){
    let items;
    // Get local storage
    if(localStorage.getItem('items') === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    // Add item to local storage
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));

    event.preventDefault();
}

// Remove item event
function removeItem(event){
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            event.target.parentElement.parentElement.remove();
        }
    }
    removeItemFromStorage(event.target.parentElement.parentElement);
}

// Remove item from local storage
function removeItemFromStorage(itemOnList){
    let items;
    // Get local storage
    if(localStorage.getItem('items') === null){
        item = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    // To remove from local storage
    items.forEach(function(item, index){
        if(itemOnList.textContent === item){
            items.splice(index, 1);
        }
    })

    localStorage.setItem('items', JSON.stringify(items));
} 

// Clear list event
function clearList(){
    while(groceryList.firstChild){
        groceryList.removeChild(groceryList.firstChild)
    }
    // To clear list from local storage
    clearStorage();
}

function clearStorage(){
    localStorage.clear();
}


// Filter list event
function filterList(event){
    const text = event.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(item){
        const groceryItem = item.firstChild.textContent;
        if(groceryItem.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
}