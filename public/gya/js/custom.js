/***************************** 
       GO TO TOP JS
******************************/
var btn = $('#gototop');
$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
    btn.addClass('show');
    } else {
    btn.removeClass('show');
    }
});
btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
});

/************************************** 
       ACOOUNT DROPDOWN MENU JS
**************************************/
const tap = document.querySelector('.title-account');
const toggleMenu = document.querySelector('.account-submenu');
const headerClass = document.querySelector('.header');

tap.addEventListener('click', function(event){
    toggleMenu.classList.toggle('active');
    headerClass.classList.toggle('active-acount-menu');
    event.stopPropagation();
});

document.addEventListener('click', function(event){
    if (!tap.contains(event.target)) {
        toggleMenu.classList.remove('active');
        headerClass.classList.remove('active-acount-menu');
    }
});

//save button
function addSave(item) {
    item.classList.toggle('save-item');
    if (item.classList.contains('save-item')) {
        item.querySelector('.saved').style.display = 'inline';
        item.querySelector('.unsaved').style.display = 'none';
    } else {
        item.querySelector('.saved').style.display = 'none';
        item.querySelector('.unsaved').style.display = 'inline';
    }
}
// toggle icon
function toggleIcon(element) {
    element.classList.toggle('active')
}
// for all modal 
function checkModal() {
    if (document.querySelector('body').classList.contains('modal-open')) {
        document.documentElement.style.overflow='hidden'
    }else {
        document.documentElement.style.overflow='auto'
    } 
}
// Bootstrap's modal events
document.addEventListener('shown.bs.modal', checkModal);
document.addEventListener('hidden.bs.modal', checkModal);

// Function to remove fade class and handle modal interactions
function handleModal(modalId) {
    var modalElement = document.getElementById(modalId);
    if (modalElement) {
        modalElement.classList.remove('fade');

        if (modalId === 'loginModal') {
            var loginFrm = modalElement.querySelector('.login-frm');
            var forgotPassword = modalElement.querySelector('.forgot-frm');
            var forgotAndCreate = modalElement.querySelector('.forgotandcreate');

            modalElement.querySelector('.forgotandcreate .frgtpswd').addEventListener('click', function() {
                loginFrm.classList.add('hide-frm');
                forgotAndCreate.classList.add('hide-frm');
                forgotPassword.classList.remove('hide-frm');
            });
            modalElement.addEventListener('hidden.bs.modal', function() {
                loginFrm.classList.remove('hide-frm');
                forgotAndCreate.classList.remove('hide-frm');
                forgotPassword.classList.add('hide-frm');
            });
        }
    }
}

// Handle the modals
handleModal('loginModal');
handleModal('changepasswordModal');
