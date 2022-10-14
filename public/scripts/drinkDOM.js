const removeButtons = document.querySelectorAll(".btn-remove");
  for (var i=0; i<removeButtons.length; i++) { 
    removeButtons[i].onclick= function(){ 
      this.parentElement.parentElement.remove();
    }
  }

  let n = 0

  
function addLine(tableName){

    //console.log(tableName)
   
    const type = document.querySelector(`#ingTypesSelect`).value;
    const name = document.querySelector(`#ingSelect`).value;
    const quanity = document.querySelector(`#ingQuantity`).value;
    //price = Number(price).toFixed(2);
  
    console.log(name)
  const htmlString = `
  <tr>
  <td class="typeColumn">
    <span>${type}</span>
  </td>
  <td class="ingColumn" id="ing${n}">
    <span>${name}</span>
  </td>
  <td class="quantityColumn">
    <span>${quanity}</span>
  </td>
  <td class="actionColumn">
    <a href="#" onclick="removeLine('ingredientTable')">Remove</a>
  </td>
  </tr>`
  
  const newRow = document.createElement("tr");
  //newRow.classList.add(`product`);
  newRow.innerHTML = htmlString;
  document.getElementById(`${tableName}`).appendChild(newRow);
  
    document.getElementById(`ingTypesSelect`).value = '';
    document.getElementById(`ingSelect`).value = '';
    document.getElementById(`ingQuantity`).value = '';
    
n += 1
  }
  
function addLine_v2(tableName){
    
}
