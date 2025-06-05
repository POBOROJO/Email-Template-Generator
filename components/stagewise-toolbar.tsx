"use client";

import { StagewiseToolbar } from "@stagewise/toolbar-next";

export function StagewiseToolbarWrapper() {
  const stagewiseConfig = {
    plugins: [],
  };

  return <StagewiseToolbar config={stagewiseConfig} />;
}
