import $ from 'jquery';
const API_KEY = 'eOp9LjtwzApDNb-TbPbCEZ2V74XTSwrV';

class LenkkiService {


  getItem(day, month, year, user, data){
    console.log('data in service', month);
    let foundItem = data.find(item => {
      return item.year === year && item.month === month && item.username === user && item.day === day;
    }); 
    if (foundItem){
      return foundItem;
    }
    return {};
  }

  getMonthKilometers(user,month,year,data){
    var total = 0;
    data.forEach(item => {
      if (item.year === year && item.month === month && item.username === user && item.length){
        total += item.length;
      }
    });
    return this.formatLength(total); 
  }

  formatLength(total){
    if (!total){
      return "";
    }
    return (total / 100).toFixed(2).replace('.', ',');

  }


  storeUser(user){
    if (localStorage){
      console.log('storing user...');
      localStorage.setItem('user', user);
    }

  }

  read(username){
    let query = {username};
    let queryStr = JSON.stringify(query);
    let promise = $.ajax( { url: "https://api.mongolab.com/api/1/databases/lenkki/collections/ski_days?q="+queryStr+"&apiKey="+API_KEY,
      type: "GET",
      contentType: "application/json" } );
    return promise;
  }

  readTracks(){
      let fields = {track: 1};
      let fieldsStr = JSON.stringify(fields);   
      let promise = $.ajax( { url: "https://api.mongolab.com/api/1/databases/lenkki/collections/ski_days?f="+fieldsStr+"&s="+fieldsStr+"&apiKey="+API_KEY,
      type: "GET",
      contentType: "application/json" } );
    return promise;

  }

  readBestKilometers(month, year){
    let query = {month, year};
    let queryStr = JSON.stringify(query);
    let promise = $.ajax( { url: "https://api.mongolab.com/api/1/databases/lenkki/collections/ski_days?q="+queryStr+"&apiKey="+API_KEY,
      type: "GET",
      contentType: "application/json" } );
    return promise;

  }



  store(_id, username, day, month, year, length, track){
    console.log('storing...', _id);
    console.log('length...', length);
    let promise = $.ajax( { url: "https://api.mongolab.com/api/1/databases/lenkki/collections/ski_days?apiKey="+API_KEY,
      data: JSON.stringify( {_id, username, day, month, year, length, track, date: new Date() } ),
      type: "POST",
      contentType: "application/json" } );
    return promise;
  }

}

const lenkkiService = new LenkkiService();
export default lenkkiService;