<template>
    <div
            :class="[
      'el-color-picker',
      disabled ? 'is-disabled' : '',
      colorSize ? `el-color-picker--${ colorSize }` : ''
    ]"
            v-clickoutside="hide">
        <div class="el-color-picker__mask" v-if="disabled"></div>
        <div class="el-color-picker__trigger" @click="toggle">
        <span class="el-color-picker__color" :class="{ 'is-alpha': showAlpha }">



            <span class="el-color-picker__color-inner"
                  ref="button"
                  :style="{
            backgroundColor: displayedColor
          }"></span>
            <span class="el-color-picker__empty el-icon-close" v-if="!value && !showPanelColor"></span>
        </span>
            <span class="el-color-picker__icon el-icon-arrow-down" v-show="value || showPanelColor"></span>
        </div>
        <picker-dropdown
                ref="dropdown"
                :class="['el-color-picker__panel', popperClass || '']"
                v-model="showPicker"
                @pick="confirmValue"
                @clear="clearValue"
                :color="color"
                :show-alpha="showAlpha">
        </picker-dropdown>
        <ui-popover :trigger="trigger" :open="pickerVisible" @close="handleClose">
            <ui-menu>
                <ui-menu-item title="Refresh"/>
                <ui-menu-item title="Send feedback"/>
                <ui-menu-item title="Settings"/>
                <ui-menu-item title="Help"/>
                <ui-menu-item title="Sign out"/>
            </ui-menu>
        </ui-popover>
    </div>
</template>

<script>
    /* eslint-disable */
    import Color from './color';
    import PickerDropdown from './components/picker-dropdown.vue';

    export default {
        name: 'ElColorPicker',
        data: {
            open: false,
            trigger: null
        },
        props: {
            value: String,
            showAlpha: Boolean,
            colorFormat: String,
            disabled: Boolean,
            size: String,
            popperClass: String
        },
        computed: {
            displayedColor() {
                if (!this.value && !this.showPanelColor) {
                    return 'transparent';
                } else {
                    const {r, g, b} = this.color.toRgb();
                    return this.showAlpha
                            ? `rgba(${ r }, ${ g }, ${ b }, ${ this.color.get('alpha') / 100 })`
                            : `rgb(${ r }, ${ g }, ${ b })`;
                }
            },

            _elFormItemSize() {
                return (this.elFormItem || {}).elFormItemSize;
            },

            colorSize() {
                return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
            }
        },
        watch: {
            value(val) {
                if (!val) {
                    this.showPanelColor = false;
                } else if (val && val !== this.color.value) {
                    this.color.fromString(val);
                }
            },
            color: {
                deep: true,
                handler() {
                    this.showPanelColor = true;
                }
            },
            displayedColor(val) {
                this.$emit('active-change', val);
            }
        },
        methods: {
            toggle () {
                this.open = !this.open
            },
            handleClose (e) {
                this.open = false
            },
            handleTrigger() {
                if (this.disabled) return;
                this.showPicker = !this.showPicker;
            },
            confirmValue(value) {
                this.$emit('input', this.color.value);
                this.$emit('change', this.color.value);
                this.showPicker = false;
            },
            clearValue() {
                this.$emit('input', null);
                this.$emit('change', null);
                this.showPanelColor = false;
                this.showPicker = false;
                this.resetColor();
            },
            hide() {
                this.showPicker = false;
                this.resetColor();
            },
            resetColor() {
                this.$nextTick(_ => {
                    if (this.value) {
                        this.color.fromString(this.value);
                    } else {
                        this.showPanelColor = false;
                    }
                });
            }
        },
        mounted() {
            const value = this.value;
            if (value) {
                this.color.fromString(value);
            }
            this.trigger = this.$refs.button.$el
        },

        data() {
            const color = new Color({
                enableAlpha: this.showAlpha,
                format: this.colorFormat
            });
            return {
                color,
                showPicker: false,
                showPanelColor: false
            };
        },

        components: {
            PickerDropdown
        }
    };
</script>
