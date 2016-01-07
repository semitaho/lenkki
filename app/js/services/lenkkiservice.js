import $ from 'jquery';
const API_KEY = 'eOp9LjtwzApDNb-TbPbCEZ2V74XTSwrV';

class LenkkiService {


  getItem(day, month, year, data){
    console.log('data in service', month);
    let user = this.getUser();
    let foundItem = data.find(item => {
      return item.year === year && item.month === month && item.username === user && item.day === day;
    }); 
    if (foundItem){
      return foundItem;
    }
    return {};
  }

  getMonthKilometers(month,year,data){
    let user = this.getUser();
    var total = 0;
    data.forEach(item => {
      if (item.year === year && item.month === month && item.username === user && item.length){
        console.log('jaajaa');
        total += item.length;
      }
    });

    return (total / 100).toFixed(2).replace('.', ',');

  }

  getUser(){
    if (localStorage && localStorage.user){
      return localStorage.user;
    }
    return 'taho';
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



  store(_id, day, month, year, length, success){
    console.log('storing...', _id);
    console.log('length...', length);
    let username = this.getUser();
    $.ajax( { url: "https://api.mongolab.com/api/1/databases/lenkki/collections/ski_days?apiKey="+API_KEY,
      data: JSON.stringify( {_id, username, day, month, year, length, date: new Date() } ),
      type: "POST",
      success,
      contentType: "application/json" } );
  }

}

const lenkkiService = new LenkkiService();
export default lenkkiService;