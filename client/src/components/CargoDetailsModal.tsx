import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Image, Archive, Download } from "lucide-react";
import type { CargoItem } from "./CargoTable";
import type { OperationItem } from "./OperationsTable";
import type { DocumentItem } from "./DocumentsTable";

interface CargoDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cargo: CargoItem | null;
  operations: OperationItem[];
  documents: DocumentItem[];
  onDownloadDocument?: (doc: DocumentItem) => void;
}

const typeIcons: Record<string, typeof FileText> = {
  CMR: FileText,
  TTN: Image,
  DT: FileText,
  Package: Archive,
};

export default function CargoDetailsModal({
  open,
  onOpenChange,
  cargo,
  operations,
  documents,
  onDownloadDocument,
}: CargoDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("operations");

  if (!cargo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" data-testid="modal-cargo-title">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Груз: {cargo.cargoId}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="operations" data-testid="tab-operations">
              Операции на СВХ
            </TabsTrigger>
            <TabsTrigger value="documents" data-testid="tab-documents">
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="flex-1 min-h-0 mt-4">
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="font-medium">Наименование работ</TableHead>
                    <TableHead className="font-medium">Дата услуги</TableHead>
                    <TableHead className="font-medium">Кол-во</TableHead>
                    <TableHead className="font-medium">Номер накладной</TableHead>
                    <TableHead className="font-medium">Договор</TableHead>
                    <TableHead className="font-medium">Наименование компании</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        Нет операций
                      </TableCell>
                    </TableRow>
                  ) : (
                    operations.map((item) => (
                      <TableRow key={item.id} data-testid={`modal-row-operation-${item.id}`}>
                        <TableCell className="font-medium">{item.workName}</TableCell>
                        <TableCell>{item.serviceDate}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.waybillNumber}</TableCell>
                        <TableCell>{item.contract}</TableCell>
                        <TableCell>{item.companyName}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>

          <TabsContent value="documents" className="flex-1 min-h-0 mt-4">
            <ScrollArea className="h-[400px]">
              {documents.length === 0 ? (
                <p className="text-muted-foreground text-sm py-8 text-center">Нет документов</p>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => {
                    const Icon = typeIcons[doc.type] || FileText;
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between py-3 px-4 bg-primary/5 rounded-md"
                        data-testid={`modal-doc-${doc.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <div>
                            <span className="font-medium text-foreground">{doc.fileName}</span>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                              <Badge variant="outline">{doc.type}</Badge>
                              <span>{doc.dateTime}</span>
                              <span>{doc.fileSize}</span>
                              <span>{doc.user}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDownloadDocument?.(doc)}
                          data-testid={`modal-download-${doc.id}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
