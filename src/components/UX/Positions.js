import React from "react";

const AbsPos = ({ tag, className, vhCentered, children, ...props }) =>
  React.createElement(
    tag,
    {
      className:
        "abs-pos" +
        (vhCentered ? " vh-center vh-center-real" : "") +
        (className ? " " + className : ""),
      ...props
    },
    children
  );

AbsPos.defaultProps = {
  tag: "div"
};

const RelPos = ({ tag, className, topRightCorner, children, ...props }) =>
  React.createElement(
    tag,
    {
      className: "rel-pos" + (className ? " " + className : ""),
      ...props
    },
    <React.Fragment>
      {topRightCorner && (
        <AbsPos style={{ top: "5px", right: "5px" }}>{topRightCorner}</AbsPos>
      )}
      {children}
    </React.Fragment>
  );

RelPos.defaultProps = {
  tag: "div"
};

export { RelPos, AbsPos };
