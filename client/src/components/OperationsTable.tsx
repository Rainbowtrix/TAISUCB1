import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface OperationItem {
  id: string;
  workName: string;
  serviceDate: string;
  quantity: string;
  waybillNumber: string;
  contract: string;
  companyName: string;
}

interface OperationsTableProps {
  items: OperationItem[];
  onRowClick?: (item: OperationItem) => void;
}

export default function OperationsTable({ items, onRowClick }: OperationsTableProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground border-b border-primary/20 pb-2 flex items-center gap-2" data-testid="heading-operations">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        Операции на СВХ
      </h2>
      <ScrollArea className="w-full">
        <div className="min-w-[800px]">
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
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover-elevate cursor-pointer"
                  onClick={() => onRowClick?.(item)}
                  data-testid={`row-operation-${item.id}`}
                >
                  <TableCell className="font-medium">{item.workName}</TableCell>
                  <TableCell>{item.serviceDate}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.waybillNumber}</TableCell>
                  <TableCell>{item.contract}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
