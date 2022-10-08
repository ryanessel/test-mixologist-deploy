function logoutButton() {
    document.getElementById(`logout`).submit();
}

function changeText() {
    document.getElementById(`inactivateUserSection`).style.display = 'none'
    document.getElementById(`confirmInactivation`).style.display = 'block'
}


// function openIngredient(evt, ingredientName) {
//     // Declare all variables
//     let i, tabcontent, tablinks;
  
//     // Get all elements with class="tabcontent" and hide them
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
  
//     // Get all elements with class="tablinks" and remove the class "active"
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
  
//     // Show the current tab, and add an "active" class to the button that opened the tab
//     document.getElementById(ingredientName).style.display = "block";
//     evt.currentTarget.className += " active";
// }