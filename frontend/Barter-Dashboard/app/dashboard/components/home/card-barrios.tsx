

import React from 'react';
import { Card, CardBody } from '@nextui-org/react';

const barrios = [
  { name: 'Centro', businesses: 120 },
  { name: 'Salamanca', businesses: 85 },
  { name: 'Retiro', businesses: 75 },
  { name: 'Chamartin', businesses: 70 },
  { name: 'Tetuan', businesses: 65 },
  { name: 'Chamberi', businesses: 60 },
  { name: 'Arganzuela', businesses: 55 },
  { name: 'Latina', businesses: 50 },
  { name: 'Carabanchel', businesses: 45 },
  { name: 'Fuencarral-El Pardo', businesses: 40 },
  { name: 'Barajas', businesses: 35 },
  { name: 'Hortaleza', businesses: 30 },
  { name: 'Usera', businesses: 25 },
  { name: 'Puente de Vallecas', businesses: 20 },
  { name: 'Villa de Vallecas', businesses: 15 },
  { name: 'Vicálvaro', businesses: 10 },
  { name: 'San Blas-Canillejas', businesses: 5 },
  { name: 'Moratalaz', businesses: 3 },
];

export const CardBarrios = () => {
    return (
      <Card className="bg-default-50 rounded-xl shadow-md" style={{ height: '500px' }}>
        <CardBody className="py-5 gap-4 overflow-y-auto" style={{ height: '100%' }}>
          <div className="flex flex-col gap-6">
            {barrios.map((barrio) => (
              <div key={barrio.name} className="flex justify-between w-full">
                <span className="text-default-900 font-semibold">
                  {barrio.name}
                </span>
                <span className="text-default-500">
                  {barrio.businesses}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
};