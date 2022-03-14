
  $(document).ready(function(){
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active_sidebar');
        $('#main').toggleClass('margin');
        // $('.table-responsive').toggleClass('max-width');
        
    });
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $('nav a').each(function () {
        if (this.href === path) {
            $(this).addClass('active');
        }
    });   
});

let submenuAnchor = document.getElementsByClassName('submenu-unique');
let subMenuUl = document.getElementsByClassName('submenu-item');
let rotateIcon = document.getElementsByClassName('rotate-icon');
document.addEventListener("DOMContentLoaded", () => {
    for(let i=0; i<subMenuUl.length; i++){
        subMenuUl[i].style.display = 'none';
     }
  });
for(let i=0; i<submenuAnchor.length; i++){
    submenuAnchor[i].addEventListener('click', subMenuFun);
    function subMenuFun(e){
        let submenuItem = this.nextElementSibling;
        console.log('rotate icon', rotateIcon);
        if(submenuItem.style.display === 'block'){
            submenuItem.style.display = 'none';
            rotateIcon.classList.add('rotate-down');
        }else {
            submenuItem.style.display = 'block';
            rotateIcon.classList.remove('rotate-down');
        }
    }
}


