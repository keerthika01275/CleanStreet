import React from "react";
import { FaTrash, FaRoad, FaTint, FaLightbulb } from "react-icons/fa";
import "./floating.css";

export default function FloatingIcons(){
  return (
    <div className="floating-icons">

      <FaTrash className="icon i1"/>
      <FaRoad className="icon i2"/>
      <FaTint className="icon i3"/>
      <FaLightbulb className="icon i4"/>

      <FaTrash className="icon i5"/>
      <FaRoad className="icon i6"/>
      <FaTint className="icon i7"/>
      <FaLightbulb className="icon i8"/>

    </div>
  );
}