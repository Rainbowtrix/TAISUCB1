import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FileText, Image, Archive, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import CargoDetailsModal from "./CargoDetailsModal";
import type { RideData } from "./RideDetails";
import type { CargoItem } from "./CargoTable";
import type { OperationItem } from "./OperationsTable";
import type { DocumentItem } from "./DocumentsTable";

interface ClientViewProps {
  ride: RideData;
  cargoItems: CargoItem[];
  operations: OperationItem[];
  documents: DocumentItem[];
  onBrokerServicesChange?: (value: string) => void;
  onDownloadDocument?: (doc: DocumentItem) => void;
}

const typeIcons: Record<string, typeof FileText> = {
  CMR: FileText,
  TTN: Image,
  DT: FileText,
  Package: Archive,
};

export default function ClientView({
  ride,
  cargoItems,
  operations,
  documents,
  onBrokerServicesChange,
  onDownloadDocument,
}: ClientViewProps) {
  const [selectedCargo, setSelectedCargo] = useState<CargoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCargoRowClick = (cargo: CargoItem) => {
    setSelectedCargo(cargo);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          Информация о рейсе
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="client-rideId" className="text-sm text-muted-foreground">ID рейса</Label>
            <Input
              id="client-rideId"
              value={ride.rideId}
              readOnly
              className="bg-background/80"
              data-testid="client-input-ride-id"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-equipmentNumber" className="text-sm text-muted-foreground">Номер авто/сцепки</Label>
            <Input
              id="client-equipmentNumber"
              value={ride.equipmentNumber}
              readOnly
              className="bg-background/80"
              data-testid="client-input-equipment-number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-entranceDate" className="text-sm text-muted-foreground">Дата въезда</Label>
            <Input
              id="client-entranceDate"
              value={ride.entranceDate}
              readOnly
              className="bg-background/80"
              data-testid="client-input-entrance-date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-brokerServices" className="text-sm text-muted-foreground">Услуги таможенного брокера</Label>
            <Select
              value={ride.brokerServices}
              onValueChange={onBrokerServicesChange}
            >
              <SelectTrigger id="client-brokerServices" data-testid="client-select-broker-services">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Да</SelectItem>
                <SelectItem value="no">Нет</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-primary/20">
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          Грузы ({cargoItems.length})
        </h3>
        <ScrollArea className="w-full">
          <div className="min-w-[600px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead className="font-medium">Номер накладной</TableHead>
                  <TableHead className="font-medium">Дата накладной</TableHead>
                  <TableHead className="font-medium">Номер ДТ</TableHead>
                  <TableHead className="font-medium">Договор</TableHead>
                  <TableHead className="font-medium">Наименование компании</TableHead>
                  <TableHead className="font-medium">Наименование ТБО</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cargoItems.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className="hover-elevate cursor-pointer"
                    onClick={() => handleCargoRowClick(item)}
                    data-testid={`client-row-cargo-${item.id}`}
                  >
                    <TableCell className="font-medium">{item.waybillNumber}</TableCell>
                    <TableCell>{item.waybillDate}</TableCell>
                    <TableCell className="font-mono text-sm">{item.customsDeclaration}</TableCell>
                    <TableCell>{item.contract}</TableCell>
                    <TableCell>{item.companyName}</TableCell>
                    <TableCell>{item.tboName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>

      <Card className="p-6 border-primary/20">
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          Документы ({documents.length})
        </h3>
        {documents.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4">Нет документов</p>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => {
              const Icon = typeIcons[doc.type] || FileText;
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between py-3 px-4 bg-primary/5 rounded-md"
                  data-testid={`client-doc-${doc.id}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-medium text-foreground">{doc.fileName}</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                        <Badge variant="outline">{doc.type}</Badge>
                        <span>{doc.dateTime}</span>
                        <span>{doc.fileSize}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDownloadDocument?.(doc)}
                    data-testid={`client-download-${doc.id}`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <CargoDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        cargo={selectedCargo}
        operations={operations}
        documents={documents}
        onDownloadDocument={onDownloadDocument}
      />
    </div>
  );
}
