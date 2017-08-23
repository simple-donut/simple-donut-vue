<template>
    <div class="donut-size">
        <div :class="[donut ? 'donut-graph' : 'pie-graph', 'pie-wrapper']">
            <span class="label">
                <span>{{percent}}</span><span class="smaller">%</span>
            </span>
            <div class="pie" :style="{clip: pie}">
                <div class="left-side half-circle" :style="{transform: leftside}"></div>
                <div class="right-side half-circle" :style="{transform: rightside}"></div>
            </div>
            <div class="shadow"></div>
        </div>
    </div>
</template>

<script>
module.exports = {
    data: function () {
        return {
            'donut': true,
            'percent': 50
        };
    },
    watch: {
        'percent': function () {
            // Restricte range of acceptable percents to whole numbers between 0-100
            var wholeNumberValue = Math.round(this.percent);
            var restrictedUpperValue = Math.min(wholeNumberValue, 100);
            var restrictedLowerValue = Math.max(restrictedUpperValue, 0);
            this.percent = restrictedLowerValue;
        }
    },
    computed: {
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
};
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Lato:700");

    .donut-size {
        font-size: 12em;
    }

    .pie-wrapper {
        position: relative;
        width: 1em;
        height: 1em;
        margin: 0px auto;
        font-family: "Lato", Tahoma, Geneva, sans-serif;
    }
    .pie-wrapper .pie {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        clip: rect(0, 1em, 1em, 0.5em);
    }
    .pie-wrapper .half-circle {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        border: 0.1em solid #1abc9c;
        border-radius: 50%;
        clip: rect(0em, 0.5em, 1em, 0em);
        box-sizing: border-box;
    }
    .pie-wrapper .right-side {
        transform: rotate(0deg);
    }
    .pie-wrapper .label {
        position: absolute;
        top: 0.52em;
        right: 0.4em;
        bottom: 0.4em;
        left: 0.4em;
        display: block;
        background: none;
        border-radius: 50%;
        color: #7F8C8D;
        font-size: 0.25em;
        line-height: 2.6em;
        text-align: center;
        cursor: default;
        z-index: 2;
    }
    .pie-wrapper .smaller {
        padding-bottom: 20px;
        color: #BDC3C7;
        font-size: 0.45em;
        vertical-align: super;
    }
    .pie-wrapper .shadow {
        width: 100%;
        height: 100%;
        border: 0.1em solid #BDC3C7;
        border-radius: 50%;
        box-sizing: border-box;
    }

    .pie-wrapper.donut-graph .right-side,
    .pie-wrapper.donut-graph .left-side,
    .pie-wrapper.donut-graph .shadow {
        border-width: 0.1em;
    }

    .pie-wrapper.pie-graph .right-side,
    .pie-wrapper.pie-graph .left-side,
    .pie-wrapper.pie-graph .shadow {
        border-width: 0.5em;
    }
    .pie-wrapper.pie-graph .smaller {
        color: #7F8C8D;
    }
</style>
