import React, {useState, useEffect} from 'react';
import {ajaxPost} from "../../utils/Ajax";
import Totalbar from "../../components/telethon/totalbar";

import "./telethon.css"

const Telethon = () => {
    const [sells, setSells] = useState({
        alls: {
            18978: {
                id: 18978,
                quantity: 0
            },
            18977: {
                id: 18977,
                quantity: 0
            },
            18979: {
                id: 18979,
                quantity: 0
            },
            1394: {
                id: 1394,
                quantity: 0
            },
            1399: {
                id: 1399,
                quantity: 0
            },
            16614: {
                id: 16614,
                quantity: 0
            },
            17546: {
                id: 17546,
                quantity: 0
            },
            1397: {
                id: 1397,
                quantity: 0
            },
            18433: {
                id: 18433,
                quantity: 0
            },
            890: {
                id: 890,
                quantity: 0
            },
            16619: {
                id: 16619,
                quantity: 0
            },
            17837: {
                id: 17837,
                quantity: 0
            },
            17849: {
                id: 17849,
                quantity: 0
            },
            18579: {
                id: 18579,
                quantity: 0
            },
            18578: {
                id: 18578,
                quantity: 0
            },
            18580: {
                id: 18580,
                quantity: 0
            },
            18236: {
                id: 18236,
                quantity: 0
            },
            17835: {
                id: 17835,
                quantity: 0
            },
            18502: {
                id: 18502,
                quantity: 0
            },
            457: {
                id: 457,
                quantity: 0
            },
            458: {
                id: 458,
                quantity: 0
            },
            18434: {
                id: 18434,
                quantity: 0
            },
            15587: {
                id: 15587,
                quantity: 0
            },
            16715: {
                id: 16715,
                quantity: 0
            },
            14821: {
                id: 14821,
                quantity: 0
            },
            17251: {
                id: 17251,
                quantity: 0
            },
            17881: {
                id: 17881,
                quantity: 0
            },
            12492: {
                id: 12492,
                quantity: 0
            },
            17154: {
                id: 17154,
                quantity: 0
            },
            17153: {
                id: 17153,
                quantity: 0
            },
            9529: {
                id: 9529,
                quantity: 0
            },
            17418: {
                id: 17418,
                quantity: 0
            },
            18348: {
                id: 18348,
                quantity: 0
            },
            34: {
                id: 34,
                quantity: 0
            },
            37: {
                id: 37,
                quantity: 0
            },
            1900: {
                id: 1900,
                quantity: 0
            },
            1803: {
                id: 1803,
                quantity: 0
            },
            30: {
                id: 30,
                quantity: 0
            },
            36: {
                id: 36,
                quantity: 0
            },
            31: {
                id: 31,
                quantity: 0
            },
            3679: {
                id: 3679,
                quantity: 0
            },
            18201: {
                id: 18201,
                quantity: 0
            },
            85: {
                id: 85,
                quantity: 0
            },
            17864: {
                id: 17864,
                quantity: 0
            },
            12039: {
                id: 12039,
                quantity: 0
            },
            1674: {
                id: 1674,
                quantity: 0
            },
            17867: {
                id: 17867,
                quantity: 0
            },
            9339: {
                id: 9339,
                quantity: 0
            },
            1675: {
                id: 1675,
                quantity: 0
            },
            18200: {
                id: 18200,
                quantity: 0
            },
            17152: {
                id: 17152,
                quantity: 0
            },
            17008: {
                id: 17008,
                quantity: 0
            },
            17862: {
                id: 17862,
                quantity: 0
            },
            17001: {
                id: 17001,
                quantity: 0
            },
            18349: {
                id: 18349,
                quantity: 0
            },
            17865: {
                id: 17865,
                quantity: 0
            },
            16995: {
                id: 16995,
                quantity: 0
            },
            16999: {
                id: 16999,
                quantity: 0
            },
            18416: {
                id: 18416,
                quantity: 0
            },
            16998: {
                id: 16998,
                quantity: 0
            },
            16993: {
                id: 16993,
                quantity: 0
            },
            17002: {
                id: 17002,
                quantity: 0
            },
            18467: {
                id: 18467,
                quantity: 0
            },
            18396: {
                id: 18396,
                quantity: 0
            },
            17344: {
                id: 17344,
                quantity: 0
            },
            17000: {
                id: 17000,
                quantity: 0
            },
            7852: {
                id: 7852,
                quantity: 0
            },
            17011: {
                id: 17011,
                quantity: 0
            },
            17016: {
                id: 17016,
                quantity: 0
            },
            18235: {
                id: 18235,
                quantity: 0
            },
            18565: {
                id: 18565,
                quantity: 0
            },
            17015: {
                id: 17015,
                quantity: 0
            },
            17013: {
                id: 17013,
                quantity: 0
            },
            17014: {
                id: 17014,
                quantity: 0
            },
            18239: {
                id: 18239,
                quantity: 0
            },
            15714: {
                id: 15714,
                quantity: 0
            },
            17343: {
                id: 17343,
                quantity: 0
            },
            20: {
                id: 20,
                quantity: 0
            },
            18: {
                id: 18,
                quantity: 0
            },
            4505: {
                id: 4505,
                quantity: 0
            },
            21: {
                id: 21,
                quantity: 0
            },
            15577: {
                id: 15577,
                quantity: 0
            },
            22: {
                id: 22,
                quantity: 0
            },
            1800: {
                id: 1800,
                quantity: 0
            },
            25: {
                id: 25,
                quantity: 0
            },
            2185: {
                id: 2185,
                quantity: 0
            },
            26: {
                id: 26,
                quantity: 0
            },
            11247: {
                id: 11247,
                quantity: 0
            },
            18314: {
                id: 18314,
                quantity: 0
            },
            2045: {
                id: 2045,
                quantity: 0
            },
            23: {
                id: 23,
                quantity: 0
            },
            15343: {
                id: 15343,
                quantity: 0
            },
            1686: {
                id: 1686,
                quantity: 0
            },
            16475: {
                id: 16475,
                quantity: 0
            }
        }
    });
    const prices = {
        18978: 0.1,
        18977: 10,
        18979: 1,
        20: 0.70,
        18: 0.65,
        4505: 0.65,
        21: 0.65,
        15577: 0.82,
        22: 0.65,
        1800: 0.50,
        25: 0.65,
        2185: 0.65,
        26: 0.55,
        11247: 0.01,
        18314: 0.01,
        2045: 1.35,
        23: 0.65,
        15343: 1.20,
        1686: 0.10,
        16475: 0.65,
        18236: 1.30,
        17835: 1.60,
        18502: 1.80,
        457: 1.75,
        458: 1.80,
        18434: 1.70,
        15587: 1.85,
        16715: 1.80,
        14821: 1.80,
        17251: 1.60,
        17881: 1.90,
        12492: 1.90,
        1394: 1.80,
        1399: 1.85,
        16614: 1.80,
        17546: 1.70,
        1397: 1.75,
        18433: 1.70,
        890: 1.95,
        18579: 1.80,
        18578: 1.80,
        18580: 1.80,
        16619: 1.80,
        17837: 1.70,
        17849: 1.80,
        7852: 0.30,
        17011: 0.40,
        17016: 2.95,
        18235: 2.95,
        18565: 1.30,
        17015: 2.95,
        10357: 2.95,
        17013: 2.95,
        17014: 2.95,
        18239: 3.25,
        15714: 2.95,
        17343: 2.50,
        17154: 0.45,
        17153: 0.60,
        9529: 0.45,
        17418: 0.45,
        18348: 1.05,
        17001: 0.40,
        18349: 1.10,
        17865: 1.10,
        16995: 0.35,
        16999: 0.76,
        18416: 1.30,
        16998: 0.48,
        16993: 0.18,
        17002: 0.72,
        18467: 0.63,
        18396: 1.30,
        17344: 0.33,
        17000: 0.40,
        18201: 0.9,
        85: 0.3,
        17864: 0.9,
        12039: 0.9,
        1674: 0.65,
        17867: 1,
        9339: 1.1,
        1675: 0.75,
        18200: 0.9,
        17152: 0.9,
        17008: 0.3,
        17862: 0.95,
        34: 0.65,
        37: 0.65,
        1900: 0.65,
        1803: 0.65,
        30: 0.65,
        36: 0.65,
        31: 0.65,
        3679: 0.65,
    };

    const [total, setTotal] = useState(0);

    const load = () => {
        console.log('load');
        ajaxPost('payutc/public/beers/sells', {'beers': sells}).then(
            res => {
                setSells(res.data.beers)
                console.log(res.data.beers)
            }
        )

        let tot = 0;
        for (let i in sells.alls) {
            tot += sells.alls[i].quantity * prices[i]
        }
        setTotal(Math.floor(tot))

    }

    useEffect(() => {
        load()
        const interval = setInterval(() => {
            load()
        }, 30 * 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="telethonperm">
            <div className="header">
                <h1>TELETHON</h1>
                <p>Tout le chiffre d'affaire du Pic'Asso est reversé au Téléthon aujourd'hui ! L'heure de fermeture ce
                    soir est dictée par le montant reversé au Téléthon !</p>
            </div>
            <Totalbar total={total}/>
        </div>
    );
};

export default Telethon;
