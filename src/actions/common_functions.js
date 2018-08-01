import React from 'react';
import fire from '../firebase';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';

export function raedMessage(useruid, contactid) {
  const updates = {};
  updates[`friendships/${useruid}/${contactid}/isUnraed`] = "None";
  fire.database().ref().update(updates);
}

export function getUnraedBadge(isUnread) {
  // possible - 0(marked as unraed), some number, "None" - all raed
  if (isUnread === "None") {
    return <span />;
  }
  return (
    <span className="pull-right unraed-badge">
      <Badge badgeContent={isUnread === 0 ? "" : isUnread} primary={true} />
    </span>
  );
}

export function updateStatusInConversation(useruid, contactid, isTyping) { // updates to "Online", "Last seen 01.01.2010" or "Typing"
  const updates = {};
  updates[`friendships/${useruid}/${contactid}/isTyping`] = isTyping;
  fire.database().ref().update(updates);
}

export function updateLastSeen(useruid, lastSeen, callback) { // updates to "Online", "Last seen 01.01.2010" or "Typing"
  console.log(useruid)
  const updates = {};
  updates[`users/${useruid}/lastSeen`] = lastSeen;
  fire.database().ref().update(updates).then(() => {
    callback();
  });
}

export function getLastSeenString(isTyping, lastSeen) {
  if (isTyping) {
    return "Typing...";
  }
  if (lastSeen === "Online") {
    return lastSeen;
  }
  // lastSeen === yyyy-mm-dd hh:mm:ss
  const splitted = lastSeen.split(" ");
  let dateString = splitted[0];
  let splittedDate = dateString.split("-");
  let hourString = splitted[1];
  let splittedHour = hourString.split(":");

  const dateObject = new Date(splittedDate[0], splittedDate[1] - 1, splittedDate[2]);
  if (checkIfToday(new Date(), dateObject)) {
    return `Last seen today at ${splittedHour[0]}:${splittedHour[1]}`;
  }
  if (checkIfYesterday(new Date(), dateObject)) {
    return `Last seen yesterday at ${splittedHour[0]}:${splittedHour[1]}`;
  }
  if (checkIfLastWeek(new Date(), dateObject)) {
    const day = getDayFromDayNumber(dateObject.getDay());
    return `Last seen ${day} at ${splittedHour[0]}:${splittedHour[1]}`;
  }

  return `Last seen at ${getCorrectDate(dateString)} ${getCorrectHour(hourString)}`;
}


export function getDateHourString() { // for last seen
  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const hourString = `${date.getHours()}:${date.getMinutes()}`;
  return `${dateString} ${hourString}`
}

export function sortByUid(array) {
  return array.sort();
}

export function getCharFromNumber(number) {
  const possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return possible.charAt(number);
}

export function makeMessageID() {
  const date = new Date();
  const dateString = `${getCharFromNumber(date.getFullYear() - 2000)}${getCharFromNumber(date.getMonth())}${getCharFromNumber(date.getDate())}`;
  const hourString = `${getCharFromNumber(date.getHours())}${getCharFromNumber(date.getMinutes())}${getCharFromNumber(date.getSeconds())}`;
  return `${dateString}${hourString}`;
}

export function validateEmail(email) {
  // check in db if user already exists
  // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  return true;
}

export function validatePassword(password) {
  if (password.length < 6) {
    return 'short';
  }
  return true;
}

export function getCorrectDate(time) {
  const dateArray = time.split('-');
  let year = dateArray[0];
  let month = dateArray[1];
  let day = dateArray[2];
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`
}

export function getCorrectHour(time) {
  const hourArray = time.split(':');
  let hour = hourArray[0];
  let minute = hourArray[1];
  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${minute}` : minute;
  return `${hour}:${minute}`
}

export function getCircularProgress() {
  return (
    <MuiThemeProvider>
      <div className="center">
        <CircularProgress size={80} thickness={5} />
      </div>
    </MuiThemeProvider>
  );
}

export function getChatBubbleDate(nextMessage) {
  let lastTime = getLastMessageTime(nextMessage);
  lastTime = lastTime.includes(":") ? "Toady" : lastTime;
  return (
    <div key={nextMessage.date}>
      <div className="day-indicator">
        {lastTime}
      </div>
      <Divider />
    </div>
  )
}

export function filterBySearch(array, subString) {
  return _.filter(array, contact => {
    const name = contact.info ? contact.info.name : contact.name;
    return name.toLowerCase().startsWith(subString.toLowerCase());
  });
}

