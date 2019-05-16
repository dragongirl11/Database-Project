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
  $('#CarsTableContainer').jtable({
    title: 'Select a car to repair',

    selecting: true,
    selectingCheckboxes: true,

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
    },

    actions: {


      listAction: function (postData, jtParams) {
        return $.Deferred(function ($dfd) {
          $.ajax({
            url: '/cars/all',
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
    },

    selectionChanged: function () {
      var $selectedRows = $('#CarsTableContainer').jtable('selectedRows');
      var costParts = 0;
      var costLabor = 0;
      $('#SelectedCar').empty();
      if ($selectedRows.length > 0) {
        $selectedRows.each(function () {
          $('#SelectedCar').append(
            '<b>Car Id </b>: ' + record.id + '<br /><br /> '
          );
        });
      }
    }
  });
  $('#CarsTableContainer').jtable('load');

  $('#EstimateTableContainer').jtable({
    title: 'Get an Estimate',

    selecting: true,
    multiselect: true,
    selectingCheckboxes: true,

    fields: {
      id: {
        title: 'Id',
        key: true,
        list: false
      },
      description: {
        title: 'Description'
      },
      costparts: {
        title: 'Parts Cost'
      },
      hours: {
        title: 'Hours'
      },
      mechanic_id: {
        title: 'Mechanic_Id',
        list: false
      },
      name: {
        title: 'Name'
      },
      expyears: {
        title: 'Years of Experience'
      },
      certnum: {
        title: 'Number of Certificates'
      }
    },

    actions: {
      listAction: function (postData, jtParams) {
        return $.Deferred(function ($dfd) {
          $.ajax({
            url: '/estimate',
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

    },

    selectionChanged: function () {
      var $selectedRows = $('#EstimateTableContainer').jtable('selectedRows');
      var costParts = 0;
      var costLabor = 0;
      $('#SelectedRepairsList').empty();
      if ($selectedRows.length > 0) {
        $selectedRows.each(function () {
          var record = $(this).data('record');
          costParts = costParts + record.costparts;
          costLabor = costLabor + ((record.hours * ((record.certnum * 0.50) + (record.expyears * 0.50) + 10.00)) * 1.5)
        });
        $('#SelectedRepairsList').append(
          '<b>Cost of Parts: $</b> ' + costParts + '<br /><br /> <b>Cost of Labor: $</b> ' + costLabor + '<br /><br /> <b>Total Cost: $</b> ' + (costLabor + costParts) + '<br /><br />'
        );
      }
    }
  });
  $('#EstimateTableContainer').jtable('load');
});
