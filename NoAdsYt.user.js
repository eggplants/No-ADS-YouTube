// ==UserScript==
// @name         No ADS - YouTube
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  - Skips all youtube ads - | - undetectable - | - skips ads instantly -
// @author       GSRHaX
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @icon         https://i.ibb.co/X5f50Cg/Screen-Shot-2021-07-19-at-9-31-54-PM.png
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  let ogVolume = 1;
  let pbRate = 1;

  const get = (className) => document.getElementsByClassName(className);
  const getFirst = (className) => get(className)[0];
  const isExistsElm = (elm) => ![undefined, null].includes(elm);
  const isExists = (className) => isExistsElm(getFirst(className));

  setInterval(() => {
    if (!isExists("video-stream html5-main-video")) {
      return;
    }

    const ad = getFirst("video-ads ytp-ad-module");
    const vid = getFirst("video-stream html5-main-video");
    // if (!isExistsElm(ad)) { pbRate = vid.playbackRate; }
    if (
      isExistsElm(ad) &&
      ad.children.length > 0 &&
      isExists("ytp-ad-text ytp-ad-preview-text")
    ) {
      vid.playbackRate = 16;
      vid.muted = true;
    }

    // closeAble
    Array.from(get("ytp-ad-overlay-close-button")).forEach((e) => e.click());

    // skipBtn
    getFirst("ytp-ad-text ytp-ad-skip-button-text")?.click();

    const sideAd1 = getFirst(
      "style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement",
    );
    if (!isExistsElm(sideAd1)) {
      sideAd1.style.display = "none";
    }

    const sideAd2 = getFirst(
      "style-scope ytd-item-section-renderer sparkles-light-cta",
    );
    if (!isExistsElm(sideAd2)) {
      sideAd2.style.display = "none";
    }

    const incomingAd = getFirst("ytp-ad-message-container");
    if (!isExistsElm(incomingAd)) {
      incomingAd.style.display = "none";
    }

    // bottomSideAd
    getFirst("style-scope ytd-companion-slot-renderer")?.remove();

    // headerAd
    document.getElementById("masthead-ad")?.remove();

    // rightSideAd
    document.getElementsByTagName("ytd-ad-slot-renderer")[0]?.remove();

    // rightSideShorts
    document.getElementsByTagName("ytd-reel-shelf-renderer")[0]?.remove();
  }, 100);
})();
