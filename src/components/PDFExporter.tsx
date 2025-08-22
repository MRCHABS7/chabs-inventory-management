import { quotationToPDF } from '../lib/pdf';
import type { CompanyDetails, Customer, Product, Quotation } from '../lib/types';

export default function PDFExporter({ company, customer, quotation, products }: { company: CompanyDetails; customer: Customer; quotation: Quotation; products: Product[] }) {
  return (
    <button className="btn" type="button" onClick={() => quotationToPDF({ company, customer, quotation, products })}>
      Export PDF
    </button>
  );
}