export function sortContactsByLastMessageTime(array) {
  return array.sort((a, b) => {
    array.map((contact) => {
      if (!contact.lastMessage) { // no last message- return high epoch
        contact.epoch = new Date(2020, 12, 12)
      } else {
        const splitDays = contact.lastMessage.date.split('-');
        const splitHours = contact.lastMessage.hour.split(':');
        const epoch = new Date(splitDays[0], splitDays[1], splitDays[2],
          splitHours[0], splitHours[1], splitHours[2]).getTime() / 1000;
        contact.epoch = epoch;
      }
      return contact;
    });
    return (a.epoch > b.epoch) ? -1 : ((b.epoch > a.epoch) ? 1 : 0);
  });
}

export function splitToPinned(array) {
  const pinned = _.filter(array, (contact) => {
    return contact.pinned;
  });
  const notPinned = _.filter(array, (contact) => {
    return !contact.pinned;
  });
  return [...pinned, ...notPinned];
}

export function getLastMessageTime(lastMessage) {
  if (!lastMessage || lastMessage.date === " " || lastMessage.hour === "0:0:0") {
    return "";
  }
  const splitDate = lastMessage.date.split('-');
  const today = new Date();
  const dateObject = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);
  if (checkIfToday(today, dateObject))
    return getCorrectHour(lastMessage.hour);

  if (checkIfYesterday(today, dateObject))
    return "Yesterday";

  if (checkIfLastWeek(today, dateObject))
    return getDayFromDayNumber(dateObject.getDay());

  return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`; // not today, and not in this week
}

function checkIfToday(today, dateObject) {
  if (today.getFullYear() === dateObject.getFullYear() &&
    today.getMonth() === dateObject.getMonth() &&
    today.getDate() === dateObject.getDate())
    return true;
  return false;
}

function checkIfYesterday(today, dateObject) {
  if (today.getFullYear() === dateObject.getFullYear() &&
    today.getMonth() === dateObject.getMonth() &&
    today.getDate() !== 1 &&
    (today.getDate() - 1) === dateObject.getDate())  // not first day of month
    return true;

  if (today.getFullYear() === dateObject.getFullYear() &&
    today.getDate() === 1 &&
    today.getMonth() - 1 === dateObject.getMonth() &&
    getLastDayOfPrevMonth(today.getMonth()) === dateObject.getDate()) // first day of month
    return true;

  if (today.getDate() === 1 &&
    today.getMonth() === 0 &&
    dateObject.getDate() === 31 &&
    dateObject.getMonth() === 11 &&
    (today.getFullYear() - 1) === dateObject.getFullYear()) // first day of year
    return true;

  return false; // nothing from above
}

function checkIfLastWeek(today, dateObject) {
  const dayInSeconds = 60 * 60 * 24;
  if (((today.getTime() / 1000) - (dateObject.getTime() / 1000)) < 7 * dayInSeconds) // not today or yesterday, but in this week
    return true;
  return false;
}

export function compareDates(date1, date2) {
  const split1 = date1.split('-');
  const split2 = date2.split('-');
  if (split1[0] === split2[0] &&
    split1[1] === split2[1] &&
    split1[2] === split2[2]) { // not on the same day
    return true;
  }
  return false;
}

function getDayFromDayNumber(dayNumber) {
  dayNumber = dayNumber > 6 || dayNumber < 0 ? 0 : dayNumber;
  const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysArray[dayNumber];
}

function getLastDayOfPrevMonth(month) {
  if (month === 1) return 28;
  else if (month === 3 || month === 5 || month === 8 || month === 10) return 30;
  else return 31;
}

export function getLastMessage(isTyping, { content }, name) {
  if (isTyping) {
    return "Typing..."; // "Typing"
  }
  if (content) {
    const textWidth = (window.innerWidth - 100) / 9;
    // "last message cut or full"
    return content.length > textWidth ? `${content.substr(0, textWidth)}...` : content;
  }
  return `Start a conversation with ${name}`; // no last message
}

export function getAvatarsNames() {
  const numberOfAvatars = 7;
  const arrayOfAvatarsNames = [];
  arrayOfAvatarsNames.push('default.png');
  for (let i = 1; i <= numberOfAvatars; i++) { // insert names into array
    arrayOfAvatarsNames.push(`contact${i}.png`);
  }
  return arrayOfAvatarsNames;
}