import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_timeline from '@amcharts/amcharts4/plugins/timeline';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);

let chart = am4core.create('chartdiv', am4plugins_timeline.SerpentineChart);
chart.levelCount = 3;

chart.curveContainer.padding(50, 20, 50, 20);

let data = [];
let visits = 100;
for (let i = 0; i < 24; i++) {
    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    data.push({ date: new Date(2018, 0, 1, i), value: visits });
}

chart.data = data;

let dateAxis = chart.xAxes.push(new am4charts.DateAxis<am4plugins_timeline.AxisRendererCurveX>());
dateAxis.renderer.grid.template.location = 0;

dateAxis.renderer.line.disabled = true;
dateAxis.cursorTooltipEnabled = false;
dateAxis.minZoomCount = 5;

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis<am4plugins_timeline.AxisRendererCurveY>());
valueAxis.tooltip.disabled = true;
valueAxis.renderer.innerRadius = -50;
valueAxis.renderer.radius = 50;
chart.seriesContainer.zIndex = -1;

let series = chart.series.push(new am4plugins_timeline.CurveStepLineSeries());
series.fillOpacity = 0.3;
series.dataFields.dateX = 'date';
series.dataFields.valueY = 'value';
series.tooltipText = '{valueY}';
series.tooltip.pointerOrientation = 'vertical';
series.tooltip.background.fillOpacity = 0.7;
series.fill = chart.colors.getIndex(3);
series.strokeWidth = 2;

chart.cursor = new am4plugins_timeline.CurveCursor();
chart.cursor.xAxis = dateAxis;
chart.cursor.yAxis = valueAxis;
chart.cursor.lineY.disabled = true;

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.width = am4core.percent(80);
chart.scrollbarX.align = 'center';
