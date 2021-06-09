/*
  Warnings:

  - Changed the type of `repos_last_sync_date` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `repos_last_sync_date`,
    ADD COLUMN `repos_last_sync_date` DATETIME(3) NOT NULL;
