const express = require("express");
const router = express.Router();
const dashboardLiveData = require("../mock_data/dashboard-live.json");
const dashboardHourlyData = require("../mock_data/dashboard-hourly.json");
const dashboardHourlyTestData = require("../mock_data/dashbaord-hourly-data.json");
const dashboardMonthlyTestData = require("../mock_data/dashbaord-monthly-data.json");
const dashboardWeeklyTestData = require("../mock_data/dashbaord-weekly-data.json");
const dataconfig = require("../mock_data/dataconfig.json");
const dashboardDataConfig = require("../mock_data/dashboarddataconfig.json");

const dbClient = require("../client/dbClient");

// const dashboardMetricDataConfig = require("../mock_data/dashboardMetricDataConfig.json");
// const TerraData = require("../mock_data/TerraAPIDataTable.json");
// const userGoalThresholdConfig = require("../mock_data/userGoalThresholdConfig.json");

//Get Method
router.get("/data/:userId", async (req, res) => {
  const response = await fetchData(req);
  res.status(200).json(response);
});

async function fetchData(req) {
  const { userId } = req.params;

  const userDashboardConfig = await dbClient.fetchUserDashboardMetricConfig(
    userId
  );

  const userDashboardPreferences = await dbClient.fetchUserDashboardPreferences(
    userId
  );
  if (userDashboardPreferences?.status == "empty") {
    return {
      status: "empty",
      message: "No dashboard preference set for given user id",
    };
  }

  const dashboardMetricDataConfig =
    await dbClient.fetchDashboardMetricDataConfig(userId);

  const TerraData = await dbClient.fetchTerraData(userId);

  const userGoalThresholdConfig = await dbClient.fetchUserGoalThresholdConfig(
    userId
  );

  var filteredUserdataNew = TerraData.filter(function (el) {
    if (el.response) {
      return el.response.user.user_id == userId;
    }
  });
  var dashboardData = {};
  var date;
  console.log(
    "Dashboard preference list " + userDashboardPreferences.preference
  );
  dashboardMetricDataConfig.forEach(function (config) {
    var filteredDashboardPreferenceConfig =
      userDashboardPreferences.preference.filter(function (el) {
        return el.item == config.key && el.isPreferred && el.active;
      });
    console.log("config data key" + config.key);
    if (filteredDashboardPreferenceConfig.length > 0) {
      console.log("Dashboard preference " + config.key);
      var filteredDashboardConfig = userDashboardConfig.configData.filter(
        function (el) {
          return el.item == config.key;
        }
      );

      if (config.dataSource != "") {
        var filteredUserdata = filteredUserdataNew.filter(function (el) {
          return (
            el.type == config.dataType &&
            el.provider == filteredDashboardConfig[0].deviceMake.toUpperCase()
          );
        });
        if (filteredUserdata.length > 0) {
          console.log("Inside if");
          var data =
            filteredUserdata[0]["response"]["data"][0][config.dataSource];
          if (dashboardData[config.dashboardSection] == undefined) {
            dashboardData[config.dashboardSection] = [];
          }
          date = filteredUserdata[0].last_webhook_update;
          //  dashboardData[config.dashboardSection][config.key] = getValuefromDataKey(data, config.datakey);
          let val = getValuefromDataKey(data, config.datakey);
          var filtereDashboardConfig =
            userGoalThresholdConfig[0].threshold.filter(function (el) {
              return el.key == config.key;
            });
          if (val == null) {
            val = "";
          }
          var dashboardObj = {};
          dashboardObj["key"] = config.key;
          dashboardObj["active"] = config.active;
          dashboardObj["icon"] = config.icon;
          dashboardObj["label"] = config.label;
          if (filtereDashboardConfig.length > 0) {
            if (filtereDashboardConfig[0].progressLabel != undefined) {
              dashboardObj["type"] = "progress";
              dashboardObj["progressValue"] = val;
              dashboardObj["progressLabel"] =
                filtereDashboardConfig[0].progressLabel;
            } else {
              // filtereDashboardConfig[0]["value"] = val
              dashboardObj["value"] = val;
            }
            dashboardData[config.dashboardSection].push(dashboardObj);
          }
        } else {
          if (dashboardData[config.dashboardSection] == undefined) {
            dashboardData[config.dashboardSection] = [];
          }
          // var filtereDashboardConfig = userGoalThresholdConfig.filter(function (
          //   el
          // ) {
          //   return el.key == config.key;
          // });
          var filtereDashboardConfig =
            userGoalThresholdConfig[0].threshold.filter(function (el) {
              return el.key == config.key;
            });
          var dashboardObj = {};
          dashboardObj["key"] = config.key;
          dashboardObj["active"] = config.active;
          dashboardObj["icon"] = config.icon;
          dashboardObj["label"] = config.label;

          if (filtereDashboardConfig.length > 0) {
            if (filtereDashboardConfig[0].progressLabel != undefined) {
              dashboardObj["type"] = "progress";
              dashboardObj["progressValue"] = "0";
              dashboardObj["progressLabel"] =
                filtereDashboardConfig[0].progressLabel;
            } else {
              // filtereDashboardConfig[0]["value"] = val
              dashboardObj["value"] = "NA";
            }
            dashboardData[config.dashboardSection].push(dashboardObj);
          }
        }
      } else {
        if (dashboardData[config.dashboardSection] == undefined) {
          dashboardData[config.dashboardSection] = [];
        }
        // var filtereDashboardConfig = userGoalThresholdConfig.filter(function (
        //   el
        // ) {
        //   return el.key == config.key;
        // });
        var filtereDashboardConfig =
          userGoalThresholdConfig[0].threshold.filter(function (el) {
            return el.key == config.key;
          });
        var dashboardObj = {};
        dashboardObj["key"] = config.key;
        dashboardObj["active"] = config.active;
        dashboardObj["icon"] = config.icon;
        dashboardObj["label"] = config.label;
        if (filtereDashboardConfig.length > 0) {
          if (filtereDashboardConfig[0].progressLabel != undefined) {
            dashboardObj["type"] = "progress";
            dashboardObj["progressValue"] = "0";
            dashboardObj["progressLabel"] =
              filtereDashboardConfig[0].progressLabel;
          } else {
            // filtereDashboardConfig[0]["value"] = val
            dashboardObj["value"] = "NA";
          }
          dashboardData[config.dashboardSection].push(dashboardObj);
        }
      }
    }
  });
  if (Object.keys(dashboardData).length === 0) {
    return {
      status: "empty",
      message: "No data available for given user id",
    };
  } else {
    dashboardData["dashboardInfo"] = {
      name: "Test User",
      age: "47",
      plan: "athlete",
      weight: "186lbs",
      height: "5'11",
      stepscount: "250",
      heartrate: "180",
      calories: "150",
    };
    console.log("dashbaord data " + JSON.stringify(dashboardData));
    dashboardData["user_id"] = userId;
    dashboardData["timestamp"] = date;

    return dashboardData;
  }
}

