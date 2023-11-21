const express = require("express");
const router = express.Router();
const dbClient = require("../client/dbClient");

router.get("/info/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("userId: ", userId);

  const teamInfo = await dbClient.fetchTeamDetails(userId);
  console.log("teamInfo: ", teamInfo);
  let team = [];

  const promise = teamInfo.map(async (mate) => {
    let data = await fetchData(mate.mateId);

    if (data?.health) {
      data.health.map((healthData) => {
        mate[healthData.key] = {
          icon: healthData.icon,
          value: healthData.value ? healthData.value : healthData.progressValue,
          unit: healthData?.unit,
        };
      });
    }
    if (data?.fitness) {
      data.health.map((fitnessData) => {
        mate[fitnessData.key] = {
          icon: fitnessData.icon,
          value: fitnessData.value
            ? fitnessData.value
            : fitnessData.progressValue,
          unit: fitnessData?.unit,
        };
      });
    }
    if (data?.nutrition) {
      data.health.map((nutritionData) => {
        mate[nutritionData.key] = {
          icon: nutritionData.icon,
          value: nutritionData.value
            ? nutritionData.value
            : nutritionData.progressValue,
          unit: nutritionData?.unit,
        };
      });
    }

    console.log("Mate: ", mate);

    team.push(mate);
  });

  await Promise.all(promise);

  res.status(200).json(team);
});

