import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const Ird = db.define('snmps', {
    ip_control: {
        type: DataTypes.STRING
    },
    ts_bitrate: {
        type: DataTypes.DOUBLE
    },
    video_bitrate: {
        type: DataTypes.DOUBLE
    },
    status_sat: {
        type: DataTypes.STRING
    },
    status_ip: {
        type: DataTypes.STRING
    },
    margin: {
        type: DataTypes.DOUBLE
    },
    service: {
        type: DataTypes.STRING
    },
    kualitas: {
        type: DataTypes.STRING
    },
    status_video: {
        type: DataTypes.STRING
    },
    PID_audio: {
        type: DataTypes.STRING
    },
    PID_audio2: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Ird;