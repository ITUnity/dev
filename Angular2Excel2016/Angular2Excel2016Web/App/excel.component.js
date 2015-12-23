(function (app) {
    app.ExcelComponent = ng.core
      .Component({
          selector: 'excel-app',
          templateUrl: '/app/excel.template.html'
      })
      .Class({

          constructor: function () {
              this.rawData = [];
              this.formattedData = [];
          },

          getRangeValues: function (selector) {

              var promise1 = new Promise(function (resolve, reject) {
                  var data = [];
                  Excel.run(function (ctx) {
                      var range = ctx.workbook.worksheets.getActiveWorksheet().getRange(selector);
                      range.load("address, values, range/format");
                      return ctx.sync().then(function () {
                          data = range.values;
                      });
                  }).then(function () {
                      resolve(data);
                  }).catch(function (error) {
                      reject(error.message);
                  });
              });

              var that = this;
              promise1.then(
                  function (data) {
                      that.rawData = data;
                      that.formatRawData();
                  },
                  function (err) {
                      console.log(err);
                  }
              );
          },

          setRangeValues: function (selector) {

              var data = this.rawData;

              var promise2 = new Promise(function (resolve, reject) {
                  Excel.run(function (ctx) {
                      var range = ctx.workbook.worksheets.getActiveWorksheet().getRange(selector);
                      range.load("address, values, range/format");
                      return ctx.sync().then(function () {
                          range.values = data;
                      });
                  }).then(function () {
                      resolve(true);
                  }).catch(function (error) {
                      reject(error.message);
                  });
              });

              promise2.then(
                function (data) {
                    console.log("success");
                },
                function (err) {
                    console.log(err);
                }
             );

          },

          formatRawData: function () {
              this.formattedData = [];
              for (var r = 0; r < this.rawData.length; r++) {
                  for (var c = 0; c < this.rawData[r].length; c++) {
                      this.formattedData.push({
                          row: r + 1,
                          col: this.getColumnLetter(c),
                          value: (typeof(this.rawData[r][c]) !== 'undefined') ? this.rawData[r][c] : 'empty'
                      });
                  }
              }
          },

          getColumnLetter: function (n) {
              switch (n) {
                  case 0:
                      return "A";
                  case 1:
                      return "B";
                  case 2:
                      return "C";
                  case 3:
                      return "D";
                  default:
                      return n;
              }
          }

      });
})(window.app || (window.app = {}));