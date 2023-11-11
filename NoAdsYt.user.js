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

  // let ogVolume = 1;
  // let pbRate = 1;

  const getFirst = (className) => document.getElementsByClassName(className)[0];

  setInterval(() => {
    // bottomSideAd
    getFirst("style-scope ytd-companion-slot-renderer")?.remove();

    // headerAd
    document.getElementById("masthead-ad")?.remove();

    // rightSideAd
    Array.from(document.getElementsByTagName("ytd-ad-slot-renderer")).forEach(e=>e.remove());

    // rightSideShorts
    Array.from(document.getElementsByTagName("ytd-reel-shelf-renderer")).forEach(e=>e.remove());

    // skip following ad remover unless video page
    if (!getFirst("video-stream html5-main-video")) {
      return;
    }

    const ad = getFirst("video-ads ytp-ad-module");
    const vid = getFirst("video-stream html5-main-video");
    // if (!ad) { pbRate = vid.playbackRate; }
    if (
      ad &&
      ad.children.length > 0 &&
      getFirst("ytp-ad-text ytp-ad-preview-text")
    ) {
      vid.playbackRate = 16;
      vid.muted = true;
    }

    // closeAble
    Array.from(document.getElementsByClassName("ytp-ad-overlay-close-button")).forEach((e) => e.click());

    // skipBtn
    getFirst("ytp-ad-text ytp-ad-skip-button-text")?.click();

    // Hover Ad for YouTube Premium
    document.getElementById("dismiss-button")?.click();

    const sideAd1 = getFirst(
      "style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement",
    );
    if (sideAd1?.style) {
      sideAd1.style.display = "none";
    }

    const sideAd2 = getFirst(
      "style-scope ytd-item-section-renderer sparkles-light-cta",
    );
    if (sideAd2?.style) {
      sideAd2.style.display = "none";
    }

    const incomingAd = getFirst("ytp-ad-message-container");
    if (incomingAd?.style) {
      incomingAd.style.display = "none";
    }
  }, 100);
})();
