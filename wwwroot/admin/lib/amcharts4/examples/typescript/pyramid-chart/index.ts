import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

let chart = am4core.create('chartdiv', am4charts.SlicedChart);

chart.data = [
    {
        name: 'The first',
        value: 854,
    },
    {
        name: 'The second',
        value: 245,
    },
    {
        name: 'The third',
        value: 187,
    },
    {
        name: 'The fourth',
        value: 123,
    },
    {
        name: 'The fifth',
        value: 87,
    },
    {
        name: 'The sixth',
        value: 45,
    },
    {
        name: 'The seventh',
        value: 7,
    },
].reverse();

let series = chart.series.push(new am4charts.PyramidSeries());
series.colors.step = 2;
series.dataFields.value = 'value';
series.dataFields.category = 'name';
series.alignLabels = true;
series.labelsContainer.width = 200;
series.labelsContainer.paddingLeft = 15;

chart.legend = new am4charts.Legend();
chart.legend.padding(20, 20, 20, 20);
