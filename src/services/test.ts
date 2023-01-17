async function addService(params: ITime) {
  try {
    const { userId, getIP } = params;
    var startDate = moment(new Date()).startOf("date");
    var endDate = moment(new Date()).endOf("date");
    // await Database.connectDb();
    var countTime = await Time.findOne({
      startDate: startDate,
      endDate: endDate,
      userId: userId,
    });
    if (!!countTime) {
      var currentTime = moment(new Date());
      const { isWork, isButtonWork, isBreak, isButtonBreak, notes } = params;
      if (!isWork && !isBreak) {
        var firstTime = moment(countTime.entryDateTime);
        var secondTime = moment(countTime.breakdifferenceInSeconds);
        var diffence = currentTime.diff(firstTime, "second");
        var difference = currentTime.diff(secondTime, "second");
        var displayBreak = moment
          .duration(difference, "seconds")
          .format("hh:mm:ss", { trim: false });
        var displayWork = moment
          .duration(diffence, "seconds")
          .format("hh:mm:ss", { trim: false });
        var iCountTime = await Time.findOneAndUpdate(
          { startDate: startDate, endDate: endDate, userId: userId },
          {
            $set: {
              entryDateTime: new Date(),
              exitDateTime: new Date(),
              lastUpdateDate: new Date(),
              isBreak: isBreak,
              isWork: isWork,
              isActive: false,
              isButtonWork: false,
              isButtonBreak: false,
              displayBreak: displayBreak,
              displayWork: displayWork,
              notes: notes,
            },
            $inc: {
              workdifferenceInSeconds: parseInt(diffence),
            },
            $addToSet: {
              ipAddress: getIP,
            },
          },
          { new: true }
        );
        return {
          status: true,
          data: iCountTime,
        };
      } else if (isWork && isBreak) {
        var firstTime = moment(countTime.entryDateTime);
        var diffence = currentTime.diff(firstTime, "second");
        var iCountTime = await Time.findOneAndUpdate(
          {
            startDate: startDate,
            endDate: endDate,
            userId: userId,
            isActive: true,
          },
          {
            $set: {
              entryDateTime: new Date(),
              exitDateTime: new Date(),
              breakentryDateTime: new Date(),
              lastUpdateDate: new Date(),
              isBreak: isBreak,
              isWork: isWork,
            },
            $inc: {
              workdifferenceInSeconds: parseInt(diffence),
              break: parseInt("1"),
            },
            $addToSet: {
              ipAddress: getIP,
            },
          },
          { new: true }
        );
        return {
          status: true,
          data: iCountTime,
        };
      } else if (isWork && !isBreak) {
        var firstTime = moment(countTime.breakentryDateTime);
        var diffence = currentTime.diff(firstTime, "second");
        var iCountTime = await Time.findOneAndUpdate(
          {
            startDate: startDate,
            endDate: endDate,
            userId: userId,
            isActive: true,
          },
          {
            $set: {
              entryDateTime: new Date(),
              breakentryDateTime: new Date(),
              breakexitDateTime: new Date(),
              lastUpdateDate: new Date(),
              isBreak: isBreak,
              isWork: isWork,
            },
            $inc: {
              breakdifferenceInSeconds: parseInt(diffence),
            },
            $addToSet: {
              ipAddress: getIP,
            },
          },
          { new: true }
        );
        return {
          status: true,
          data: iCountTime,
        };
      }
    } else {
      var addTime = new Time({
        // Own User Id
        userId: userId,
        // Start Date And Time -- Current Date
        startDate: startDate,
        // End Date -- Current Date
        endDate: endDate,
        // First Work Entry Time -- Work Entry Time
        firstworkentryDateTime: new Date(),
        // Work Date-Time -- Work Start Every Time
        entryDateTime: new Date(),
        // exitDateTime : /// Work Date-Time -- Work End Every Time
        // breakentryDateTime : /// Break Date-Time -- Break Start Every Time
        // breakexitDateTime : /// Break Date-Time -- Break End Every Time
        // breakdifferenceInSeconds: /// Break different in seconds -- All Time
        // workdifferenceInSeconds: /// Work different in second -- All Time
        // break: /// Break Count in Per Day -- How may Times Break in per day
        // Work is start -- Work is Start - Button update -- Work Time Out
        isWork: true,
        // isButtonWork : /// Work button disable or enable, When Click on Break , disable button
        // isBreak: /// Break is start -- Break is start - Button update -- Break Time Out
        // Break button disable or enable, When day start on button, enable button
        isButtonBreak: true,
        // Last Update Date
        lastUpdateDate: new Date(),
      });
      addTime = await addTime.save();
      // await Database.disconnectDB();
      return {
        status: true,
        data: addTime,
      };
    }
  } catch (error) {
    return {
      status: false,
    };
  }
}
