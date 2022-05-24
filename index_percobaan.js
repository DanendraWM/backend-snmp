import express from "express";
import snmp from 'snmp-node';
import db from './config/database.js'
const app = express();
app.listen(2000, () => console.log('server running in 2000'))
var session = new snmp.Session();
// session.get({ oid: ['.1.3.6.1.4.1.1773.1.3.208.2.2.6.0', '.1.3.6.1.4.1.1773.1.3.208.2.2.2.0'], host: '192.168.112.3', community: 'public' });
// var oids = [['.1.3.6.1.4.1.1773.1.3.208.2.2.6.0', '.1.3.6.1.4.1.1773.1.3.208.2.2.2.0']];
// try {
//     await db.authenticate();
//     console.log('connected database');
//     db.query(`UPDATE snmps SET video_bitrate = '$bitrate', kualitas = '$kualitas', status_sat = '$status_sat', margin = '$margin', status_ip = '$status_ip', service = '$service', status_video = '$statusVid' WHERE ID = $id"`);
// } catch (error) {
//     console.error('connection failed : ', error);
// }
// setInterval(() => {
// session.getAll({ oids: ['.1.3.6.1.4.1.1773.1.3.208.2.2.6.0', '.1.3.6.1.4.1.1773.1.3.208.2.2.2.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.9.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.3.0'], host: '192.168.112.3', community: 'public' }, function ( data) {
//     data.forEach(function (vb) {
//         console.log(`${vb.value}`);
//     });
//     console.log('===============================')
// });
// session.get({ oid: '.1.3.6.1.4.1.1773.1.3.208.2.2.6.0', host: '192.168.112.2', community: 'public' }, function (data) {
//     data.forEach(function (vb) {
//         const margin = vb.value.replace(' +', '').replace('dB', '')
//         console.log(`margin : ${margin}`);
//     });
// });
// session.get({ oid: '.1.3.6.1.4.1.1773.1.3.208.2.2.2.0', host: '192.168.112.2', community: 'public' }, function (data) {
//     data.forEach(function (vb) {
//         console.log(`status satelit : ${vb.value}`);
//     });
// });
// session.get({ oid: '.1.3.6.1.4.1.1773.1.3.208.3.3.9.0', host: '192.168.112.2', community: 'public' }, function (data) {
//     console.log(`bitrate : ${data[0].value}`);
// });
// session.get({ oid: '.1.3.6.1.4.1.1773.1.3.208.3.3.3.0', host: '192.168.112.2', community: 'public' }, function (data) {
//     data.forEach(function (vb) {
//         if (vb.value == 0) {
//             console.log("status video : Video Running");
//         } else if (vb.value == 1) {
//             console.log("status video : Video Stopped");
//         } else if (vb.value == 2) {
//             console.log("status video : Video Error");
//         } else if (vb.value == 3) {
//             console.log("status video : Unlicensed");
//         }
//     });
// });
// session.get({ oid: '.1.3.6.1.4.1.1773.1.3.208.3.4.4.1.3.1', host: '192.168.112.2', community: 'public' }, function (data) {
//     data.forEach(function (vb) {
//         if (vb.value == "RUNNING") {
//             console.log("LOCKED");
//         } else if (vb.value == "ERROR") {
//             console.log("UNLOCKED");
//         }
//     });
// });
// session.getAll({ oids: ['.1.3.6.1.4.1.1773.1.3.208.3.3.8.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.7.0'], host: '192.168.112.2', community: 'public' }, function (data) {
//     console.log(`kualitas : ${data[0].value} x ${data[1].value}`);
// });

session.getAll({ oids: ['.1.3.6.1.4.1.1773.1.3.208.2.2.6.0', '.1.3.6.1.4.1.1773.1.3.208.2.2.2.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.9.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.3.0', '.1.3.6.1.4.1.1773.1.3.208.3.4.4.1.3.1', '.1.3.6.1.4.1.1773.1.3.208.3.3.8.0', '.1.3.6.1.4.1.1773.1.3.208.3.3.7.0'], host: '192.168.112.2', community: 'public' }, function (error, data) {
    console.log("##############################")
    const margin = data[0].value.replace(' +', '').replace('dB', '');
    console.log(`margin : ${margin}`);
    console.log(`status satelit : ${data[1].value}`);
    console.log(`bitrate : ${data[2].value}`);
    if (data[3].value == 0) {
        console.log("status video : Video Running");
    } else if (data[3].value == 1) {
        console.log("status video : Video Stopped");
    } else if (data[3].value == 2) {
        console.log("status video : Video Error");
    } else if (data[3].value == 3) {
        console.log("status video : Unlicensed");
    }
    if (data[4].value == "RUNNING") {
        console.log("status ip : LOCKED");
    } else if (data[4].value == "ERROR") {
        console.log("status ip : UNLOCKED");
    }
    console.log(`kualitas : ${data[5].value} x ${data[6].value}`);
});
console.log("===================================")
// }, 1000);
