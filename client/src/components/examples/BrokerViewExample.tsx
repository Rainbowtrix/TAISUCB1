import { useState } from "react";
import BrokerView from "../BrokerView";
import type { RideData } from "../RideDetails";
import type { CargoItem } from "../CargoTable";
import type { OperationItem } from "../OperationsTable";
import type { DocumentItem } from "../DocumentsTable";

// todo: remove mock functionality
const mockRide: RideData = {
  rideId: "25Ext210334",
  equipmentNumber: "K509OA/AM4918",
  entranceDate: "2025-12-03 09:30",
  rideStatus: "Одобрено к отправке",
  areaId: "AFR",
  brokerServices: "yes",
};

// todo: remove mock functionality
const mockCargoItems: CargoItem[] = [
  {
    id: "1",
    cargoId: "25ТАИ003028",
    waybillNumber: "0110",
    waybillDate: "2025-12-01",
    customsDeclaration: "10009100/291025/5352481",
    contract: "0235/ФЛ",
    companyId: "ВЕРТЕКС",
    companyName: 'ООО "ВЕРТЕКС"',
    tboId: "ТБ_Авто",
    tboName: "ТБ_Авто",
    status: "completed",
  },
  {
    id: "2",
    cargoId: "25ТАИ003029",
    waybillNumber: "М-304886",
    waybillDate: "2025-12-03",
    customsDeclaration: "10009100/291025/5352482",
    contract: "0227/ФЛ",
    companyId: "ВЕРТЕКС",
    companyName: 'ООО "ВЕРТЕКС"',
    tboId: "ТБ_Авто",
    tboName: "ТБ_Авто",
    status: "storage",
  },
];

// todo: remove mock functionality
const mockOperations: OperationItem[] = [
  {
    id: "1",
    workName: "Погрузо-разгрузочные работы",
    serviceDate: "2025-12-01",
    quantity: "10,00",
    waybillNumber: "М-304886",
    contract: "0227/ФЛ",
    companyName: 'ООО "ВЕРТЕКС"',
  },
  {
    id: "2",
    workName: "Хранение груза",
    serviceDate: "2025-12-03",
    quantity: "200,00",
    waybillNumber: "М-304886",
    contract: "0227/ФЛ",
    companyName: 'ООО "ВЕРТЕКС"',
  },
];

// todo: remove mock functionality
const initialDocuments: DocumentItem[] = [
  {
    id: "1",
    type: "CMR",
    fileName: 'ООО "ВЕРТЕКС"-25Ext210334-M-304886.pdf',
    dateTime: "2025-12-01 10:00",
    fileSize: "1,2 MB",
    user: "Иванов И.И.",
  },
  {
    id: "2",
    type: "Package",
    fileName: 'ООО "ВЕРТЕКС"-25Ext210334.zip',
    dateTime: "2025-12-02 12:00",
    fileSize: "1,5 MB",
    user: "Кузнецов К.К.",
  },
];

export default function BrokerViewExample() {
  const [ride, setRide] = useState(mockRide);
  const [documents, setDocuments] = useState(initialDocuments);

  return (
    <div className="bg-gradient-to-b from-primary/5 to-background min-h-screen">
      <BrokerView
        ride={ride}
        cargoItems={mockCargoItems}
        operations={mockOperations}
        documents={documents}
        onBrokerServicesChange={(v) => {
          setRide({ ...ride, brokerServices: v });
          console.log("Broker services:", v);
        }}
        onCargoRowClick={(item) => console.log("Cargo:", item)}
        onOperationRowClick={(item) => console.log("Operation:", item)}
        onDocumentPreview={(doc) => console.log("Preview:", doc)}
        onDocumentDownload={(doc) => console.log("Download:", doc)}
        onDocumentDelete={(doc) => {
          setDocuments(documents.filter((d) => d.id !== doc.id));
          console.log("Deleted:", doc);
        }}
        onDocumentAdd={(type) => console.log("Add document:", type)}
        onDownloadAll={() => console.log("Download all")}
        onDeleteAll={() => {
          setDocuments([]);
          console.log("Delete all");
        }}
      />
    </div>
  );
}
