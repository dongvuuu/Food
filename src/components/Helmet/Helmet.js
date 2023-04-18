import React from "react";

const Helmet = (props) => {
    document.title = "f 0_0 d - " + props.title;
    return <div className="w-100">{props.children}</div>;

};

export default Helmet;