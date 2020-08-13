todoMain();

function todoMain (){
    let input, container, addButton, themeToggle;

    getElements();
    addListeners();

    let presaved = localStorage.getItem('items') ? 
                   JSON.parse(localStorage.getItem('items')) : [];
        
     presaved.forEach(x=> {
         if (x.includes('checked')){
             x = x.split(' ').slice(0, -1).join(" ");
             addItem(x);
             container.firstElementChild.firstElementChild.checked = true;
             fadeItem({target:container.firstElementChild.firstElementChild});
         } else {
             addItem(x);
         }
        });




    function getElements () {
        input = document.getElementsByTagName('input')[0];
        container = document.getElementById('container');
        addButton = document.getElementById('addButton');
        themeToggle = document.getElementById('toggle');
    }
    function addListeners () {
      input.addEventListener('keydown', (event)=>{
          if (event.key == 'Enter' && input.value) {
              presaved.push(input.value);
              localStorage.setItem('items', JSON.stringify(presaved))
              addItem(input.value);
          }
        });

      addButton.addEventListener('click', ()=>{
          if (!input.value) return;
          presaved.push(input.value);
          localStorage.setItem('items', JSON.stringify(presaved));
          addItem(input.value)
      });

      themeToggle.addEventListener('click', toggle);
    }

    function addItem (data) {
        let item = document.createElement('span');
        item.classList.add('item');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `li${(Math.random() * 10).toFixed(3)}`;
        checkbox.addEventListener('click', fadeItem, false);

        let label = document.createElement('LABEL');
        label.innerText = data;
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
        let reg = new RegExp(`${event.target.previousElementSibling.innerHTML}`)
        let ind = presaved.findIndex(e=> reg.test(e));
        presaved.splice(ind,1);
        localStorage.setItem('items', JSON.stringify(presaved));
        event.target.parentElement.remove();
    }

    function fadeItem (event){
        let ele = event.target;
       if (ele.checked) {
           ele.parentElement.style.opacity = '50%';
           ele.nextElementSibling.style.textDecoration = 'line-through';

           presaved[presaved.indexOf(ele.nextElementSibling.innerHTML)] += ' checked';
           localStorage.setItem('items', JSON.stringify(presaved));
        } else {
           ele.parentElement.style.opacity = '100%';
           ele.nextElementSibling.style.textDecoration = 'none';

           let test = presaved.includes(ele.nextElementSibling.innerHTML + " checked");
           if (test){
               let ind = presaved.indexOf(ele.nextElementSibling.innerHTML + " checked");
               presaved.splice(ind, 1, ele.nextElementSibling.innerHTML);
           }
           localStorage.setItem('items', JSON.stringify(presaved));
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
