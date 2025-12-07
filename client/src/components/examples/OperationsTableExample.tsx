import OperationsTable, { type OperationItem } from "../OperationsTable";

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

export default function OperationsTableExample() {
  const handleRowClick = (item: OperationItem) => {
    console.log("Operation row clicked:", item);
  };

  return (
    <div className="p-6 bg-background">
      <OperationsTable items={mockOperations} onRowClick={handleRowClick} />
    </div>
  );
}
