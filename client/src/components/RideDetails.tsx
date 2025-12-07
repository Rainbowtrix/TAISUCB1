import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface RideData {
  rideId: string;
  equipmentNumber: string;
  entranceDate: string;
  rideStatus: string;
  areaId: string;
  brokerServices: string;
}

interface RideDetailsProps {
  ride: RideData;
  mode?: "broker" | "client";
  onBrokerServicesChange?: (value: string) => void;
}

export default function RideDetails({ ride, mode = "broker", onBrokerServicesChange }: RideDetailsProps) {
  const isBrokerMode = mode === "broker";

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground border-b border-primary/20 pb-2 flex items-center gap-2" data-testid="heading-ride-data">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        Данные рейса
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rideId">ID рейса</Label>
          <Input
            id="rideId"
            value={ride.rideId}
            readOnly
            className="bg-muted"
            data-testid="input-ride-id"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="equipmentNumber">Номер авто/сцепки</Label>
          <Input
            id="equipmentNumber"
            value={ride.equipmentNumber}
            readOnly
            className="bg-muted"
            data-testid="input-equipment-number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="entranceDate">Дата въезда</Label>
          <Input
            id="entranceDate"
            value={ride.entranceDate}
            readOnly
            className="bg-muted"
            data-testid="input-entrance-date"
          />
        </div>
        {isBrokerMode && (
          <>
            <div className="space-y-2">
              <Label htmlFor="rideStatus">Статус рейса</Label>
              <Input
                id="rideStatus"
                value={ride.rideStatus}
                readOnly
                className="bg-muted"
                data-testid="input-ride-status"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="areaId">Бизнес-единица</Label>
              <Input
                id="areaId"
                value={ride.areaId}
                readOnly
                className="bg-muted"
                data-testid="input-area-id"
              />
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="brokerServices">Услуги таможенного брокера</Label>
          {isBrokerMode ? (
            <div className="flex items-center h-9 px-3 bg-muted rounded-md border">
              <Checkbox
                id="brokerServices"
                checked={ride.brokerServices === "yes"}
                disabled
                data-testid="checkbox-broker-services"
              />
              <Label htmlFor="brokerServices" className="ml-2 text-muted-foreground cursor-not-allowed">
                {ride.brokerServices === "yes" ? "Да" : "Нет"}
              </Label>
            </div>
          ) : (
            <Select
              value={ride.brokerServices}
              onValueChange={onBrokerServicesChange}
            >
              <SelectTrigger id="brokerServices" data-testid="select-broker-services">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Да</SelectItem>
                <SelectItem value="no">Нет</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </section>
  );
}
