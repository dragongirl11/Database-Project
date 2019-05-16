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
  $('#MechanicsTableContainer').jtable({
    title: 'Mechanics',
    //deleteConfirmation: false,
    fields: {
      id: {
        title: 'Id',
        key: true,
        list: false
      },
      name: {
        title: 'Name'
      },
      expyears: {
        title: 'Years of Experience'
      },
      certificates: {
        title: 'Certificates',
        create: false,
        edit: false,
        display: function (customerData) {
          //Create an image that will be used to open child table
          var $img = $('<img src="/images/list.png" title="View Certificates" />');
          //Open child table when user clicks the image
          $img.click(function () {
            $('#MechanicsTableContainer').jtable('openChildTable',
            $img.closest('tr'),
            {
              title: customerData.record.name + ' - Certificates',
              actions: {
                createAction: function (postData, jtParams) {
                  postData = QueryStringToJSON(postData);
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/' + customerData.record.id + '/certificates',
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
                      url: '/' + customerData.record.id + '/certificates',
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
                // updateAction: function (postData, jtParams) {
                //   postData = QueryStringToJSON(postData);
                //   return $.Deferred(function ($dfd) {
                //     $.ajax({
                //       url: '/certificates',
                //       type: 'POST',
                //       contentType: "application/json; charset=utf-8",
                //       data: JSON.stringify(postData),
                //       dataType: 'json',
                //       success: function () {
                //         $dfd.resolve({ "Result": "OK" });
                //       },
                //       error: function () {
                //         $dfd.reject();
                //       }
                //     });
                //   });
                // },
                deleteAction: function (postData, jtParams) {
                  //postData = QueryStringToJSON(postData);
                  return $.Deferred(function ($dfd) {
                    $.ajax({
                      url: '/certificates',
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
                mechanic_id: {
                  type: 'hidden'
                },
                repair_id: {
                  type: 'hidden'
                },
                name: {
                  title: 'Name',
                  options: function (data) {
                    return $.Deferred(function ($dfd) {
                      $.ajax({
                        url: '/certificate/options',
                        type: 'GET',
                        success: function (options) {
                          $dfd.resolve({ "Result": "OK", "Options": options });
                        },
                        error: function () {
                          $dfd.reject();
                        }
                      });
                    });
                  }
                }
              }
            }, function (data) { //opened handler
              data.childTable.jtable('load');
            });
          });
          //Return image to show on the person row
          return $img;
        }
      },
    },

    actions: {
      createAction: function (postData, jtParams) {
        postData = QueryStringToJSON(postData);
        return $.Deferred(function ($dfd) {
          $.ajax({
            url: '/mechanics',
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
            url: '/mechanics',
            type: 'GET',
            success: function (data) {
              $dfd.resolve({ "Result": "OK", "Records": data, "TotalRecordCount": data.length });
              console.log(data);
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
            url: '/mechanics',
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
            url: '/mechanics',
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
  $('#MechanicsTableContainer').jtable('load');
});
