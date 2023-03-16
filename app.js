'use strict';
let getStatus = process.argv[2];
let getDistrict = process.argv[3];

if (getDistrict === undefined) {
  getDistrict = 'png01';
}

if (getStatus === '-h') {
  console.log('format     --> app.js <week/month/year> <zone code>');
  console.log('-zone      --> to show zone list');
  console.log('-h         --> to get help');
} else if (getStatus === '-zone') {
  console.log('this is zones list');
} else if (
  getStatus === undefined ||
  getStatus === 'week' ||
  getStatus === 'year' ||
  getStatus === 'month'
) {
  const api_url =
    'https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=week&zone=';

  let zones = [
    'JHR01',
    'JHR02',
    'JHR03',
    'JHR04',
    'KDH01',
    'KDH02',
    'KDH03',
    'KDH04',
    'KDH05',
    'KDH06',
    'KDH07',
    'KTN01',
    'KTN02',
    'MLK01',
    'NGS01',
    'NGS02',
    'NGS03',
    'PHG01',
    'PHG02',
    'PHG03',
    'PHG04',
    'PHG05',
    'PHG06',
    'PLS01',
    'PNG01',
    'PRK01',
    'PRK02',
    'PRK03',
    'PRK04',
    'PRK05',
    'PRK06',
    'PRK07',
    'SBH01',
    'SBH02',
    'SBH03',
    'SBH04',
    'SBH05',
    'SBH06',
    'SBH07',
    'SBH08',
    'SBH09',
    'SGR01',
    'SGR02',
    'SGR03',
    'SWK01',
    'SWK02',
    'SWK03',
    'SWK04',
    'SWK05',
    'SWK06',
    'SWK07',
    'SWK08',
    'SWK09',
    'TRG01',
    'TRG02',
    'TRG03',
    'TRG04',
    'WLY01',
    'WLY02',
  ];

  let isDistrict = zones.some((elem) => {
    return getDistrict === elem.toLowerCase();
  });

  if (isDistrict) {
    let new_api_url = api_url + getDistrict;

    if (getStatus === 'month') {
      let regex = /week/i;
      new_api_url = new_api_url.replace(regex, 'week');
    }

    if (getStatus === 'year') {
      let regex = /week/i;
      new_api_url = new_api_url.replace(regex, 'year');
    }

    let catchPromise = fetch(new_api_url);

    catchPromise
      .then((response) => {
        if (response.status != 200) {
          throw new Error(
            `Something went wrong. Code: ${response.status}, Message: ${response.statusText}`
          );
        }

        return response.json();
      })
      .then((body) => {
        let content = body.prayerTime;
        let getDate = [];

        const now = new Date();
        const getNowMonth = now
          .toLocaleString('default', { month: 'long' })
          .slice(0, 3);
        const getNowdate =
          now.getDate() + '-' + getNowMonth + '-' + now.getFullYear();

        console.log(getNowdate);
        content.forEach((element) => {
          // console.log(element.hijri);

          getDate.push(element);
        });
        console.log(
          '+-----------------------------------------------------------------------------------------------------------------+'
        );
        console.log(
          '|Tahun Hjr | |   Tarikh  | | Hari    | | Imsak  | |  Fajar | |  Dhuha | | Zohor  | |  Asar  | |Maghrib | | Isyak  |'
        );

        console.log(
          '+-----------------------------------------------------------------------------------------------------------------+'
        );

        getDate.forEach((eachDate) => {
          let newday = newPadedDay(eachDate.day);
          let text =
            '|' +
            eachDate.hijri +
            '|' +
            ' ' +
            '|' +
            eachDate.date +
            '|' +
            ' ' +
            '|' +
            newday +
            '|' +
            ' ' +
            '|' +
            eachDate.imsak +
            '|' +
            ' ' +
            '|' +
            eachDate.fajr +
            '|' +
            ' ' +
            '|' +
            eachDate.syuruk +
            '|' +
            ' ' +
            '|' +
            eachDate.dhuhr +
            '|' +
            ' ' +
            '|' +
            eachDate.asr +
            '|' +
            ' ' +
            '|' +
            eachDate.maghrib +
            '|' +
            ' ' +
            '|' +
            eachDate.isha +
            '|';

          if (eachDate.date === getNowdate) {
            console.log(text + '***');
          } else {
            console.log(text);
          }
        });
        console.log(
          '+-----------------------------------------------------------------------------------------------------------------+'
        );
      })
      .catch((err) => {
        console.log(err);
        process.exit();
      });
  }

  if (isDistrict === false) {
    console.log('Wrong code or district!');
  }
} else {
  console.log('wrong command input');
  console.log('use -h to get some help');
}

function newPadedDay(nameDay) {
  const maxstring = 9;
  let numspace = maxstring - nameDay.length;
  return nameDay + ' '.repeat(numspace);
}
