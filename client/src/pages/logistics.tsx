import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BrokerView from "@/components/BrokerView";
import ClientView from "@/components/ClientView";
import type { RideData } from "@/components/RideDetails";
import type { CargoItem } from "@/components/CargoTable";
import type { OperationItem } from "@/components/OperationsTable";
import type { DocumentItem } from "@/components/DocumentsTable";
import { useToast } from "@/hooks/use-toast";

// todo: remove mock functionality
const initialRideData: RideData = {
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
  {
    id: "3",
    cargoId: "25ТАИ003030",
    waybillNumber: "М-304886",
    waybillDate: "2025-12-03",
    customsDeclaration: "10009100/291025/5352483",
    contract: "0227/ФЛ",
    companyId: "ВЕРТЕКС",
    companyName: 'ООО "ВЕРТЕКС"',
    tboId: "ТБ_Авто",
    tboName: "ТБ_Авто",
    status: "partial",
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
    workName: "Сортировочные работы",
    serviceDate: "2025-12-02",
    quantity: "50,00",
    waybillNumber: "М-304886",
    contract: "0227/ФЛ",
    companyName: 'ООО "ВЕРТЕКС"',
  },
  {
    id: "3",
    workName: "Хранение груза",
    serviceDate: "2025-12-03",
    quantity: "200,00",
    waybillNumber: "М-304886",
    contract: "0227/ФЛ",
    companyName: 'ООО "ВЕРТЕКС"',
  },
  {
    id: "4",
    workName: "Оформление документов",
    serviceDate: "2025-12-04",
    quantity: "25,00",
    waybillNumber: "0110",
    contract: "0235/ФЛ",
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
    type: "TTN",
    fileName: 'ООО "ВЕРТЕКС"-25Ext210334-0110.jpg',
    dateTime: "2025-12-01 11:00",
    fileSize: "0,8 MB",
    user: "Петров П.П.",
  },
  {
    id: "3",
    type: "DT",
    fileName: 'ООО "ВЕРТЕКС"-25Ext210334-10009100/291025/5352483.pdf',
    dateTime: "2025-12-02 09:30",
    fileSize: "0,5 MB",
    user: "Сидоров С.С.",
  },
  {
    id: "4",
    type: "Package",
    fileName: 'ООО "ВЕРТЕКС"-25Ext210334.zip',
    dateTime: "2025-12-02 12:00",
    fileSize: "1,5 MB",
    user: "Кузнецов К.К.",
  },
];

export default function LogisticsPage() {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<"broker" | "client">("broker");
  const [ride, setRide] = useState(initialRideData);
  const [documents, setDocuments] = useState(initialDocuments);

  const handleViewChange = (view: "broker" | "client") => {
    setCurrentView(view);
  };

  const handleBrokerServicesChange = (value: string) => {
    setRide({ ...ride, brokerServices: value });
    toast({
      title: "Обновлено",
      description: `Услуги таможенного брокера: ${value === "yes" ? "Да" : "Нет"}`,
    });
  };

  const handleCargoRowClick = (item: CargoItem) => {
    toast({
      title: "Груз выбран",
      description: `Груз ${item.cargoId} - ${item.companyName}`,
    });
  };

  const handleOperationRowClick = (item: OperationItem) => {
    toast({
      title: "Операция выбрана",
      description: `${item.workName} - ${item.serviceDate}`,
    });
  };

  const handleDocumentPreview = (doc: DocumentItem) => {
    console.log("Preview document:", doc);
  };

  const handleDocumentDownload = (doc: DocumentItem) => {
    toast({
      title: "Скачивание",
      description: `Начато скачивание ${doc.fileName}`,
    });
  };

  const handleDocumentDelete = (doc: DocumentItem) => {
    setDocuments(documents.filter((d) => d.id !== doc.id));
    toast({
      title: "Удаление",
      description: `Документ ${doc.fileName} удален`,
      variant: "destructive",
    });
  };

  const handleDocumentAdd = (type: string) => {
    toast({
      title: "Добавление документа",
      description: `Добавлен новый документ типа ${type}`,
    });
  };

  const handleDownloadAll = () => {
    toast({
      title: "Скачивание всех документов",
      description: "Начато скачивание архива",
    });
  };

  const handleDeleteAll = () => {
    setDocuments([]);
    toast({
      title: "Удаление",
      description: "Все документы удалены",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <AppHeader currentView={currentView} onViewChange={handleViewChange} />
      <div className="pt-14">
        {currentView === "broker" ? (
          <BrokerView
            ride={ride}
            cargoItems={mockCargoItems}
            operations={mockOperations}
            documents={documents}
            onCargoRowClick={handleCargoRowClick}
            onOperationRowClick={handleOperationRowClick}
            onDocumentPreview={handleDocumentPreview}
            onDocumentDownload={handleDocumentDownload}
            onDocumentDelete={handleDocumentDelete}
            onDocumentAdd={handleDocumentAdd}
            onDownloadAll={handleDownloadAll}
            onDeleteAll={handleDeleteAll}
          />
        ) : (
          <ClientView
            ride={ride}
            cargoItems={mockCargoItems}
            operations={mockOperations}
            documents={documents}
            onBrokerServicesChange={handleBrokerServicesChange}
            onDownloadDocument={handleDocumentDownload}
          />
        )}
      </div>
    </div>
  );
}
