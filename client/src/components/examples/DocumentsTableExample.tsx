import DocumentsTable, { type DocumentItem } from "../DocumentsTable";
import { useToast } from "@/hooks/use-toast";

// todo: remove mock functionality
const mockDocuments: DocumentItem[] = [
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

export default function DocumentsTableExample() {
  const { toast } = useToast();

  const handlePreview = (doc: DocumentItem) => {
    console.log("Preview document:", doc);
  };

  const handleDownload = (doc: DocumentItem) => {
    console.log("Download document:", doc);
    toast({
      title: "Скачивание",
      description: `Начато скачивание ${doc.fileName}`,
    });
  };

  const handleDelete = (doc: DocumentItem) => {
    console.log("Delete document:", doc);
    toast({
      title: "Удаление",
      description: `Документ ${doc.fileName} удален`,
      variant: "destructive",
    });
  };

  const handleAdd = (type: string) => {
    console.log("Add document of type:", type);
    toast({
      title: "Добавление документа",
      description: `Добавлен документ типа ${type}`,
    });
  };

  const handleDownloadAll = () => {
    console.log("Download all documents");
    toast({
      title: "Скачивание всех документов",
      description: "Начато скачивание архива",
    });
  };

  const handleDeleteAll = () => {
    console.log("Delete all documents");
    toast({
      title: "Удаление",
      description: "Все документы удалены",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 bg-background">
      <DocumentsTable
        items={mockDocuments}
        onPreview={handlePreview}
        onDownload={handleDownload}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onDownloadAll={handleDownloadAll}
        onDeleteAll={handleDeleteAll}
      />
    </div>
  );
}
