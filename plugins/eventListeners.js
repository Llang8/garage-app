/* Toggle Sidebar */
document.addEventListener('click', e => {
    if (e.target == document.getElementsByClassName('sidebar-background')[0]) {
        let sidebar = document.getElementById('sidebar');
        if( sidebar.classList.contains('sidebar-active')) {
            sidebar.classList.remove('sidebar-active');
            document.body.style.overflow = "auto";
        } else {
            sidebar.classList.add('sidebar-active');
            document.body.style.overflowY = "hidden";
        }
    }
})