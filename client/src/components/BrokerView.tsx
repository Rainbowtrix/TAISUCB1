import RideDetails, { type RideData } from "@/components/RideDetails";
import CargoTable, { type CargoItem } from "@/components/CargoTable";
import OperationsTable, { type OperationItem } from "@/components/OperationsTable";
import DocumentsTable, { type DocumentItem } from "@/components/DocumentsTable";

interface BrokerViewProps {
  ride: RideData;
  cargoItems: CargoItem[];
  operations: OperationItem[];
  documents: DocumentItem[];
  onCargoRowClick?: (item: CargoItem) => void;
  onOperationRowClick?: (item: OperationItem) => void;
  onDocumentPreview?: (doc: DocumentItem) => void;
  onDocumentDownload?: (doc: DocumentItem) => void;
  onDocumentDelete?: (doc: DocumentItem) => void;
  onDocumentAdd?: (type: string, file: File | null) => void;
  onDownloadAll?: () => void;
  onDeleteAll?: () => void;
}

export default function BrokerView({
  ride,
  cargoItems,
  operations,
  documents,
  onCargoRowClick,
  onOperationRowClick,
  onDocumentPreview,
  onDocumentDownload,
  onDocumentDelete,
  onDocumentAdd,
  onDownloadAll,
  onDeleteAll,
}: BrokerViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <RideDetails ride={ride} mode="broker" />
      <CargoTable items={cargoItems} onRowClick={onCargoRowClick} />
      <OperationsTable items={operations} onRowClick={onOperationRowClick} />
      <DocumentsTable
        items={documents}
        onPreview={onDocumentPreview}
        onDownload={onDocumentDownload}
        onDelete={onDocumentDelete}
        onAdd={onDocumentAdd}
        onDownloadAll={onDownloadAll}
        onDeleteAll={onDeleteAll}
      />
    </div>
  );
}
