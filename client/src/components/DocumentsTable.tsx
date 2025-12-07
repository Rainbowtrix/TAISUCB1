import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  FileText,
  Image,
  Archive,
  Download,
  Trash2,
  Eye,
  Plus,
  DownloadCloud,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface DocumentItem {
  id: string;
  type: "CMR" | "TTN" | "DT" | "Package";
  fileName: string;
  dateTime: string;
  fileSize: string;
  user: string;
}

interface DocumentsTableProps {
  items: DocumentItem[];
  onPreview?: (item: DocumentItem) => void;
  onDownload?: (item: DocumentItem) => void;
  onDelete?: (item: DocumentItem) => void;
  onAdd?: (type: string, file: File | null) => void;
  onDownloadAll?: () => void;
  onDeleteAll?: () => void;
}

const typeIcons = {
  CMR: FileText,
  TTN: Image,
  DT: FileText,
  Package: Archive,
};

export default function DocumentsTable({
  items,
  onPreview,
  onDownload,
  onDelete,
  onAdd,
  onDownloadAll,
  onDeleteAll,
}: DocumentsTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [newDocType, setNewDocType] = useState("");

  const handlePreview = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setPreviewDialogOpen(true);
    onPreview?.(doc);
  };

  const handleDeleteClick = (doc: DocumentItem) => {
    setSelectedDoc(doc);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDoc) {
      onDelete?.(selectedDoc);
    }
    setDeleteDialogOpen(false);
    setSelectedDoc(null);
  };

  const handleConfirmDeleteAll = () => {
    onDeleteAll?.();
    setDeleteAllDialogOpen(false);
  };

  const handleAddDocument = () => {
    onAdd?.(newDocType, null);
    setAddDialogOpen(false);
    setNewDocType("");
  };

  const totalSize = items.reduce((acc, item) => {
    const size = parseFloat(item.fileSize.replace(",", ".").replace(" MB", ""));
    return acc + size;
  }, 0);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground border-b border-primary/20 pb-2 flex items-center gap-2" data-testid="heading-documents">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        Документы
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAddDialogOpen(true)}
          data-testid="button-add-document"
        >
          <Plus className="h-4 w-4 mr-1" />
          Добавить документ
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadAll}
          data-testid="button-download-all"
        >
          <DownloadCloud className="h-4 w-4 mr-1" />
          Скачать все
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDeleteAllDialogOpen(true)}
          data-testid="button-delete-all"
        >
          <Trash className="h-4 w-4 mr-1" />
          Удалить все
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5">
                <TableHead className="font-medium w-[80px]">Тип</TableHead>
                <TableHead className="font-medium">Файл</TableHead>
                <TableHead className="font-medium">Дата/Время</TableHead>
                <TableHead className="font-medium">Размер файла</TableHead>
                <TableHead className="font-medium">Пользователь</TableHead>
                <TableHead className="font-medium text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const Icon = typeIcons[item.type];
                return (
                  <TableRow key={item.id} data-testid={`row-document-${item.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{item.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-foreground hover:underline text-left"
                        onClick={() => handlePreview(item)}
                        data-testid={`link-preview-${item.id}`}
                      >
                        {item.fileName}
                      </button>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.dateTime}</TableCell>
                    <TableCell className="text-muted-foreground">{item.fileSize}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreview(item)}
                          data-testid={`button-preview-${item.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDownload?.(item)}
                          data-testid={`button-download-${item.id}`}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(item)}
                          data-testid={`button-delete-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удаление документа</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить документ "{selectedDoc?.fileName}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} data-testid="button-cancel-delete">
              Нет
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} data-testid="button-confirm-delete">
              Да
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удаление всех документов</DialogTitle>
            <DialogDescription>
              Вы собираетесь удалить {items.length} файлов, общий размер {totalSize.toFixed(1).replace(".", ",")} MB.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteAllDialogOpen(false)} data-testid="button-cancel-delete-all">
              Отменить
            </Button>
            <Button variant="destructive" onClick={handleConfirmDeleteAll} data-testid="button-confirm-delete-all">
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить документ</DialogTitle>
            <DialogDescription>
              Выберите тип документа и загрузите файл.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="docType">Тип документа</Label>
              <Select value={newDocType} onValueChange={setNewDocType}>
                <SelectTrigger id="docType" data-testid="select-doc-type">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CMR">CMR</SelectItem>
                  <SelectItem value="TTN">ТТН</SelectItem>
                  <SelectItem value="DT">ДТ</SelectItem>
                  <SelectItem value="Package">Комплект документов</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Файл</Label>
              <Input id="file" type="file" data-testid="input-file" />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAddDialogOpen(false)} data-testid="button-cancel-add">
              Отмена
            </Button>
            <Button onClick={handleAddDocument} data-testid="button-confirm-add">
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Просмотр документа</DialogTitle>
            <DialogDescription>
              {selectedDoc?.fileName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center h-64 bg-muted rounded-md">
            <div className="text-center text-muted-foreground">
              <FileText className="h-16 w-16 mx-auto mb-2" />
              <p>Предпросмотр документа</p>
              <p className="text-sm">{selectedDoc?.type} - {selectedDoc?.fileSize}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)} data-testid="button-close-preview">
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
