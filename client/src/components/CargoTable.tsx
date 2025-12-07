import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface CargoItem {
  id: string;
  cargoId: string;
  waybillNumber: string;
  waybillDate: string;
  customsDeclaration: string;
  contract: string;
  companyId: string;
  companyName: string;
  tboId: string;
  tboName: string;
  status: "completed" | "storage" | "partial";
}

interface CargoTableProps {
  items: CargoItem[];
  onRowClick?: (item: CargoItem) => void;
}

const statusConfig = {
  completed: { label: "Завершено", variant: "default" as const },
  storage: { label: "На хранении", variant: "secondary" as const },
  partial: { label: "Частично отгружено", variant: "outline" as const },
};

export default function CargoTable({ items, onRowClick }: CargoTableProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground border-b border-primary/20 pb-2 flex items-center gap-2" data-testid="heading-cargo">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        Грузы
      </h2>
      <ScrollArea className="w-full">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5">
                <TableHead className="font-medium">Груз</TableHead>
                <TableHead className="font-medium">Номер накладной</TableHead>
                <TableHead className="font-medium">Дата накладной</TableHead>
                <TableHead className="font-medium">Номер ДТ</TableHead>
                <TableHead className="font-medium">Договор</TableHead>
                <TableHead className="font-medium">ID компании</TableHead>
                <TableHead className="font-medium">Наименование компании</TableHead>
                <TableHead className="font-medium">ID ТБО</TableHead>
                <TableHead className="font-medium">Наименование ТБО</TableHead>
                <TableHead className="font-medium">Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover-elevate cursor-pointer"
                  onClick={() => onRowClick?.(item)}
                  data-testid={`row-cargo-${item.id}`}
                >
                  <TableCell className="font-medium">{item.cargoId}</TableCell>
                  <TableCell>{item.waybillNumber}</TableCell>
                  <TableCell>{item.waybillDate}</TableCell>
                  <TableCell className="font-mono text-sm">{item.customsDeclaration}</TableCell>
                  <TableCell>{item.contract}</TableCell>
                  <TableCell>{item.companyId}</TableCell>
                  <TableCell>{item.companyName}</TableCell>
                  <TableCell>{item.tboId}</TableCell>
                  <TableCell>{item.tboName}</TableCell>
                  <TableCell>
                    <Badge variant={statusConfig[item.status].variant}>
                      {statusConfig[item.status].label}
                    </Badge>
                  </TableCell>
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
