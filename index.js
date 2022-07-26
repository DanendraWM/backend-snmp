import express from "express";
import snmp from 'snmp-node';
import db from './config/database.js'
import cors from "cors"
import Ird from "./models/irdModel.js";
// import irdRoutes from './routes/irdRoute.js'

const app = express();
const session = new snmp.Session();
try {
    await db.authenticate();
    const count = await Ird.count();
    console.log('connected database');
    setInterval(() => {
        var obj_id = ['.1.3.6.1.4.1.1773.1.3.208.2.2.6.0', '.1.3.6.1.4.1.1773.1.3.208.4.1.2.0', '.1.3.6.1.4.1.1773.1.3.208.2.2.2.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.9.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.3.0', '.1.3.6.1.4.1.1773.1.3.208.2.1.19.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.8.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.7.0', '.1.3.6.1.4.1.1773.1.3.208.2.1.8.0', '.1.3.6.1.4.1.1773.1.3.208.3.4.2.1.2.1', '.1.3.6.1.4.1.1773.1.3.208.3.4.2.1.2.2', '.1.3.6.1.4.1.1773.1.3.208.4.1.18.0', '.1.3.6.1.4.1.1773.1.3.208.1.1.1.0'];
        for (let id = 1; id <= count; id++) {
            let ip = id + 1
            session.getAll({ oids: obj_id, host: `192.168.112.${ip}`, community: 'public' }, function (error, data) {
                try {
                    const margin = data[0].value.replace(' +', '').replace('dB', '');
                    let service_selected = data[1].value;
                    const status_sat = data[2].value;
                    const bitrate = data[3].value;
                    let status_video = data[4].value;
                    let status_ip = data[5].value;
                    const kualitas = `${data[6].value}x${data[7].value}`
                    console.log(`margin : ${margin}`);
                    console.log(`service id : ${service_selected}`);
                    console.log(`status satelit : ${status_sat}`);
                    console.log(`bitrate : ${bitrate}`);
                    if (status_video == 0) {
                        console.log("status video : Video Running");
                        status_video = "Video Running"
                    } else if (status_video == 1) {
                        console.log("status video : Video Stopped");
                        status_video = "Video Stopped"
                    } else if (status_video == 2) {
                        console.log("status video : Video Error");
                        status_video = "Video Error"
                    } else if (status_video == 3) {
                        console.log("status video : Unlicensed");
                        status_video = "Unlicensed"
                    }
                    if (status_ip == 1) {
                        console.log("status ip : LOCKED");
                        status_ip = "LOCKED"
                    } else if (status_ip == 0) {
                        console.log("status ip : UNLOCKED");
                        status_ip = "UNLOCKED"
                    }

                    console.log(`kualitas : ${kualitas}`);
                    let ts_bitrate = data[8].value;
                    console.log(`ts_bitrate : ${ts_bitrate}`)
                    let pid_audio1 = data[9].value;
                    console.log(`PID_audio 1 : ${pid_audio1}`)
                    let pid_audio2 = data[10].value;
                    console.log(`PID_audio 2 : ${pid_audio2}`)
                    var banyak_service = data[11].value;
                    var temperature = data[12].value;
                    console.log(`Temperature : ${temperature}`)
                    let serve = banyak_service + 1
                    var objid_serv = []
                    var service = "NO SELECTION"
                    for (let ray = 2; ray <= serve; ray++) {
                        objid_serv.push(`.1.3.6.1.4.1.1773.1.3.208.4.1.1.1.2.${ray}`);
                    }
                    session.getAll({ oids: objid_serv, host: `192.168.112.${ip}`, community: 'public' }, function (error, hasil) {
                        for (let index = 0; index < banyak_service; index++) {
                            if (parseInt(service_selected) === parseInt(hasil[index].value)) {
                                service = hasil[index].value.replace('    ', '');
                                console.log(service)
                            }
                        }
                        db.query(`UPDATE snmps SET video_bitrate = '${bitrate}', kualitas = '${kualitas}', status_sat = '${status_sat}', margin = '${margin}', status_ip = '${status_ip}', service = '${service === undefined ? "NO SELECTION" : service}', status_video = '${status_video}', ts_bitrate = '${ts_bitrate}',PID_audio='${pid_audio1 === 65535 ? "NO SELECTION" : pid_audio1}',PID_audio2='${pid_audio2 === 65535 ? "NO SELECTION" : pid_audio2}',temperature='${temperature}' WHERE ID = ${id}`);
                        console.log("##############################")
                    });
                    objid_serv.splice(0, objid_serv.length);

                } catch (error) {
                    console.log('Fail :(', error);
                    db.query(`UPDATE snmps SET video_bitrate = '0', kualitas = '0', status_sat = 'DISCONNECTED', margin = '0', status_ip = 'DISCONNECTED', service = 'DISCONNECTED', status_video = 'DISCONNECTED', ts_bitrate = '0',PID_audio='DISCONNECTED',PID_audio2='DISCONNECTED' ,temperature='0' WHERE ID = ${id}`);
                }
            });
        }
    }, 1000)
} catch (error) {
    console.error('connection failed : ', error);
}
app.use(cors())
app.use(express.json());
// app.use('/api/ird', irdRoutes);

app.listen(8080, () => console.log('server running in port 8080'))