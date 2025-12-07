import CargoTable, { type CargoItem } from "../CargoTable";

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

export default function CargoTableExample() {
  const handleRowClick = (item: CargoItem) => {
    console.log("Cargo row clicked:", item);
  };

  return (
    <div className="p-6 bg-background">
      <CargoTable items={mockCargoItems} onRowClick={handleRowClick} />
    </div>
  );
}
