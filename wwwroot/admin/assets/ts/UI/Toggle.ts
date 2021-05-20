import $ from 'jquery';
import CommonUI from '../CommonUI';

// ---- Toggle ---- //
$(() => {
    const { Event } = CommonUI;

    //real logic
    Event.toggle('.lnb-toggle-bt', '.lnb-area', (logic, layer) => {
        //console.log('toggle');
        logic();
    });
    Event.toggle('.gnb-toggle-bt', null, (logic, layer) => {
        console.log('toggle');
        logic();
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
