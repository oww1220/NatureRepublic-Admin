import CommonUI from '@src/CommonUI';

// ---- Toggle ---- //
$(() => {
    const { Event } = CommonUI;

    //real logic
    Event.toggle('.lnb-toggle-bt', '.lnb-area', (logic, layer) => {
        //console.log('toggle');
        logic();
    });
    Event.toggle('.gnb-toggle-bt', null, (logic, layer) => {
        const $target = $('#wrap');
        //console.log('toggle');
        logic();

        if ($('.gnb-toggle-bt').hasClass('on')) {
            $target.addClass('on');
        } else {
            $target.removeClass('on');
        }
    });

    // test logic
    Event.toggle('.toggle_btn', '.toggle_cont', (logic, layer) => {
        console.log('toggle');
        logic();
    });

    Event.toggle('.toggle_btn2', '.toggle_cont2', (logic, layer) => {
        console.log('toggle');
        logic();
    });

    Event.toggle('.toggle_btn3', '.toggle_cont3', (logic, layer) => {
        console.log('toggle');
        logic();
    });

    Event.toggle('.toggle_btn4', '.toggle_cont4', (logic, layer) => {
        console.log('toggle');
        logic();
    });
});
