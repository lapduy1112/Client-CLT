"use client";
import MainLayout from "../MainLayout";
import React, { useState } from "react";

export default function RouteDetail() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <div>Route Detail</div>
        <div>Map</div>
      </div>
    </MainLayout>
  );
}
