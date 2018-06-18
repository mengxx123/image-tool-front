<template>
    <transition name="el-zoom-in-top">
        <div class="el-color-dropdown">
            <div class="el-color-dropdown__main-wrapper">
                <hue-slider ref="hue" :color="color" vertical></hue-slider>
                <sv-panel ref="sl" :color="color"></sv-panel>
            </div>
            <alpha-slider v-if="showAlpha" ref="alpha" :color="color"></alpha-slider>
            <div class="el-color-dropdown__btns">
                <ui-text-field class="el-color-dropdown__value" hintText=""
                               v-model="customInput"
                               @keyup.native.enter="handleConfirm"
                               @blur="handleConfirm"/>
                <!--<span class="el-color-dropdown__value">-->
                    <!--<input v-model="customInput"-->
                         <!--@keyup.native.enter="handleConfirm"-->
                         <!--@blur="handleConfirm">-->
                <!--</span>-->
                <!--{{ color.value }}-->
                <ui-flat-button class="el-color-dropdown__link-btn"
                                  label="清空"
                                  @click="$emit('clear')"/>
                <ui-raised-button class="el-color-dropdown__link-btn"
                                  label="确定"
                                  @click="confirmValue"/>
            </div>
        </div>
    </transition>
</template>

<script>
    /* eslint-disable */
    import SvPanel from './sv-panel';
    import HueSlider from './hue-slider';
    import AlphaSlider from './alpha-slider';

    export default {
        name: 'el-color-picker-dropdown',

//    mixins: [Popper],

        components: {
            SvPanel,
            HueSlider,
            AlphaSlider,
        },

        props: {
            color: {
                required: true
            },
            showAlpha: Boolean
        },

        data() {
            return {
                customInput: ''
            };
        },
        computed: {
            currentColor() {
                const parent = this.$parent;
                return !parent.value && !parent.showPanelColor ? '' : parent.color.value;
            }
        },
        methods: {
            confirmValue() {
                this.$emit('pick');
            },
            handleConfirm() {
                console.log('picker')
                const valid = this.showAlpha ? this.validRGBA(this.customInput) : this.validRGBHex(this.customInput);
                if (valid) {
                    this.color.fromString(this.customInput);
                } else {
                    this.customInput = this.currentColor;
                }
            },
            validRGBHex(color) {
                return /^#[A-Fa-f0-9]{6}$/.test(color);
            },
            validRGBA(color) {
                const matches = color.match(/^rgba\((\d+), ?(\d+), ?(\d+), ?([.0-9]+)\)$/);
                if (!matches) return false;
                const list = matches.map(v => parseInt(v, 10)).slice(1);
                if (list.some(v => isNaN(v))) return false;
                const [r, g, b, a] = list;
                if ([r, g, b].some(v => v < 0 || v > 255) || a < 0 || a > 1) return false;
                return true;
            },
            update() {
                this.$nextTick(() => {
                    const {sl, hue, alpha} = this.$refs;
                    sl && sl.update();
                    hue && hue.update();
                    alpha && alpha.update();
                });
            }
        },
        mounted() {
            this.$parent.popperElm = this.popperElm = this.$el;
            this.referenceElm = this.$parent.$el;
        },
        watch: {
            color: {
                handler: function (newVal) {
                    this.customInput = newVal.value;
                },
                deep: true
            }
        }
    };
</script>
