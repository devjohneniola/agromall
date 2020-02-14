import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/404";

import { ConfirmDialog, PopupModal } from "./components/UX";

// styles
import "./styles/bootstrap/bootstrap.min.css";
import "./styles/index.css";
import "./styles/agro-mall.css";

const AgroMall = () => {
  const [screenSize, setScreenSize] = useState();
  const [isMobile, setIsMobile] = useState(
    window ? window.innerWidth <= 768 : false
  );

  const [confirmDialog, setConfirmDialog] = useState(false);
  const [popupModal, setPopupModal] = useState(false);

  const showDialog = confirmDialog && typeof confirmDialog === "object";
  const showPopup = popupModal && typeof popupModal === "object";

  const showOverlay = showDialog || showPopup;

  useEffect(() => {
    if (!window) return () => {};

    const updateMobileState = () => {
      const winWidth = window.innerWidth;

      let scrnSize;
      switch (true) {
        case winWidth <= 575:
          scrnSize = "sm";
          break;
        case winWidth <= 768:
          scrnSize = "sm";
          break;
        default:
          scrnSize = "xl";
      }

      setScreenSize(scrnSize);
      setIsMobile(winWidth <= 768);
    };

    if (window.addEventListener)
      window.addEventListener("resize", updateMobileState);
    else if (window.attachEvent)
      window.attachEvent("onresize", updateMobileState);

    // cleanup in case
    return () => {
      if (window.removeEventListener)
        window.removeEventListener("resize", updateMobileState);
      else if (window.detachEvent)
        window.detachEvent("onresize", updateMobileState);
    };
  }, []);

  const commonProps = {
    screenSize,
    isMobile,
    setConfirmDialog,
    setPopupModal
  };

  return (
    <Router>
      <span id="attic"></span>
      <Header {...commonProps} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <span id="basement"></span>

      {showDialog && (
        <ConfirmDialog
          {...confirmDialog}
          afterClick={() => setConfirmDialog(false)}
        />
      )}
      {showPopup && (
        <PopupModal {...popupModal} afterClick={() => setPopupModal(false)} />
      )}
      {showOverlay && (
        <div
          className="overlay popup"
          onClick={() => {
            setConfirmDialog(false);
            setPopupModal(false);
          }}
        />
      )}
    </Router>
  );
};

export default AgroMall;
