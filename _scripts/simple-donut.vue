<template>
    <div class="donut-size">
        <div :class="donut ? 'donut-graph' : 'pie-graph'" class="pie-wrapper">
            <span class="label">
                <span>{{ percent }}</span><span class="smaller">%</span>
            </span>
            <div class="pie" :style="{ clip: pie }">
                <div class="left-side half-circle" :style="{ 'transform': leftside }"></div>
                <div class="right-side half-circle" :style="{ 'transform': rightside }"></div>
            </div>
            <div class="shadow"></div>
        </div>
    </div>
</template>

<script>
module.exports = {
    name: 'SimpleDonut',
    props: {
        donut: {
            type: Boolean,
            required: false,
            default: true
        },
        percent: {
            type: Number,
            required: false,
            default: 0
        }
    },
    watch: {
        percent: function () {
            var forWholeNumber = Math.round(this.percent);
            var restrictUpperLimit = Math.min(forWholeNumber, 100);
            var restrictLowerLimit = Math.max(restrictUpperLimit, 0);
            this.percent = restrictLowerLimit;
        }
    },
    computed: {
        pie: function () {
            var pie = 'rect(0, 1em, 1em, 0.5em)';
            if (Math.round(this.percent) > 50) {
                pie = 'rect(auto, auto, auto, auto)';
            }
            return pie;
        },
        leftside: function () {
            var degrees = Math.round(360 * (this.percent / 100));
            var rotation = 'rotate(' + degrees + 'deg)';
            return rotation;
        },
        rightside: function () {
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
        border: 0.1em solid #1ABC9C;
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
        font-size: 0.25em;
        line-height: 2.6em;
        text-align: center;
        cursor: default;
        z-index: 2;
    }
    .donut-graph .label {
        color: #7F8C8D;
    }
    .pie-graph .label {
        color: #50676D;
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
