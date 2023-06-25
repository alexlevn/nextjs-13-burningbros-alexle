import data from "./data.json";
import { Product } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  /* Params: */
  const params = req.nextUrl.searchParams;

  const title = params.get("title") || "";
  const limit = params.get("limit") || 10;
  const page = params.get("page") || 1;

  const twenty_records = data;

  /* 1000 records from 20 sample records */
  const thousand_records: Product[] = [];
  for (let i = 0; i < 50; i++) {
    twenty_records.forEach((record) => {
      thousand_records.push({
        ...record,
        id: thousand_records.length + 1,
      });
    });
  }

  /*  Filter: */
  let filtered_records = thousand_records;

  if (title) {
    filtered_records = thousand_records.filter((record) =>
      record.title.toLowerCase().includes(title.toString().toLowerCase())
    );
  }

  /*  Pagination: */
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);
  const paginated_records = filtered_records.slice(start, end);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return NextResponse.json({
    data: paginated_records,
    total: paginated_records.length,
  });
}
