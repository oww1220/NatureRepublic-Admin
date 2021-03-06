import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

let chart = am4core.create('chartdiv', am4charts.XYChart);

chart.data = [
    {
        country: 'USA',
        visits: 3025,
    },
    {
        country: 'China',
        visits: 1882,
    },
    {
        country: 'Japan',
        visits: 1809,
    },
    {
        country: 'Germany',
        visits: 1322,
    },
    {
        country: 'UK',
        visits: 1122,
    },
    {
        country: 'France',
        visits: 1114,
    },
    {
        country: 'India',
        visits: 984,
    },
    {
        country: 'Spain',
        visits: 711,
    },
    {
        country: 'Netherlands',
        visits: 665,
    },
    {
        country: 'Russia',
        visits: 580,
    },
    {
        country: 'South Korea',
        visits: 443,
    },
    {
        country: 'Canada',
        visits: 441,
    },
];

chart.padding(40, 40, 40, 40);
chart.maskBullets = false; // allow bullets to go out of plot area

let label = chart.plotContainer.createChild(am4core.Label);
label.text = "Drag column bullet to change it's value";
label.y = 92;
label.x = am4core.percent(100);
label.horizontalCenter = 'right';
label.zIndex = 100;
label.fillOpacity = 0.7;

// category axis
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = 'country';
categoryAxis.renderer.minGridDistance = 60;
categoryAxis.renderer.grid.template.disabled = true;
categoryAxis.renderer.line.disabled = true;

// value axis
let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
// we set fixed min/max and strictMinMax to true, as otherwise value axis will adjust min/max while dragging and it won't look smooth
valueAxis.min = 0;
valueAxis.max = 3500;
valueAxis.strictMinMax = true;
valueAxis.renderer.line.disabled = true;
valueAxis.renderer.minWidth = 40;

// series
let series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryX = 'country';
series.dataFields.valueY = 'visits';
series.tooltip.pointerOrientation = 'vertical';
series.tooltip.dy = -8;

// label bullet
let labelBullet = new am4charts.LabelBullet();
series.bullets.push(labelBullet);
labelBullet.label.text = "{valueY.value.formatNumber('#.')}";
labelBullet.strokeOpacity = 0;
labelBullet.stroke = am4core.color('#dadada');
labelBullet.dy = -20;

// series bullet
let bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.stroke = am4core.color('#ffffff');
bullet.strokeWidth = 3;
bullet.defaultState.properties.opacity = 0;

// resize cursor when over
bullet.cursorOverStyle = am4core.MouseCursorStyle.verticalResize;
bullet.draggable = true;
bullet.circle.radius = 8;

// create hover state
let hoverState = bullet.states.create('hover');
hoverState.properties.opacity = 1; // visible when hovered

// while dragging
bullet.events.on('drag', (event) => {
    handleDrag(event);
});

bullet.events.on('dragstop', (event) => {
    handleDrag(event);
    let dataItem = <am4charts.ColumnSeriesDataItem>event.target.dataItem;
    dataItem.column.isHover = false;
    event.target.isHover = false;
});

function handleDrag(event) {
    let dataItem = <am4charts.ColumnSeriesDataItem>event.target.dataItem;
    // convert coordinate to value
    let value = valueAxis.yToValue(event.target.pixelY);
    // set new value
    dataItem.valueY = value;
    // make column hover
    dataItem.column.isHover = true;
    // hide tooltip not to interrupt
    dataItem.column.hideTooltip(0);
    // make bullet hovered (as it might hide if mouse moves away)
    event.target.isHover = true;
}

// column template
let columnTemplate = series.columns.template;
columnTemplate.column.cornerRadiusTopLeft = 8;
columnTemplate.column.cornerRadiusTopRight = 8;
columnTemplate.fillOpacity = 0.8;
columnTemplate.tooltipText = 'drag me';
columnTemplate.tooltipY = 0; // otherwise will point to middle of the column
columnTemplate.strokeOpacity = 0;

// hover state
let columnHoverState = columnTemplate.column.states.create('hover');
columnHoverState.properties.fillOpacity = 1;
// you can change any property on hover state and it will be animated
columnHoverState.properties.cornerRadiusTopLeft = 35;
columnHoverState.properties.cornerRadiusTopRight = 35;

// show bullet when hovered
columnTemplate.events.on('over', (event) => {
    let dataItem = <am4charts.ColumnSeriesDataItem>event.target.dataItem;
    let itemBullet = dataItem.bullets.getKey(bullet.uid);
    itemBullet.isHover = true;
});

// hide bullet when mouse is out
columnTemplate.events.on('out', (event) => {
    let dataItem = <am4charts.ColumnSeriesDataItem>event.target.dataItem;
    let itemBullet = dataItem.bullets.getKey(bullet.uid);
    // hide it later for touch devices to see it longer
    itemBullet.isHover = false;
});

// start dragging bullet even if we hit on column not just a bullet, this will make it more friendly for touch devices
columnTemplate.events.on('down', (event) => {
    let dataItem = <am4charts.ColumnSeriesDataItem>event.target.dataItem;
    let itemBullet = dataItem.bullets.getKey(bullet.uid);
    itemBullet.dragStart(event.pointer);
});

// when columns position changes, adjust minX/maxX of bullets so that we could only drag vertically
columnTemplate.events.on('positionchanged', (event) => {
    let dataItem = <am4charts.ColumnSeriesDataItem>event.target.dataItem;
    let itemBullet = dataItem.bullets.getKey(bullet.uid);

    let column = dataItem.column;
    itemBullet.minX = column.pixelX + column.pixelWidth / 2;
    itemBullet.maxX = itemBullet.minX;
    itemBullet.minY = 0;
    itemBullet.maxY = chart.seriesContainer.pixelHeight;
});

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
columnTemplate.adapter.add('fill', (fill, target) => {
    return chart.colors.getIndex(target.dataItem.index).saturate(0.3);
});

bullet.adapter.add('fill', (fill, target) => {
    return chart.colors.getIndex(target.dataItem.index).saturate(0.3);
});
