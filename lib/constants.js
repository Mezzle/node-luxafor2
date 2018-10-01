module.exports = {
    PID: 0xf372,
    VID: 0x04d8,
    COMMAND: {
        SET_COLOR_SIMPLE: 0x00,
        SET_COLOR_FADE: 0x01,
        SET_COLOR_NOFAKE: 0x02,
        STROBE: 0x03,
        WAVE: 0x04,
        PATTERN: 0x06
    },
    BYTE: {
        COMMAND: 0x00,
        LED: 0x01,
        WAVE_TYPE: 0x01,
        RED: 0x02,
        GREEN: 0x03,
        BLUE: 0x04,
        TIME: 0x05,
        SPEED: 0x05,
        WAVE_PADDING: 0x05,
        WAVE_REPEAT: 0x06,
        WAVE_SPEED: 0x07,
        STROBE_REPEAT: 0x07
    },
    LED: {
        ALL: 0xff,
        SIDE_A: 0x41,
        SIDE_B: 0x42,
        LED_1: 0x01,
        LED_2: 0x02,
        LED_3: 0x03,
        LED_4: 0x04,
        LED_5: 0x05,
        LED_6: 0x06
    },
    WAVE_TYPE: {
        UNKNOWN_1: 0x01,
        UNKNOWN_2: 0x02,
        UNKNOWN_3: 0x03,
        UNKNOWN_4: 0x04,
        UNKNOWN_5: 0x05
    },
    PATTERNS: {
        UNKNOWN_1: 0x01,
        UNKNOWN_2: 0x02,
        UNKNOWN_3: 0x03,
        UNKNOWN_4: 0x04,
        UNKNOWN_5: 0x05,
        UNKNOWN_6: 0x06,
        UNKNOWN_7: 0x07,
        UNKNOWN_8: 0x08
    }
};