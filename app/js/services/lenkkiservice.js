import $ from 'jquery';
const API_KEY = 'eOp9LjtwzApDNb-TbPbCEZ2V74XTSwrV';

class LenkkiService {


  getItem(user, day, month, year, data){
    console.log('data in service', month);
    let foundItem = data.find(item => {
      return item.year === year && item.month === month && item.username === user && item.day === day;
    }); 
    if (foundItem){
      return foundItem;
    }
    return {};
  }

  read(username, success){
    let query = {username};
    let queryStr = JSON.stringify(query);
    $.ajax( { url: "https://api.mongolab.com/api/1/databases/lenkki/collections/ski_days?q="+queryStr+"&apiKey="+API_KEY,
      type: "GET",
      success,
      contentType: "application/json" } );
  }



  store(_id, username, day, month, year, length, success){
    console.log('storing...', _id);
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