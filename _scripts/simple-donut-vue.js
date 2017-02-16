var donutChart = new Vue({
    'el': '#donutchart',
    'data': {
        'donut': true,
        'percent': 50
    },
    'watch': {
        'percent': function () {
            // Restricte range of acceptable percents to whole numbers between 0-100
            var wholeNumberValue = Math.round(this.percent);
            var restrictedUpperValue = Math.min(wholeNumberValue, 100);
            var restrictedLowerValue = Math.max(restrictedUpperValue, 0);
            this.percent = restrictedLowerValue;
        }
    },
    'computed': {
        'pie': function () {
            var pie = 'rect(0, 1em, 1em, 0.5em)';
            if (Math.round(this.percent) > 50) {
                pie = 'rect(auto, auto, auto, auto)';
            }
            return pie;
        },
        'leftside': function () {
            var degrees = Math.round(360 * (this.percent / 100));
            var rotation = 'rotate(' + degrees + 'deg)';
            return rotation;
        },
        'rightside': function () {
            var rotation = 'rotate(0deg)';
            if (Math.round(this.percent) > 50) {
                rotation = 'rotate(180deg)';
            }
            return rotation;
        }
    }
});

function updateDonutChart (percent, donut) {
    donutChart.percent = percent;
    donutChart.donut = donut;
}

