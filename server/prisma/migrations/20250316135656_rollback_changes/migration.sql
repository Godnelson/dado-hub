/*
  Warnings:

  - You are about to drop the `_ProjectToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ProjectToTag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TagAssignedForProjects" (
    "projectId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    PRIMARY KEY ("projectId", "tagId"),
    CONSTRAINT "TagAssignedForProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagAssignedForProjects_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
