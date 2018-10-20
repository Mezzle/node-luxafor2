module.exports = {
    PID: 0xf372,
    VID: 0x04d8,
    COMMAND: {
        SET_COLOR_SIMPLE: 0x00,
        SET_COLOR_FADE: 0x01,
        SET_COLOR_NO_FADE: 0x02,
        STROBE: 0x03,
        WAVE: 0x04,
        PATTERN: 0x06,
        DEVICE_INFO: 0x80
    },
    BYTE: {
        COMMAND: 0x00,
        LED: 0x01,
        PATTERN_ID: 0x01,
        PATTERN_REPEAT: 0x02,
        WAVE_TYPE: 0x01,
        RED: 0x02,
        GREEN: 0x03,
        BLUE: 0x04,
        TIME: 0x05,
        SPEED: 0x05,
        WAVE_PADDING: 0x05,
        STROBE_PADDING: 0x06,
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
        1: 0x01,
        UNKNOWN_2: 0x02,
        2: 0x02,
        UNKNOWN_3: 0x03,
        3: 0x03,
        UNKNOWN_4: 0x04,
        4: 0x04,
        UNKNOWN_5: 0x05,
        5: 0x05
    },
    PATTERNS: {
        UNKNOWN_1: 0x01,
        1: 0x1,
        UNKNOWN_2: 0x02,
        2: 0x02,
        UNKNOWN_3: 0x03,
        3: 0x03,
        UNKNOWN_4: 0x04,
        4: 0x04,
        UNKNOWN_5: 0x05,
        5: 0x05,
        UNKNOWN_6: 0x06,
        6: 0x06,
        UNKNOWN_7: 0x07,
        7: 0x07,
        UNKNOWN_8: 0x08
    },
    COLOR: {
        RED: 0x52,
        GREEN: 0x47,
        BLUE: 0x42,
        CYAN: 0x43,
        MAGENTA: 0x4d,
        YELLOW: 0x59,
        WHITE: 0x57,
        OFF: 0x4f
    },
    ENDPOINT: {
        READ: 129,
        WRITE: 1
    },
    REPLY: {
        OFF: Buffer.from([66, 0, 0, 0, 0, 0, 0, 0]),
        WAVE_1: Buffer.from([0, 1, 0, 0, 0, 0, 0, 0]),
        WAVE_2: Buffer.from([0, 2, 0, 0, 0, 0, 0, 0]),
        WAVE_3: Buffer.from([0, 3, 0, 0, 0, 0, 0, 0]),
        WAVE_4: Buffer.from([0, 4, 0, 0, 0, 0, 0, 0]),
        WAVE_5: Buffer.from([0, 15, 0, 0, 0, 0, 0, 0]),
        STROBE: Buffer.from([0, 5, 0, 0, 0, 0, 0, 0]),
        PATTERN: Buffer.from([0, 9, 0, 0, 0, 0, 0, 0]),
    },
    DEVICE_INFO: function(buffer) {
        return {
            FW_VERSION: buffer.readUInt8(1,1),       // read 1st byte
            SERIAL_NUMBER_H: buffer.readUInt8(2,1),  // 2nd
            SERIAL_NUMBER_L: buffer.readUInt8(3,1)   // 3rd
        };
    }
};
