-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hasLiveExample" BOOLEAN NOT NULL DEFAULT false,
    "liveExampleLink" TEXT,
    "banner" TEXT,
    "hasAOnlineRepo" BOOLEAN NOT NULL DEFAULT false,
    "onlineRepoLink" TEXT,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("banner", "description", "hasLiveExample", "id", "liveExampleLink", "name", "ownerId") SELECT "banner", "description", "hasLiveExample", "id", "liveExampleLink", "name", "ownerId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
