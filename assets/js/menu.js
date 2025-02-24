const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior


        const url = new URL(this.href);
        const pageParam = url.searchParams.get('page');

        make_all_links_inactive();
        this.classList.add('active');
        if (pageParam) {
            switch (pageParam){
                case "credits":
                    alert("show buy credits window")
                    break;
                case "favourites":
                    alert("if in profiles filter by favourites")
                    break;
                default:
                    window.location.href = this.href;  // Uncomment if needed
            }



        }

        // If you still want to navigate to the link (after processing):
        //
    });
});
function make_all_links_inactive(){
    navLinks.forEach(link => {
        link.classList.remove('active');

    })
}


window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get('page');

    if (currentPage) {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            const linkParams = new URLSearchParams(new URL(link.href).search);
            if (linkParams.get('page') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active'); // Remove from other links
            }
        });
    }
});