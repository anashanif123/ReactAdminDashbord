import React from "react";
import Card from "./Card";

const FeaturesWidget: React.FC = () => {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-2xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Features Widget
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Showcase some marketplace features here. Replace this placeholder with
        real widget content.
      </p>
    </Card>
  );
};

export default FeaturesWidget;
