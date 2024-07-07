import React from "react";
import { Card, CardBody } from "@nextui-org/react";

const legend = [
  { name: "Catering", description: "Places of public catering: restaurants, cafes, bars, etc.", color: '#4B0082' },
  { name: "Commercial", description: "Places where one can buy or sell things (Shops and shopping centers).", color: '#008080' },
  { name: "Production", description: "Sites and facilities where goods and products are manufactured or processed", color: '#00FFFF' },
  { name: "Service", description: "Places that provide services to the public: banks, cleaning services, post, gas stations, etc.", color: '#FF1493' },
  { name: "Office", description: "An office of a business, company, administration, or organization", color: '#931621' },
];

export const CardLegend = () => {
  return (
    <Card className="bg-default-50 rounded-xl shadow-md h-full" style={{ height: '100%' }}>
      <CardBody className="py-5 gap-4 overflow-y-auto h-full" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="flex flex-col gap-6 flex-grow">
          {legend.map((legend) => (
            <div key={legend.name} className="flex w-full">
              <span className="text-default-900 font-semibold" style={{ color: legend.color, minWidth: '150px' }}>
                {legend.name}
              </span>
              <span className="text-default-500">{legend.description}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
