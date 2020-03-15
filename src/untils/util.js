import moment from "moment";
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " + [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
const getStatusAndTime = (start, end) => {
  const now = new Date().valueOf()
  let countdownTime
  if (now > end) {
    return {
      countdownLabel: '已结束',
      countdownTime: moment(end, 'x').format('MM-DD HH:mm')
    }
  } else if (now >= start) {
    const duration = moment.duration(end - now, 'milliseconds')
    if (duration.days() >= 1) {
      countdownTime = `距结拍 >${duration.days()}天`
    } else {
      // const hour =
      //   duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()
      const hour = duration.hours() < 1 ? `` : `${duration.hours()}时`
      const minutes =
        duration.minutes() < 10 ? `0${duration.minutes()}分` : `${duration.minutes()}分`
      // const seconds =
      //   duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
      countdownTime = `距结拍 ${hour}${minutes}`
    }
    return {
      countdownLabel: '竞拍中',
      countdownTime
    }
  } else {
    const duration = moment.duration(start - now, 'milliseconds')
    if (duration.days() >= 1) {
      countdownTime = `距开拍 >${duration.days()}天`
    } else {
      // const hour =
      //   duration.hours() < 10 ? `0${duration.hours()}` : duration.hours()
      const hour = duration.hours() < 1 ? `` : `${duration.hours()}时`
      const minutes =
        duration.minutes() < 10 ? `0${duration.minutes()}分` : `${duration.minutes()}分`
      // const seconds =
      //   duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
      countdownTime = `距开拍 ${hour}${minutes}`
    }
    return {
      countdownLabel: '预展中',
      countdownTime
    }
  }
};

/* 计算数据拉取倒计时使用级别
* 0 为数据不进行倒计时拉取
* 1 为数据进行秒级倒计时拉取
* 2 为数据进行分级倒计时拉取
* 3 为数据进行时级倒计时拉取
* 4 为数据进行天级倒计时拉取
*/
const getLevel = (start, end) => {
  const now = new Date().valueOf();
  let level;
  if (now > end) {
    level = 0;
    return {
      level
    }
  } else if (now >= start) {
    const duration = moment.duration(end - now, 'milliseconds')
    if (duration.days() >= 1) {
      level = 4;
    } else {
      // 大于一小时，小时级倒计时，显示多少小时
      if(duration.hours() >= 1){
        level = 3;
      } else {
        // 小于一小时，分钟级倒计时，显示多少分钟
        if(duration.minutes() >= 1){
          // 大于一分钟，分钟级倒计时，显示多少分钟
          level = 2;
        } else {
          level = 1;
        }
      }
    }
    return {
      level,
    }
  } else {
    const duration = moment.duration(start - now, 'milliseconds')
    if (duration.days() >= 1) {
      level = 4;
    } else {
      // 大于一小时，小时级倒计时，显示多少小时
      if(duration.hours() >= 1){
        level = 3;
      }else{
        // 小于一小时，分钟级倒计时，显示多少分钟
        if(duration.minutes() >= 1){
          // 大于一分钟，分钟级倒计时，显示多少分钟
          level = 2;
        } else {
          level = 1;
        }
      }
    }
    return {
      level,
    }
  }
};
const getEndTimeDiff = end => {
  const now = new Date().valueOf();
  if (now < end) {
    return {
      countdownLabel: "竞拍中",
      countdownTime: moment
        .utc(moment(end, "x").diff(moment(now, "x")))
        .format("HH:mm:ss")
    };
  } else if (now > end) {
    return {
      countdownLabel: "已结束",
      countdownTime: moment(end, "x").format("MM-DD HH:mm")
    };
  }
};

export {
  formatTime,
  getStatusAndTime,
  getEndTimeDiff,
  getLevel
};
