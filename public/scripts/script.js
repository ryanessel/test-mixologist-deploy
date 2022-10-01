function logoutButton() {
    document.getElementById(`logout`).submit();
}

function changeText() {
    document.getElementById(`inactivateUserSection`).style.display = 'none'
    document.getElementById(`confirmInactivation`).style.display = 'block'
}