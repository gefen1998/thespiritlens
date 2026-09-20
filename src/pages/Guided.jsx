import React from "react";
import { Navigate } from "react-router-dom";

// The check-in now lives on the home screen; keep the old link working.
export default function Guided() {
  return <Navigate to="/" replace />;
}
