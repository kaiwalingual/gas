function doGet(e) {
  //doPost(e)にするとformからのpostデータを書き込むことが出来る
  //応用すれば、スプレッドシートをRestAPIもどきにしたり、フォームのDBにしたり、いろいろ出来ると思う
  //別名で使いたい場合の例
  //var name = e.parameter.p1;
  //var mail = e.parameter.p2;

  //JSONオブジェクト格納用の入れ物
  var rowData = {};

  if (!e){
    //書込先スプレッドシートのIDを入力
      var id = '12eOnBbTri-8rNavNti0L7e_AX1HFzUd-s9yssehDZwU';

      //スプレッドシート名指定 "シート1"
    // var sheet = SpreadsheetApp.openById(id).getSheetByName("シート1");
    var d = new Date(2019,5,29,17,10,00);
    var temp = 20
    var hum = 60
    var bright = 100
    
    var row = d.getDate() + 1
    
    var sheet = SpreadsheetApp.openById(id).getSheetByName(d.getYear() + "_" + d.getMonth());
    if (sheet == null) {
      sheet = SpreadsheetApp.openById(id).insertSheet(d.getYear() + "_" + d.getMonth());
      sheet.getRange(1,1).setValue("日付")
      sheet.getRange(1,2).setValue("時間,気温,湿度,照度")
    }
    
    sheet.getRange(row, 1).clear().setValue(d.getYear()+"/"+d.getMonth()+"/"+d.getDate());
    var col = 1;
    while(!sheet.getRange(row, col).isBlank())col++;
    sheet.getRange(row, col).clear().setValue(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() + "," + temp + "," + hum + "," + bright);
    
    return
  }
  if (e.parameter == undefined) {

      //パラメータ不良の場合はundefinedで返す
      var getvalue = "undefined"

      //エラーはJSONで返すつもりなので
      rowData.value = getvalue;
      var result = JSON.stringify(rowData);
      return ContentService.createTextOutput(result);

  }else{

      //書込先スプレッドシートのIDを入力
      var id = '12eOnBbTri-8rNavNti0L7e_AX1HFzUd-s9yssehDZwU';
    
    // sample: /exec?date=2019,5,29,10,3,4&temp=15&hum=50&bright=30
    
    var dates = e.parameter.date.split(",")
    var d = new Date(dates[0],dates[1],dates[2],dates[3],dates[4],dates[5])
    
    //スプレッドシート名指定 "シート1"
    var sheet = SpreadsheetApp.openById(id).getSheetByName(d.getYear() + "_" + d.getMonth());
    if (sheet == null) {
      sheet = SpreadsheetApp.openById(id).insertSheet(d.getYear() + "_" + d.getMonth());
      sheet.getRange(1,1).setValue("日付")
      sheet.getRange(1,2).setValue("時間,気温,湿度,照度")
    }
    
    var row = d.getDate() + 1
    
    sheet.getRange(row, 1).clear().setValue(d.getYear()+"/"+d.getMonth()+"/"+d.getDate());
    var col = 1;
    while(!sheet.getRange(row, col).isBlank())col++;
    sheet.getRange(row, col).clear().setValue(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds() + "," + e.parameter.temp + "," + e.parameter.hum + "," + e.parameter.bright + "," + e.parameter.imageurl);
  

      //書き込み終わったらOKを返す
      var getvalue = "ok"

      //エラーはJSONで返すつもりなので
      rowData.value = getvalue;
      var result = JSON.stringify(rowData);
      return ContentService.createTextOutput(result);

  }
}