async function fetchData(mateUserId) {  
  const userDashboardConfig = await dbClient.fetchUserDashboardMetricConfig(
    mateUserId
  );

  const userTeamPreferences = await dbClient.fetchUserTeamPreferences(
    mateUserId
  );
  console.log("userTeamPreferences:", userTeamPreferences);
  if (userTeamPreferences?.status == "empty") {
    return {
      status: "empty",
      message: "No team preference set for given user id",
    };
  }

  const dashboardMetricDataConfig =
    await dbClient.fetchDashboardMetricDataConfig(mateUserId);

  const TerraData = await dbClient.fetchTerraData(mateUserId);
  const userGoalThresholdConfig = await dbClient.fetchUserGoalThresholdConfig(
    mateUserId
  );

  var filteredUserdataNew = TerraData.filter(function (el) {
    if (el.response) {
      return el.response.user.user_id == mateUserId;
    }
  });
  var teamData = {};
  var date;
  dashboardMetricDataConfig.forEach(function (config) {
    var filteredDashboardPreferenceConfig =
      userTeamPreferences.preference.filter(function (el) {
        return el.item == config.key && el.isPreferred && el.active;
      });

    if (filteredDashboardPreferenceConfig.length > 0) {
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
          var data =
            filteredUserdata[0]["response"]["data"][0][config.dataSource];
          if (teamData[config.dashboardSection] == undefined) {
            teamData[config.dashboardSection] = [];
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
          var teamObj = {};
          teamObj["key"] = config.key;
          teamObj["active"] = config.active;
          teamObj["icon"] = config.icon;
          teamObj["label"] = config.label;
          if (filtereDashboardConfig.length > 0) {
            if (filtereDashboardConfig[0].progressLabel != undefined) {
              teamObj["type"] = "progress";
              teamObj["progressValue"] = val;
              teamObj["progressLabel"] =
                filtereDashboardConfig[0].progressLabel;
            } else {
              // filtereDashboardConfig[0]["value"] = val
              teamObj["value"] = val;
            }
            teamData[config.dashboardSection].push(teamObj);
          }
        } else {
          if (teamData[config.dashboardSection] == undefined) {
            teamData[config.dashboardSection] = [];
          }
          var filtereDashboardConfig =
            userGoalThresholdConfig[0].threshold.filter(function (el) {
              return el.key == config.key;
            });
          var teamObj = {};
          teamObj["key"] = config.key;
          teamObj["active"] = config.active;
          teamObj["icon"] = config.icon;
          teamObj["label"] = config.label;

          if (filtereDashboardConfig.length > 0) {
            if (filtereDashboardConfig[0].progressLabel != undefined) {
              teamObj["type"] = "progress";
              teamObj["progressValue"] = "0";
              teamObj["progressLabel"] =
                filtereDashboardConfig[0].progressLabel;
            } else {
              // filtereDashboardConfig[0]["value"] = val
              teamObj["value"] = "NA";
            }
            teamData[config.dashboardSection].push(teamObj);
          }
        }
      } else {
        if (teamData[config.dashboardSection] == undefined) {
          teamData[config.dashboardSection] = [];
        }
        var filtereDashboardConfig =
          userGoalThresholdConfig[0].threshold.filter(function (el) {
            return el.key == config.key;
          });
        var teamObj = {};
        teamObj["key"] = config.key;
        teamObj["active"] = config.active;
        teamObj["icon"] = config.icon;
        teamObj["label"] = config.label;
        if (filtereDashboardConfig.length > 0) {
          if (filtereDashboardConfig[0].progressLabel != undefined) {
            teamObj["type"] = "progress";
            teamObj["progressValue"] = "0";
            teamObj["progressLabel"] = filtereDashboardConfig[0].progressLabel;
          } else {
            // filtereDashboardConfig[0]["value"] = val
            teamObj["value"] = "NA";
          }
          teamData[config.dashboardSection].push(teamObj);
        }
      }
    }
  });
  if (Object.keys(teamData).length === 0) {
    return {
      status: "empty",
      message: "No data available for given user id",
    };
  } else {
    teamData["teamInfo"] = {
      name: "Test User",
      age: "47",
      plan: "athlete",
      weight: "186lbs",
      height: "5'11",
      stepscount: "250",
      heartrate: "180",
      calories: "150",
    };
    console.log("team data " + JSON.stringify(teamData));
    teamData["user_id"] = mateUserId;
    teamData["timestamp"] = date;

    return teamData;
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

router.get("/member/data/:teammateId/:filter", async (req, res) => {
  const { teammateId, filter } = req.params;
  if (filter == "live") {
    console.log("Inside live");

    const response = await fetchData(teammateId);
    res.status(200).json(response);
  } else {
    const userDashboardConfig = await dbClient.fetchUserDashboardMetricConfig(
      teammateId
    );

    const userTeamPreferences = await dbClient.fetchUserTeamPreferences(
      teammateId
    );
    if (userTeamPreferences?.status == "empty") {
      return {
        status: "empty",
        message: "No dashboard preference set for given user id",
      };
    }
    const dashboardMetricDataConfig =
      await dbClient.fetchDashboardMetricDataConfig(teammateId);
    const TerraData = await dbClient.fetchTerraData(teammateId);
    const userGoalThresholdConfig = await dbClient.fetchUserGoalThresholdConfig(
      teammateId
    );

    var dashboardData = {};
    dashboardMetricDataConfig.forEach(function (config) {
      var filteredDashboardPreferenceConfig =
        userTeamPreferences.preference.filter(function (el) {
          return el.item == config.key && el.isPreferred && el.active;
        });
      if (filteredDashboardPreferenceConfig.length > 0) {
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
                el.response.user.user_id == teammateId &&
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
                el.response.user.user_id == teammateId &&
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
                el.response.user.user_id == teammateId &&
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
        filteredUserdata.forEach(function (itemData) {
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
          if (config.dataSource != "") {
            let val = getValuefromDataKey(data, config.datakey);
            var configObj = {};
            configObj["name"] = filterItem;
            configObj["value"] = val;
            if (filtereDashboardConfig.length > 0) {
              var keys = Object.keys(filtereDashboardConfig[0].thresholds);
              keys.forEach(function (key) {
                configObj[key] = filtereDashboardConfig[0].thresholds[key];
              });
            }
            configData.push(configObj);
          }
        });
        if (dashboardData[config.dashboardSection] == undefined) {
          dashboardData[config.dashboardSection] = [];
        }
        //  dashboardData[config.dashboardSection][config.key] = getValuefromDataKey(data, config.datakey);
        filterItemValues.forEach(function (value) {
          if (!configData.some((config) => config.name == value)) {
            // configData.push({
            //   "name": value,
            //   "value": ""
            // })
            var configObj = {};
            configObj["name"] = value;
            configObj["value"] = "";
            if (filtereDashboardConfig.length > 0) {
              var keys = Object.keys(filtereDashboardConfig[0].thresholds);
              keys.forEach(function (key) {
                configObj[key] = filtereDashboardConfig[0].thresholds[key];
              });
            }
            configData.push(configObj);
          }
        });
        if (filtereDashboardConfig.length > 0) {
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
    dashboardData["user_id"] = teammateId;
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
      return value;
    }
  }
});

module.exports = router;
