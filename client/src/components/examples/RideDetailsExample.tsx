import RideDetails, { type RideData } from "../RideDetails";
import { useState } from "react";

// todo: remove mock functionality
const mockRideData: RideData = {
  rideId: "25Ext210334",
  equipmentNumber: "K509OA/AM4918",
  entranceDate: "2025-12-03 09:30",
  rideStatus: "Одобрено к отправке",
  areaId: "AFR",
  brokerServices: "yes",
};

export default function RideDetailsExample() {
  const [ride, setRide] = useState(mockRideData);

  const handleBrokerChange = (value: string) => {
    setRide({ ...ride, brokerServices: value });
    console.log("Broker services changed to:", value);
  };

  return (
    <div className="p-6 bg-background">
      <RideDetails ride={ride} onBrokerServicesChange={handleBrokerChange} />
    </div>
  );
}
