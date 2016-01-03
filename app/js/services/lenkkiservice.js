import $ from 'jquery';
const API_KEY = 'eOp9LjtwzApDNb-TbPbCEZ2V74XTSwrV';

class LenkkiService {


  store(_id, username, day, month, year, length, success){
    console.log('storing...', API_KEY);
    console.log('day...', day);
    console.log('month...', month);
    console.log('year...', year);
    console.log('length...', length);
    $.ajax( { url: "https://api.mongolab.com/api/1/databases/lenkki/collections/ski_days?apiKey="+API_KEY,
      data: JSON.stringify( {_id, username, day, month, year, length, date: new Date() } ),
      type: "POST",
      success,
      contentType: "application/json" } );
  }

}

const lenkkiService = new LenkkiService();
export default lenkkiService;