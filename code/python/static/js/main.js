function QueryStringToJSON(str) {
  var pairs = str.split('&');
  var result = {}
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });
  return JSON.parse(JSON.stringify(result));
}

$(document).ready(function () {
  $('#CustomerTableContainer').jtable({
    title: 'Customers',
    fields: {
      id: {
        title: 'Id',
        key: true,
        list: false
      },
      name: {
        title: 'Name'
      },
      address: {
        title: 'Address'
      },
      phones: {
        title: 'Phones',
        create: false,
        edit: false,
        display: function (customerData) {
          //Create an image that will be used to open child table
          var $img = $('<img src="/images/list.png" title="Edit phone numbers" />');
          //Open child table when user clicks the image
          $img.click(function () {
            $('#CustomerTableContainer').jtable('openChildTable',
            $img.closest('tr'),
            {
              title: customerData.record.name + ' - Phone numbers',
              actions: {
                createAction: function (postData, jtParams) {
                  postData = QueryStringToJSON(postData);
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/' + customerData.record.id + '/phones',
                      type: 'PUT',
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify(postData),
                      dataType: 'json',
                      success: function (data) {
                        $dfd.resolve({ "Result": "OK", "Record": data });
                      },
                      error: function (xhr, options, error) {
                        $dfd.reject();
                      }
                    });
                  });
                }
                ,
                listAction: function (postData, jtParams) {
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/' + customerData.record.id + '/phones',
                      type: 'GET',
                      success: function (data) {
                        $dfd.resolve({ "Result": "OK", "Records": data, "TotalRecordCount": data.length });
                      },
                      error: function () {
                        $dfd.reject();
                      }
                    });
                  });
                },
                updateAction: function (postData, jtParams) {
                  postData = QueryStringToJSON(postData);
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/phones',
                      type: 'POST',
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify(postData),
                      dataType: 'json',
                      success: function () {
                        $dfd.resolve({ "Result": "OK" });
                      },
                      error: function () {
                        $dfd.reject();
                      }
                    });
                  });
                },
                deleteAction: function (postData, jtParams) {
                  //postData = QueryStringToJSON(postData);
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/phones',
                      type: 'DELETE',
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify(postData),
                      dataType: 'json',
                      success: function () {
                        $dfd.resolve({ "Result": "OK" });
                      },
                      error: function () {
                        $dfd.reject();
                      }
                    });
                  });
                }


              },


              fields: {
                id: {
                  title: 'Id',
                  key: true,
                  list: false
                },
                customer_id: {
                  type: 'hidden'
                },
                phone: {
                  title: 'Phone Number',
                },
              }
            }, function (data) { //opened handler
              data.childTable.jtable('load');
            });
          });
          //Return image to show on the person row
          return $img;
        }
      },
      cars: {
        title: 'Cars',
        create: false,
        edit: false,
        display: function (customerData) {
          //Create an image that will be used to open child table
          var $img = $('<img src="/images/list.png" title="View Cars" />');
          //Open child table when user clicks the image
          $img.click(function () {
            $('#CustomerTableContainer').jtable('openChildTable',
            $img.closest('tr'),
            {
              title: customerData.record.name + ' - Cars',
              actions: {

                createAction: function (postData, jtParams) {
                  console.log(postData);
                  postData = QueryStringToJSON(postData);
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/' + customerData.record.id + '/cars',
                      type: 'PUT',
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify(postData),
                      dataType: 'json',
                      success: function (data) {
                        $dfd.resolve({ "Result": "OK", "Record": data });
                      },
                      error: function (xhr, options, error) {
                        $dfd.reject();
                      }
                    });
                  });
                },

                listAction: function (postData, jtParams) {
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/' + customerData.record.id + '/cars',
                      type: 'GET',
                      success: function (data) {
                        $dfd.resolve({ "Result": "OK", "Records": data, "TotalRecordCount": data.length });
                      },
                      error: function () {
                        $dfd.reject();
                      }
                    });
                  });
                },

                updateAction: function (postData, jtParams) {
                  console.log(postData);
                  postData = QueryStringToJSON(postData);
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/cars',
                      type: 'POST',
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify(postData),
                      dataType: 'json',
                      success: function () {
                        $dfd.resolve({ "Result": "OK" });
                      },
                      error: function () {
                        $dfd.reject();
                      }
                    });
                  });
                },
                deleteAction: function (postData, jtParams) {
                  console.log(postData);
                  //postData = QueryStringToJSON(postData);
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/cars',
                      type: 'DELETE',
                      contentType: "application/json; charset=utf-8",
                      data: JSON.stringify(postData),
                      dataType: 'json',
                      success: function () {
                        $dfd.resolve({ "Result": "OK" });
                      },
                      error: function () {
                        $dfd.reject();
                      }
                    });
                  });
                }


              },
              fields: {
                id: {
                  title: 'Id',
                  key: true,
                  list: false
                },
                customer_id: {
                  type: 'hidden'
                },
                year: {
                  title: 'Year'
                },
                make: {
                  title: 'Make'
                },
                model: {
                  title: 'Model'
                }
              }
            }, function (data) { //opened handler
              data.childTable.jtable('load');
            });
          });
          //Return image to show on the person row
          return $img;
        }
      }
    },

    actions: {
      createAction: function (postData, jtParams) {
        postData = QueryStringToJSON(postData);
        return $.Deferred(function ($dfd) {
          $.ajax({
            url: '/customers',
            type: 'PUT',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            dataType: 'json',
            success: function (data) {
              $dfd.resolve({ "Result": "OK", "Record": data });
            },
            error: function (xhr, options, error) {
              $dfd.reject();
            }
          });
        });
      }
      ,
      listAction: function (postData, jtParams) {
        return $.Deferred(function ($dfd) {
          $.ajax({
            url: '/customers',
            type: 'GET',
            success: function (data) {
              $dfd.resolve({ "Result": "OK", "Records": data, "TotalRecordCount": data.length });
            },
            error: function () {
              $dfd.reject();
            }
          });
        });
      },
      updateAction: function (postData, jtParams) {
        postData = QueryStringToJSON(postData);
        return $.Deferred(function ($dfd) {
          $.ajax({
            url: '/customers',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            dataType: 'json',
            success: function () {
              $dfd.resolve({ "Result": "OK" });
            },
            error: function () {
              $dfd.reject();
            }
          });
        });
      },
      deleteAction: function (postData, jtParams) {
        //postData = QueryStringToJSON(postData);
        return $.Deferred(function ($dfd) {
          $.ajax({
            url: '/customers',
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            dataType: 'json',
            success: function () {
              $dfd.resolve({ "Result": "OK" });
            },
            error: function () {
              $dfd.reject();
            }
          });
        });
      }
    }
  });
  $('#CustomerTableContainer').jtable('load');
});
