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
    // To add asks
    form.addEventListener('submit', addItem);
    // To remove tasks
    groceryList.addEventListener('click', removeItem);
    // To clear tasks
    clearBtn.addEventListener('click', clearList);
    // To filter tasks
    filter.addEventListener('keyup', filterList);
}

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
    groceryList.appendChild(li);
    // Clear values
    itemInput.value = '';

    event.preventDefault();
}

function removeItem(event){
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            event.target.parentElement.parentElement.remove();
        }
    }
}

function clearList(){
    while(groceryList.firstChild){
        groceryList.removeChild(groceryList.firstChild)
    }
}

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