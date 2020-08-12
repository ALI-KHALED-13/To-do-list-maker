todoMain();

function todoMain (){
    let input, container, addButton, themeToggle;
    getElements();
    addListeners();


    function getElements () {
        input = document.getElementsByTagName('input')[0];
        container = document.getElementsByClassName('container')[0]
        addButton = document.getElementById('addButton');
        themeToggle = document.getElementById('toggle');
    }
    function addListeners () {
      input.addEventListener('keydown', (event)=>{
          if (event.key == 'Enter' && input.value) addItem();
        });
      addButton.addEventListener('click', ()=>{
          if (!input.value) return;
          addItem()
      });
      themeToggle.addEventListener('click', toggle)
    }

    function addItem (event) {
        let item = document.createElement('span');
        item.classList.add('item');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `li${(Math.random() * 10).toFixed(3)}`;
        checkbox.addEventListener('click', fadeItem, false);

        let label = document.createElement('LABEL');
        label.innerText = input.value;
        label.setAttribute('for', checkbox.id);

        let delButton = document.createElement('span');
        delButton.classList.add('delButton');
        delButton.innerText = 'Delete';
        delButton.addEventListener('click', delItem, false);
        
        container.prepend(item);
        item.append(checkbox);
        item.append(label);
        item.append(delButton);
        input.value = '';
    }

    function delItem (event){
        event.target.parentElement.remove();
    }

    function fadeItem (event){
       if (event.target.checked) {
           event.target.parentElement.style.opacity = '50%';
        } else {
           event.target.parentElement.style.opacity = '100%';
        }
    }

    function toggle () {
       let link = document.querySelector('[rel="stylesheet"]');
       if(link.getAttribute('href').includes('Dark')){
           link.setAttribute('href', 'styleLight.css');
       } else {
           link.setAttribute('href', 'styleDark.css')
       };
    }
}