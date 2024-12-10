/*
  Warnings:

  - A unique constraint covering the columns `[clusterId,activityId,categoryId,participantId]` on the table `Tally` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tally_clusterId_activityId_categoryId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Tally_clusterId_activityId_categoryId_participantId_key" ON "Tally"("clusterId", "activityId", "categoryId", "participantId");
