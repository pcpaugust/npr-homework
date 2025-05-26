-- CreateTable
CREATE TABLE "Pagination" (
    "id" SERIAL NOT NULL,
    "page" INTEGER NOT NULL DEFAULT 1,
    "page_size" INTEGER NOT NULL DEFAULT 5,
    "total_items" INTEGER NOT NULL DEFAULT 0,
    "total_pages" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Pagination_pkey" PRIMARY KEY ("id")
);
