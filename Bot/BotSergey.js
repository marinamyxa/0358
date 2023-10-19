// ==UserScript==
// @name         Bot for Bing
// @namespace    http://tampermonkey.net/
// @version      0.3
// @version      0.2
// @description  Bot
// @author       Chizhikov Sergey
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @match        https://motoreforma.com/*
// @match        https://kiteuniverse.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
@@ -24,64 +26,80 @@ let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];

if (searchBtn != null) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com"){
  site = getCookie("site");
} else {
  site = location.hostname;
}

//Работаем на главной странице
if (searchBtn != null) {
  let i = 0;
  let timerId = setInterval(() => {
    input.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      searchBtn.click();
    }
  }, 500)
  input.value = keyword;
  searchBtn.click();
  //let i = 0;
  //let timerId = setInterval(() => {
  //input.value += keyword[i];
  //i++;
  //if (i == keyword.length) {
  //clearInterval(timerId);
  // searchBtn.click();
  //}
  //}, 500)

  } else if (location.hostname == site) {
    //Работаем на целевом сайте
    console.log("Мы на целевом сайте!");
    setInterval(() => {
      let index = getRandom(0, links.length); 
} else if (location.hostname == site) {
  //Работаем на целевом сайте
  console.log("Мы на целевом сайте!");
  setInterval(() => {
    let index = getRandom(0, links.length);

      if (getRandom(0, 101) >= 80) {
        location.href = "https://www.bing.com/";
      }
      if (links[index].href.includes(site)) {
        links[index].click();
      }
    }, getRandom(2000, 5000))
    if (getRandom(0, 101) >= 80) {
      location.href = "https://www.bing.com/";
    }
    if (links[index].href.includes(site)) {
      links[index].click();
    }
  }, getRandom(2000, 5000))

  } else if (document.querySelector(".b_scopebar") != null){
    //Работаем на странице поисковой выдачи
    let nextPage = true;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.includes(site)) {
        let link = links[i];
} else if (document.querySelector(".b_scopebar") != null){
  //Работаем на странице поисковой выдачи
  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes(site)) {
      let link = links[i];
      nextPage = false;
      console.log("Нашел строку!" + link);
      setTimeout(() => {
        link.click();
      }, getRandom(2500, 5000))
      break;
    }
  }
  let elemExist = setInterval(() => {
    let element = document.querySelector(".sb_pagS");
    if (element != null) {
      if (element.innerText == "4") {
        nextPage = false;
        console.log("Нашел строку!" + link);
        setTimeout(() => {
          link.click();
        }, getRandom(2500, 5000))
        break;
        location.href = "https://www.bing.com/";
      }
      clearInterval(elemExist);
    }
    let elemExist = setInterval(() => {
      let element = document.querySelector(".sb_pagS");
      if (element != null) {
        if (element.innerText == "4") {
          nextPage = false;
          location.href = "https://www.bing.com/";
        }
        clearInterval(elemExist);
      }
    }, 100)
  }, 100)

    if (nextPage) {
      setTimeout(() => {
        document.querySelector(".sb_pagN").click();
      }, getRandom(3000, 5000))
    }
  if (nextPage) {
    setTimeout(() => {
      document.querySelector(".sb_pagN").click();
    }, getRandom(3000, 5000))
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
