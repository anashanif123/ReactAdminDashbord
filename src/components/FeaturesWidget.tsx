import React from "react";
import { CheckCircle, BarChart3, Users, Zap } from "lucide-react";
import Card from "./Card";

const demoFeatures = [
  {
    icon: CheckCircle,
    title: "Easy Integration",
    description: "Seamlessly connect with your existing tools and workflows.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Gain insights into customer behavior and performance.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Empower your team to work together in real time.",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Save time with automated tasks and smart triggers.",
  },
];

const FeaturesWidget: React.FC = () => {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 shadow-xl rounded-2xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Features
      </h2>
      <ul className="space-y-4">
        {demoFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <li key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default FeaturesWidget;