function getValuefromDataKey(data, datakey) {
  var value = "";
  datakey.forEach(function (keyitem) {
    if (value == "") {
      if (keyitem.type == "arr") {
        if (data[keyitem.key].length > 0) {
          value = data[keyitem.key][0];
        }
      } else {
        value = data[keyitem.key];
      }
    } else {
      if (keyitem.type == "arr") {
        if (value[keyitem.key].length > 0) {
          value = value[keyitem.key][0];
        }
      } else {
        value = value[keyitem.key];
      }
    }
  });
  return value;
}

router.get("/data/:userId/:filter", async (req, res) => {
  const { userId, filter } = req.params;

  if (filter == "live") {
    console.log("Inside live");
    const response = await fetchData(req);
    res.status(200).json(response);
  } else {
    const userDashboardConfig = await dbClient.fetchUserDashboardMetricConfig(
      userId
    );
    console.log("userDashboardConfig: ", userDashboardConfig);

    const userDashboardPreferences =
      await dbClient.fetchUserDashboardPreferences(userId);
    console.log("userDashboardPreferences", userDashboardPreferences);
    if (userDashboardPreferences?.status == "empty") {
      return {
        status: "empty",
        message: "No dashboard preference set for given user id",
      };
    }
    const dashboardMetricDataConfig =
      await dbClient.fetchDashboardMetricDataConfig(userId);
    console.log("dashboardMetricDataConfig: ", dashboardMetricDataConfig);

    const TerraData = await dbClient.fetchTerraData(userId);
    const userGoalThresholdConfig = await dbClient.fetchUserGoalThresholdConfig(
      userId
    );
    console.log("userGoalThresholdConfig: ", userGoalThresholdConfig);

    var dashboardData = {};
    dashboardMetricDataConfig.forEach(function (config) {
      var filteredDashboardPreferenceConfig =
        userDashboardPreferences.preference.filter(function (el) {
          return el.item == config.key && el.isPreferred && el.active;
        });
      console.log(
        "filteredDashboardPreferenceConfig: ",
        filteredDashboardPreferenceConfig
      );
      console.log("TTest 1");
      if (filteredDashboardPreferenceConfig.length > 0) {
        console.log("TTest 2");
        var filteredDashboardConfig = userDashboardConfig.configData.filter(
          function (el) {
            return el.item == config.key;
          }
        );
        var filterKey = "";
        var filteredUserdata = [];
        var filterItemValues = [];
        if (filter == "hourly") {
          filterItemValues = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24,
          ];
          console.log("TTest 3");
          filterKey = new Date();
          filteredUserdata = TerraData.filter(function (el) {
            var dateText =
              filterKey.getUTCDate() +
              "-" +
              filterKey.getUTCMonth() +
              "-" +
              filterKey.getFullYear();
            var valueDateText =
              new Date(el.last_webhook_update).getUTCDate() +
              "-" +
              new Date(el.last_webhook_update).getUTCMonth() +
              "-" +
              new Date(el.last_webhook_update).getFullYear();
            if (el.response) {
              return (
                el.response.user.user_id == userId &&
                el.type == config.type &&
                el.provider ==
                  filteredDashboardConfig[0].deviceMake.toUpperCase() &&
                dateText == valueDateText
              );
            }
          });
        } else if (filter == "weekly") {
          filterItemValues = Array.from(Array(7).keys()).map((idx) => {
            const d = new Date();
            d.setDate(d.getDate() - d.getDay() + idx);
            var dateText =
              d.getUTCDate() +
              "-" +
              parseInt(d.getUTCMonth() + 1) +
              "-" +
              d.getFullYear();
            return dateText;
          });
          filteredUserdata = TerraData.filter(function (el) {
            var curr = new Date();
            var firstday = new Date(
              curr.setDate(curr.getDate() - curr.getDay())
            );
            var lastday = new Date(
              curr.setDate(curr.getDate() - curr.getDay() + 6)
            );
            var valueDate = new Date(el.last_webhook_update);
            if (el.response) {
              return (
                el.response.user.user_id == userId &&
                el.type == config.type &&
                el.provider ==
                  filteredDashboardConfig[0].deviceMake.toUpperCase() &&
                (valueDate < lastday || valueDate > firstday)
              );
            }
          });
        } else if (filter == "monthly") {
          filterItemValues = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          filteredUserdata = TerraData.filter(function (el) {
            // var date = new Date(), y = date.getFullYear(), m = date.getMonth();
            // var firstDay = new Date(y, m, 1);
            // var lastDay = new Date(y, m + 1, 0);
            var firstDay = new Date(new Date().getFullYear(), 0, 1);
            var lastDay = new Date(new Date().getFullYear(), 11, 31);
            var valueDate = new Date(el.last_webhook_update);
            if (el.response) {
              return (
                el.response.user.user_id == userId &&
                el.type == config.type &&
                el.provider ==
                  filteredDashboardConfig[0].deviceMake.toUpperCase() &&
                (valueDate < lastDay || valueDate > firstDay)
              );
            }
          });
        } else if (filter == "yearly") {
          // filterKey = new Date(itemData["response"]["user"]["last_webhook_update"]).getFullYear();
        }

        var configData = [];
        var filtereDashboardConfig =
          userGoalThresholdConfig[0].threshold.filter(function (el) {
            return el.key == config.key;
          });
        console.log("TTest config key " + config.key);
        console.log(
          "TTest userGoalThresholdConfig[0].threshold " +
            userGoalThresholdConfig[0].threshold
        );
        console.log("TTest 4 " + filtereDashboardConfig);
        filteredUserdata.forEach(function (itemData) {
          console.log("TTest 5");
          var data = itemData["response"]["data"][0][config.dataSource];
          var filterItem = "";
          if (filter == "hourly") {
            filterItem = new Date(
              itemData["response"]["user"]["last_webhook_update"]
            ).getUTCHours();
          } else if (filter == "weekly") {
            filterItem = new Date(
              itemData["response"]["user"]["last_webhook_update"]
            );
            filterItem =
              filterItem.getUTCDate() +
              "-" +
              parseInt(filterItem.getUTCMonth() + 1) +
              "-" +
              filterItem.getFullYear();
            // filterItem = new Date(itemData["response"]["user"]["last_webhook_update"]).toLocaleDateString('en-US', { weekday: 'short' });
          } else if (filter == "monthly") {
            filterItem = new Date(
              itemData["response"]["user"]["last_webhook_update"]
            ).toLocaleDateString("en-US", { month: "long" });
          } else if (filter == "yearly") {
            filterItem = new Date(
              itemData["response"]["user"]["last_webhook_update"]
            ).getFullYear();
          }
          console.log("TTest 6");
          if (config.dataSource != "") {
            console.log("TTest 7");
            let val = getValuefromDataKey(data, config.datakey);
            var configObj = {};
            configObj["name"] = filterItem;
            configObj["value"] = val;
            if (filtereDashboardConfig.length > 0) {
              console.log("TTest 8");
              var keys = Object.keys(filtereDashboardConfig[0].thresholds);
              keys.forEach(function (key) {
                configObj[key] = filtereDashboardConfig[0].thresholds[key];
              });
            }
            console.log("TTest 9");
            configData.push(configObj);
          }
        });
        if (dashboardData[config.dashboardSection] == undefined) {
          dashboardData[config.dashboardSection] = [];
        }
        //  dashboardData[config.dashboardSection][config.key] = getValuefromDataKey(data, config.datakey);
        console.log("TTest 10 " + filtereDashboardConfig);
        filterItemValues.forEach(function (value) {
          if (!configData.some((config) => config.name == value)) {
            // configData.push({
            //   "name": value,
            //   "value": ""
            // })
            var configObj = {};
            configObj["name"] = value;
            configObj["value"] = "0";
            if (filtereDashboardConfig.length > 0) {
              console.log("TTest 11");
              var keys = Object.keys(filtereDashboardConfig[0].thresholds);
              keys.forEach(function (key) {
                configObj[key] = filtereDashboardConfig[0].thresholds[key];
              });
            }
            configData.push(configObj);
          }
        });
        if (filtereDashboardConfig.length > 0) {
          console.log("TTTest 12");
          var data = {};
          data["key"] = config.key;
          data["active"] = config.active;
          data["icon"] = config.icon;
          data["label"] = config.label;
          data["data"] = configData;
          dashboardData[config.dashboardSection].push(data);
        }
      }
    });

    console.log("dashbaord data " + JSON.stringify(dashboardData));
    dashboardData["user_id"] = userId;
    res.json(dashboardData);
    function getValuefromDataKey(data, datakey) {
      var value = "";
      datakey.forEach(function (keyitem) {
        if (value == "") {
          if (keyitem.type == "arr") {
            if (data[keyitem.key].length > 0) {
              value = data[keyitem.key][0];
            }
          } else {
            value = data[keyitem.key];
          }
        } else {
          if (keyitem.type == "arr") {
            if (value[keyitem.key].length > 0) {
              value = value[keyitem.key][0];
            }
          } else {
            value = value[keyitem.key];
          }
        }
      });
      return value === "" ? "0" : value;
    }
  }
});
router.get("/getIcons", async (req, res) => {
  const icons = await dbClient.getAllIcons();
  res.json(icons);
});

module.exports = router;
