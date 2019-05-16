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
  $('#RepairsTableContainer').jtable({
    title: 'Repairs done to cars',
    fields: {
      id: {
        title: 'Id',
        key: true,
        list: false
      },
      dom: {
        title: 'Date of Maintence'
      },
      costparts:
      {
        title: 'Cost of Parts'
      },
      costlabor:
      {
        title: 'Cost of Labor'
      },
      car_id: {
        list: false
      },
      year: {
        title: 'Year'
      },
      make: {
        title: 'Make'
      },
      model: {
        title: 'Model'
      },
      repair_id: {
        list: false
      },
      description: {
        title: 'Description of Repair'
      },

      mechanic_id: {
        list: false
      },
      name: {
        title: 'Mechanic'
      }
    },

    actions: {


      listAction: function (postData, jtParams) {
        return $.Deferred(function ($dfd) {
          $.ajax({
            url: '/repairs',
            type: 'GET',
            success: function (data) {
              $dfd.resolve({ "Result": "OK", "Records": data, "TotalRecordCount": data.length });
            },
            error: function () {
              $dfd.reject();
            }
          });
        });
      }
    }
  });
  $('#RepairsTableContainer').jtable('load');
});
