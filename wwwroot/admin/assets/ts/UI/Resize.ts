// ---- resize ---- //

const chkresizeSidebar = () => {
    const viewportWidth = $(window).width();
    const $target = $('.page-container');
    if (viewportWidth! < 1700) {
        $target.addClass('sidebar-collapsed');
    } else {
        $target.removeClass('sidebar-collapsed');
    }
};

$(() => {
    chkresizeSidebar();
});

$(window).on('resize', () => {
    chkresizeSidebar();
});
